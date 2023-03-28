import { Section, Action } from '$lib/enums';
import type { Team } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { checkPermission } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const canAddChannel = (subscription: string | undefined, channel_count: number | undefined) => {
    if (channel_count == null) return false
    switch (subscription) {
        case 'starter':
            if (channel_count >= 1) {
                return false;
            }
            return true;
        case 'standard':
            if (channel_count >= 3) {
                return false;
            }
            return true;
        case 'premium':
            return true;
        default:
            return false;
    }
};

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = ({
    newChannel: async ({ locals, request }) => {
        console.log(locals.fullUser)
        if (!locals.session?.user) throw redirect(301, '/');
        if (!checkPermission(locals.fullUser?.permissions, Section.Videos, Action.Delete, locals.fullUser?.position)) throw error(401)
        if (!canAddChannel(locals.fullUser?.subscription, locals.fullUser?.channel_count)) {
            throw error(401, { message: 'Subscription Limit' })
        }

        const formData = await request.formData()
        const name = formData.get('name')

        const { error: dbError } = await supabase
            .from('channel')
            .insert({ name, teamid: locals.fullUser?.teamid })

        if (dbError) {
            throw error(500)
        }

        return { success: true }
    }
}) satisfies Actions