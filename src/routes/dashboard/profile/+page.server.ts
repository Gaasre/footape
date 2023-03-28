import stripe from '$lib/stripe.server';
import supabase from '$lib/supabaseClient.server';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions = ({
    editUser: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        const formData = await request.formData()
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')

        const { error: dbError } = await supabase
            .from('user')
            .update({
                firstname,
                lastname
            }).eq('id', locals.session.user.id)

        if (dbError) {
            return fail(422, dbError);
        }

        return { success: true }
    },
    editImage: async ({ locals, request, url }) => {
        if (!locals.session?.user) throw error(401);
        const image = `/avatar-${Math.floor(Math.random() * 5)}.svg`

        const { error: dbError } = await supabase
            .from('user')
            .update({
                image
            }).eq('id', locals.session.user.id)

        if (dbError) {
            return fail(422, dbError);
        }

        return { success: true }
    },
    portal: async ({ locals, request, url }) => {
        if (!locals.fullUser?.customerid) return fail(422)

        if (import.meta.env.VITE_BASE_URL == 'http//localhost:5173') {
            throw redirect(301, 'https://billing.stripe.com/p/login/test_3cseVq8FCaqB13ycMM')
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: locals.fullUser?.customerid,
            return_url: import.meta.env.VITE_BASE_URL + '/dashboard'
        })

        throw redirect(301, session.url)
    }

}) satisfies Actions