import stripe from '$lib/stripe.server';
import supabase from '$lib/supabaseClient.server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
    if (!locals.fullUser?.customerid) {
        const { id } = await stripe.customers.create({ email: locals.fullUser?.email });
        await supabase
            .from('team')
            .update({ customerid: id })
            .eq('id', locals.fullUser?.teamid);
    }

    return new Response(JSON.stringify({
        status: 200,
        headers: {},
        body: JSON.stringify({ success: true })
    }));
};