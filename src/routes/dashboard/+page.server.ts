import { Section, Action } from '$lib/enums';
import type { Channel, Video, Work } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { checkPermission } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import moment from 'moment';
import type { PageServerLoad } from './$types';

const total = (work: Work) => {
    if (work.member.frequency == 'hourly') {
        return work.loggedhours * work.member.rate;
    } else {
        return work.member.rate;
    }
};

export const load = (async ({ locals }) => {
    if (!locals.session?.user) throw redirect(301, '/');
    if (!checkPermission(locals.fullUser?.permissions, Section.Dashboard, Action.View, locals.fullUser?.position)) throw redirect(301, '/dashboard/workflow');

    const monthlyCosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const monthlyTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const startDate = moment().subtract(6, 'M');
    const endDate = moment().add(6, 'M');

    const startMonth = moment().startOf('month');
    const endMonth = moment().endOf('month');

    const today = new Date()

    const { error: dbError, data } = await supabase
        .from('video')
        .select('*, works:work(*, member(*))')
        .eq('teamid', locals.fullUser?.teamid)
        .gte('publishedAt', startDate.toISOString())
        .lte('publishedAt', endDate.toISOString())
        .returns<Video[]>()

    const { error: dbError2, data: channelData } = await supabase
        .from('channel')
        .select('*, videos:video!inner(*, works:work(*, member(*)))')
        .eq('teamid', locals.fullUser?.teamid)
        .gte('video.publishedAt', startMonth.toISOString())
        .lte('video.publishedAt', endMonth.toISOString())
        .returns<Channel[]>()

    const channelsCost = channelData?.map(({ videos }) => {
        return {
            cost: videos.reduce((x, y) => x + y.works.reduce((a, b) => a + total(b), 0), 0),
            videos: videos.length
        }
    })

    data?.forEach(({ works, publishedAt }) => {
        const month = new Date(publishedAt ?? '').getMonth()
        monthlyCosts[month] += works.reduce((a, b) => a + total(b), 0)
        monthlyTime[month] += works.reduce((a, b) => a + (b.finished_at ? ((new Date(b.finished_at).getTime() - new Date(b.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0), 0)
    })

    const monthCount = data?.filter((video) => video.publishedAt ? (new Date(video.publishedAt).getMonth() == today.getMonth()) : false).length
    const lastMonthCount = data?.filter((video) => video.publishedAt ? (new Date(video.publishedAt).getMonth() == (today.getMonth() == 0 ? 0 : today.getMonth() - 1)) : false).length

    let totalVideos = {
        count: 0,
        diff: 0,
        label: ''
    }

    const costMin = monthlyCosts[today.getMonth()] < monthlyCosts[today.getMonth() == 0 ? 0 : today.getMonth() - 1] ? monthlyCosts[today.getMonth()] : monthlyCosts[today.getMonth() == 0 ? 0 : today.getMonth() - 1]
    const costDiff = Math.floor((Math.abs(monthlyCosts[today.getMonth() == 0 ? 0 : today.getMonth() - 1] - monthlyCosts[today.getMonth()]) / (costMin == 0 ? 1 : costMin)) * 100)

    let totalCost = {
        count: monthlyCosts[today.getMonth()].toLocaleString('en-US'),
        diff: costDiff,
        label: monthlyCosts[today.getMonth()] < monthlyCosts[today.getMonth() == 0 ? 0 : today.getMonth() - 1] ? 'less' : 'more'
    }

    if (monthCount != null && lastMonthCount != null) {
        const min = monthCount < lastMonthCount ? monthCount : lastMonthCount

        totalVideos = {
            count: monthCount,
            diff: Math.floor((Math.abs(lastMonthCount - monthCount) / (min == 0 ? 1 : min)) * 100),
            label: monthCount < lastMonthCount ? 'less' : 'more',
        }
    }

    return { monthlyCosts, monthlyTime, totalVideos, totalCost, channelsCost };
}) satisfies PageServerLoad;