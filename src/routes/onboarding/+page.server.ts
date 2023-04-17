import supabase from '$lib/supabaseClient.server';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.session?.user) throw redirect(301, '/login')
    if (locals.fullUser?.position != 'Owner') {
        throw redirect(301, '/dashboard')
    }
    return {};
}) satisfies PageServerLoad;

export const actions = ({
    updateUser: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        const formData = await request.formData()
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')

        const { error: dbError } = await supabase
            .from('user')
            .update({
                firstname, lastname
            }).eq('id', locals.session.user.id)

        if (dbError) {
            return fail(422, dbError);
        }

        return { success: true }
    },
}) satisfies Actions