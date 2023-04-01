import type { Video } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, params }) => {
    if (!locals.session?.user) return new Response(JSON.stringify(error(401)));
    const videoId = params.id
    const body: { filetype: string, extension: string } = await request.json()

    const { data, error: dbError } = await supabase
        .from('video')
        .select('id, title, channel:channelId(*)')
        .eq('id', videoId)
        .single<Video>()

    if (dbError) {
        throw error(500, 'Something bad happened, i guess ?');
    }

    if (body.filetype == 'script') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ scriptLink: `https://footape.s3.fr-par.scw.cloud/${data?.channel.id}/${data?.id}/${body.filetype}.${body.extension}` })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else if (body.filetype == 'voiceover') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ voiceOverLink: `https://footape.s3.fr-par.scw.cloud/${data?.channel.id}/${data?.id}/${body.filetype}.${body.extension}`.replace(' ', '_') })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else if (body.filetype == 'video') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ videoLink: `https://footape.s3.fr-par.scw.cloud/${data?.channel.id}/${data?.id}/${body.filetype}.${body.extension}`.replace(' ', '_') })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else {
        const { error: dbError } = await supabase
            .from('video')
            .update({ thumbnailLink: `https://footape.s3.fr-par.scw.cloud/${data?.channel.id}/${data?.id}/${body.filetype}.${body.extension}`.replace(' ', '_') })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    }

    return new Response(JSON.stringify({ success: true }))
}) satisfies RequestHandler
