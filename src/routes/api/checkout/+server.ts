import stripe from '$lib/stripe.server';
import supabase from '$lib/supabaseClient.server';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.session?.user) throw redirect(301, '/login')
    if (locals.fullUser?.position != 'Owner') throw redirect(301, '/permission_error')

    const data = await request.json()

    let id;

    if (!locals.fullUser?.customerid) {
        id = (await stripe.customers.create({ email: locals.fullUser?.email })).id;
        await supabase
            .from('team')
            .update({ customerid: id })
            .eq('id', locals.fullUser.teamid);
    } else {
        id = locals.fullUser?.customerid
    }

    const { url } = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: data.priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        subscription_data: data.trial ? {
            trial_period_days: 7
        } : {},
        customer: id,
        success_url: import.meta.env.VITE_BASE_URL + '/checkout/success',
        cancel_url: import.meta.env.VITE_BASE_URL + '/checkout/failed'
    })

    return new Response(JSON.stringify({ url }));
};