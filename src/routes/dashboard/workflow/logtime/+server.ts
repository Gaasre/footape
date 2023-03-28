import type { Work } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ locals, url, request }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')
    const body: { loggedhours: number } = await request.json()

    const { error: dbErrorGet, data } = await supabase
        .from('work')
        .select('*')
        .match({ memberid: locals.fullUser?.id, videoid: id })
        .single<Work>()

    if (dbErrorGet) {
        return new Response(JSON.stringify(fail(422, dbErrorGet)));
    }

    const { error: dbError } = await supabase
        .from('work')
        .update({ loggedhours: data.loggedhours + body.loggedhours })
        .eq('id', data.id)


    if (dbError) {
        return new Response(JSON.stringify(fail(422, dbError)));
    }

    return new Response(JSON.stringify({ success: true }))
};