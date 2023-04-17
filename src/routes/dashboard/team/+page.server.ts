import { Action, Section } from '$lib/enums';
import type { Member } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { checkPermission } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const canInviteMembers = (subscription: string | undefined, member_count: number | undefined) => {
    if (member_count == null) return false
    switch (subscription) {
        case 'starter':
            if (member_count >= 5) {
                return false;
            }
            return true;
        case 'premium':
            if (member_count >= 10) {
                return false;
            }
            return true;
        case 'entreprise':
            return true;
        default:
            return false;
    }
};

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 9
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1

    return { from, to }
}

export const load = (async ({ locals, url }) => {
    if (!locals.session?.user) throw redirect(301, '/');
    if (!checkPermission(locals.fullUser?.permissions, Section.Team, Action.View, locals.fullUser?.position)) throw redirect(301, '/workflow');

    let page = 1;

    const pageParam = url.searchParams.get('page')

    if (pageParam) {
        page = parseInt(pageParam)
    }

    const { from, to } = getPagination(page - 1, 8)

    const { error: dbError, data: members, count } = await supabase.rpc('get_team_members', { 'user_id': locals.session.user.id }, { count: 'exact' })
        .returns<{ id: any, members: Member[] }>()
        .range(from, to)

    return { members: members?.members, page, pages: count ? Math.ceil(count / 8) : 1 }
}) satisfies PageServerLoad;


export const actions = ({
    editMember: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        if (!checkPermission(locals.fullUser?.permissions, Section.Team, Action.Edit, locals.fullUser?.position)) throw error(401)
        const formData = await request.formData()
        const rate = formData.get('rate')
        const frequency = formData.get('frequency')
        const position = formData.get('position')

        const id = url.searchParams.get('id')

        const { error: dbError } = await supabase
            .from('member')
            .update({
                rate,
                frequency,
                position
            }).eq('id', id)

        if (dbError) {
            return fail(422, dbError);
        }

        return { success: true }
    },
    inviteMember: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        if (!checkPermission(locals.fullUser?.permissions, Section.Team, Action.Add, locals.fullUser?.position)) throw error(401)
        if (!canInviteMembers(locals.fullUser?.subscription, locals.fullUser?.member_count)) {
            throw error(401, { message: 'Subscription Limit' })
        }
        const formData = await request.formData()
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')
        const email = formData.get('email')
        const rate = formData.get('rate')
        const frequency = formData.get('frequency')
        const position = formData.get('position')

        const { data: teamid } = await supabase
            .rpc('get_team_by_user', { user_id: locals.session.user.id })

        const image = `/avatar-${Math.floor(Math.random()) * 5}.svg`

        if (email && teamid) {
            const { data, error: dbError } = await supabase.auth.admin
                .inviteUserByEmail(email as string, {
                    data: {
                        firstname,
                        lastname,
                        rate,
                        frequency,
                        teamid,
                        position,
                        image
                    }
                });

            if (data.user) {
                return { success: true }
            }

            if (dbError) {
                console.log(dbError)
                return fail(422)
            }
        }

        return fail(422);
    }
}) satisfies Actions