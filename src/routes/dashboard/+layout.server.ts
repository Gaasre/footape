import type { Channel } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.session?.user) throw redirect(301, '/');
    if (locals.fullUser?.firstname == '' && locals.fullUser.lastname == '') {
        throw redirect(301, '/onboarding')
    }
    const { data: channels } = await supabase
        .from('channel')
        .select('id, name')
        .eq('teamid', locals.fullUser?.teamid)
        .returns<Channel[]>()
    return { channels };
}) satisfies LayoutServerLoad;