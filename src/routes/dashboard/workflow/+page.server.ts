import type { Channel, Video } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.session?.user) throw redirect(301, '/');

    let data: { name: string, cards: Video[] }[] = [
        {
            name: 'Available',
            cards: []
        },
        {
            name: 'In Scripting',
            cards: []
        },
        {
            name: 'In Voice Over',
            cards: []
        },
        {
            name: 'In Video Editing',
            cards: []
        },
        {
            name: 'In Quality Check',
            cards: []
        },
        {
            name: 'Ready For Upload',
            cards: []
        },
        {
            name: 'Published',
            cards: []
        }
    ]

    const { error: dbError, data: videos } = await supabase
        .from('video')
        .select('*, channel:channelId(*), works:work(*, member(*, user(*)))')
        .eq('teamid', locals.fullUser?.teamid)
        .returns<Video[]>()

    videos?.forEach(video => {
        data = data.map(status => {
            if (status.name == video.status) {
                return { name: status.name, cards: [...status.cards, video] }
            }
            return status
        })
    })

    const { error: dbErrorChannel, data: channels } = await supabase
        .from('channel')
        .select('*')
        .eq('teamid', locals.fullUser?.teamid)
        .returns<Channel[]>()

    if (videos && channels) {
        return { videos: data, channels }
    }

    return fail(422);
}) satisfies PageServerLoad;