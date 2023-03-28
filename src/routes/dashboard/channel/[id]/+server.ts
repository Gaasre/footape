import { Action, Section } from '$lib/enums';
import type { Channel } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { checkPermission } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ locals, params }) => {
    if (!locals.session?.user) throw error(401);
    if (!checkPermission(locals.fullUser?.permissions, Section.Videos, Action.Delete, locals.fullUser?.position)) throw error(401)

    const channelId = params.id

    const { error: dbError2, data } = await supabase
        .from('channel')
        .select('*')
        .match({ id: channelId, teamid: locals.fullUser?.teamid })
        .single<Channel>()

    if (!data) {
        throw error(404)
    }

    const { error: dbError } = await supabase
        .from('channel')
        .delete()
        .eq('id', channelId)

    if (dbError) {
        throw error(500);
    }

    return new Response(JSON.stringify({ success: true }));
};