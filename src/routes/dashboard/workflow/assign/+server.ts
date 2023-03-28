import supabase from '$lib/supabaseClient.server';
import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, url, request }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')

    const { error: dbError } = await supabase
        .from('work')
        .insert({ memberid: locals.fullUser?.id, videoid: id })


    if (dbError) {
        return new Response(JSON.stringify(fail(422, dbError)));
    }

    return new Response(JSON.stringify({ success: true }))
};

export const DELETE: RequestHandler = async ({ locals, url, request }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')

    const { error: dbError } = await supabase
        .from('work')
        .delete()
        .eq('id', id)

    if (dbError) {
        return new Response(JSON.stringify(fail(422, dbError)));
    }

    return new Response(JSON.stringify({ success: true }))
};