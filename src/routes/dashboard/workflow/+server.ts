import { Status } from '$lib/enums';
import supabase from '$lib/supabaseClient.server';
import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ locals, url, request }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')
    const data = await request.json()

    if (data.status) {
        const { error: dbError } = await supabase
            .from('video')
            .update({ status: data.status })
            .eq('id', id)

        if (dbError) {
            return new Response(JSON.stringify(fail(422, dbError)));
        }

        if (data.status == Status.Published) {
            await supabase
                .from('video')
                .update({ publishedAt: new Date().toISOString() })
                .eq('id', id)
        }

        return new Response(JSON.stringify({ success: true }))
    }

    return new Response(JSON.stringify(fail(422)));
};