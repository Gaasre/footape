import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Video } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';

export const POST: RequestHandler = async ({ request, locals, params }) => {
    if (!locals.session?.user) throw error(401);
    const videoId = params.id
    const body: { filetype: string, link: string } = await request.json()

    const { data, error: dbError } = await supabase
        .from('video')
        .select('id, title, teamid, channel:channelId(*)')
        .eq('id', videoId)
        .single<Video>()

    if (dbError) {
        throw error(500, 'Something bad happened');
    }

    if (data.teamid != locals.fullUser?.teamid) {
        throw error(401, 'Not Authorized to access this ressource.');
    }

    if (body.filetype == 'script') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ scriptLink: body.link })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else if (body.filetype == 'voiceover') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ voiceOverLink: body.link })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else if (body.filetype == 'video') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ videoLink: body.link })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else {
        const { error: dbError } = await supabase
            .from('video')
            .update({ thumbnailLink: body.link })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    }

    return new Response();
};

export const DELETE: RequestHandler = async ({ request, locals, params }) => {
    if (!locals.session?.user) throw error(401);
    const videoId = params.id
    const body: { filetype: string } = await request.json()

    const { data, error: dbError } = await supabase
        .from('video')
        .select('id, title, teamid, channel:channelId(*)')
        .eq('id', videoId)
        .single<Video>()

    if (dbError) {
        throw error(500, 'Something bad happened');
    }

    if (data.teamid != locals.fullUser?.teamid) {
        throw error(401, 'Not Authorized to acces this ressource.');
    }

    if (body.filetype == 'script') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ scriptLink: '' })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else if (body.filetype == 'voiceover') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ voiceOverLink: '' })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else if (body.filetype == 'video') {
        const { error: dbError } = await supabase
            .from('video')
            .update({ videoLink: '' })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    } else {
        const { error: dbError } = await supabase
            .from('video')
            .update({ thumbnailLink: '' })
            .eq('id', videoId)

        if (dbError) {
            throw error(500, 'Something bad happened, i guess ?');
        }
    }

    return new Response();
};