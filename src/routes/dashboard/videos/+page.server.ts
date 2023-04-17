import { Action, Section } from "$lib/enums";
import type { Channel, Video } from "$lib/interfaces";
import supabase from "$lib/supabaseClient.server";
import { checkPermission } from "$lib/utils";
import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const canAddVideo = (subscription: string | undefined, video_count: number | undefined) => {
    if (video_count == null) return false
    switch (subscription) {
        case 'starter':
            if (video_count >= 10) {
                return false;
            }
            return true;
        case 'premium':
            if (video_count >= 30) {
                return false;
            }
            return true;
        case 'entreprise':
            return true;
        default:
            return false;
    }
};

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 8
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1

    return { from, to }
}

export const load = (async ({ locals, url }) => {
    if (!locals.session?.user) throw redirect(301, '/');
    if (!checkPermission(locals.fullUser?.permissions, Section.Videos, Action.View, locals.fullUser?.position)) throw redirect(301, '/workflow');

    let page = 1;

    const pageParam = url.searchParams.get('page')

    if (pageParam) {
        page = parseInt(pageParam)
    }

    const { from, to } = getPagination(page - 1, 8)

    const { error: dbError, data: videos, count } = await supabase
        .from('video')
        .select('*, channel:channelId(*), works:work(*, member(*, user(*)))', { count: 'exact' })
        .order('created_at', { ascending: false })
        .eq('teamid', locals.fullUser?.teamid)
        .returns<Video[]>()
        .range(from, to)

    const { error: dbErrorChannel, data: channels } = await supabase
        .from('channel')
        .select('*')
        .eq('teamid', locals.fullUser?.teamid)
        .returns<Channel[]>()

    if (videos && channels) {
        return { videos, channels, page, pages: count ? Math.ceil(count / 8) : 1 }
    }

    return fail(422);
}) satisfies PageServerLoad;

export const actions = ({
    editVideo: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        if (!checkPermission(locals.fullUser?.permissions, Section.Videos, Action.Edit, locals.fullUser?.position)) throw error(401)
        const formData = await request.formData()
        const channelId = formData.get('channel')
        const title = formData.get('title')
        const notes = formData.get('notes')

        const id = url.searchParams.get('id')

        const { error: dbError } = await supabase
            .from('video')
            .update({
                channelId, title, notes
            }).eq('id', id)

        if (dbError) {
            return fail(422, dbError);
        }

        return { success: true }
    },
    newVideo: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        if (!checkPermission(locals.fullUser?.permissions, Section.Videos, Action.Add, locals.fullUser?.position)) throw error(401)
        if (!canAddVideo(locals.fullUser?.subscription, locals.fullUser?.video_count)) {
            throw error(401, { message: 'Subscription Limit' })
        }
        const formData = await request.formData()
        const channelId = formData.get('channel')
        const title = formData.get('title')
        const notes = formData.get('notes')

        const { data, error: dbError } = await supabase
            .from('video')
            .insert({ channelId, title, notes, teamid: locals.fullUser?.teamid })

        if (dbError) {
            return fail(422, dbError);
        }

        return { success: true }
    }
}) satisfies Actions