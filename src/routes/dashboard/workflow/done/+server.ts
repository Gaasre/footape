import supabase from '$lib/supabaseClient.server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ locals, url, request }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')

    const { error: dbError, data } = await supabase
        .from('work')
        .update({ finished_at: new Date().toISOString() })
        .match({ videoid: id, memberid: locals.fullUser?.id })

    if (dbError) {
        console.log(dbError)
        throw error(500);
    }

    return new Response(JSON.stringify({ success: true }));
};