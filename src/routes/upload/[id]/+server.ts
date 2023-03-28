import type { RequestHandler } from './$types';
import s3Client from '$lib/s3.server';
import { error } from '@sveltejs/kit';
import supabase from '$lib/supabaseClient.server';
import type { Video } from '$lib/interfaces';

export const POST = (async ({ request, locals, params }) => {
    if (!locals.session?.user) return new Response(JSON.stringify(error(401)));
    const videoId = params.id
    const body: { filetype: string, extension: string, contentType: string } = await request.json()

    const { data, error: dbError } = await supabase
        .from('video')
        .select('id, title, channel:channelId(*)')
        .eq('id', videoId)
        .single<Video>()

    if (dbError) {
        throw error(500, 'Something bad happened, i guess ?');
    }

    const signedURL = await s3Client.getSignedUrlPromise('putObject', {
        Key: `${data?.channel.id}/${data?.id}/${body.filetype}.${body.extension}`,
        ContentType: body.contentType,
        ACL: "public-read",
    })

    if (signedURL) {
        return new Response(JSON.stringify({ signedURL }))
    }

    throw error(500, 'Something bad happened, i guess ?');
}) satisfies RequestHandler

export const DELETE = (async ({ request, locals, params }) => {
    if (!locals.session?.user) return new Response(JSON.stringify(error(401)));
    const videoId = params.id
    const body: { filetype: string } = await request.json()

    try {
        if (body.filetype == 'script') {
            const { data, error: dbError } = await supabase
                .from('video')
                .select('scriptLink')
                .eq('id', videoId)
                .single<Video>()

            if (dbError) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            await s3Client.deleteObject({
                Bucket: 'footape',
                Key: data.scriptLink.replace('https://footape.s3.fr-par.scw.cloud/', ''),
            }).promise()

            const { error: dbErrorDelete } = await supabase
                .from('video')
                .update({ scriptLink: '' })
                .eq('id', videoId)

            if (dbErrorDelete) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            return new Response(JSON.stringify({ success: true }))

        } else if (body.filetype == 'voiceover') {
            const { data, error: dbError } = await supabase
                .from('video')
                .select('voiceOverLink')
                .eq('id', videoId)
                .single<Video>()

            if (dbError) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            await s3Client.deleteObject({
                Bucket: 'footape',
                Key: data.voiceOverLink.replace('https://footape.s3.fr-par.scw.cloud/', ''),
            }).promise()

            const { error: dbErrorDelete } = await supabase
                .from('video')
                .update({ voiceOverLink: '' })
                .eq('id', videoId)

            if (dbErrorDelete) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            return new Response(JSON.stringify({ success: true }))
        } else if (body.filetype == 'video') {
            const { data, error: dbError } = await supabase
                .from('video')
                .select('videoLink')
                .eq('id', videoId)
                .single<Video>()

            if (dbError) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            await s3Client.deleteObject({
                Bucket: 'footape',
                Key: data.videoLink.replace('https://footape.s3.fr-par.scw.cloud/', ''),
            }).promise()

            const { error: dbErrorDelete } = await supabase
                .from('video')
                .update({ videoLink: '' })
                .eq('id', videoId)

            if (dbErrorDelete) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            return new Response(JSON.stringify({ success: true }))
        } else {
            const { data, error: dbError } = await supabase
                .from('video')
                .select('thumbnailLink')
                .eq('id', videoId)
                .single<Video>()

            if (dbError) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            await s3Client.deleteObject({
                Bucket: 'footape',
                Key: data.thumbnailLink.replace('https://footape.s3.fr-par.scw.cloud/', ''),
            }).promise()

            const { error: dbErrorDelete } = await supabase
                .from('video')
                .update({ thumbnailLink: '' })
                .eq('id', videoId)

            if (dbErrorDelete) {
                throw error(500, 'Something bad happened, i guess ?');
            }

            return new Response(JSON.stringify({ success: true }))
        }
    } catch {
        throw error(500, 'Something bad happened, i guess ?');
    }
}) satisfies RequestHandler