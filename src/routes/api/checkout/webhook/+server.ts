import stripe from '$lib/stripe.server';
import supabase from '$lib/supabaseClient.server';
import type Stripe from 'stripe';
import type { RequestEvent, RequestHandler } from './$types';

const WEBHOOK_SECRET = process.env['STRIPE_WEBHOOK_SECRET'];

const prices = [
    { id: 'price_1Moo1sIHpJ2Gf9tL5uqNTLc9', subscription: 'starter', frequency: 'monthly' },
    { id: 'price_1Moo1sIHpJ2Gf9tLCarOybsh', subscription: 'starter', frequency: 'annual' },
    { id: 'price_1Moo3eIHpJ2Gf9tLgiP3eaxt', subscription: 'standard', frequency: 'monthly' },
    { id: 'price_1Moo3eIHpJ2Gf9tLzuaHjf59', subscription: 'standard', frequency: 'annual' },
    { id: 'price_1Moo55IHpJ2Gf9tLQ3bXy8wN', subscription: 'premium', frequency: 'monthly' },
    { id: 'price_1Moo55IHpJ2Gf9tLqAo1nb2o', subscription: 'premium', frequency: 'annual' },
]

function toBuffer(ab: ArrayBuffer): Buffer {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = view[i];
    }
    return buf;
}

export const POST: RequestHandler = async (event: RequestEvent) => {
    const req = event.request;

    let eventType: string | undefined;
    let data: Stripe.Event.Data | null = null;

    if (WEBHOOK_SECRET) {
        const _rawBody = await req.arrayBuffer();
        const payload = toBuffer(_rawBody);

        const signature = req.headers.get('stripe-signature');
        if (signature) {
            try {
                const event = stripe.webhooks.constructEvent(payload, signature, WEBHOOK_SECRET);
                data = event.data;
                eventType = event.type;
            } catch (err) {
                return new Response(JSON.stringify({
                    status: 500,
                    headers: {},
                    body: JSON.stringify({
                        error: err
                    })
                }))
            }
        }
    } else {
        // data = req.body.data;
        eventType = (await req.formData()).get('type')?.toString();
    }

    switch (eventType) {
        case 'customer.subscription.created':
            // Payment is successful and the subscription is created.
            // You should provision the subscription and save the customer ID to your database.
            var checkoutSession = data?.object as Stripe.Subscription
            var price = prices.find((price) => price.id == checkoutSession.items.data[0].price.id)
            var customer = checkoutSession.customer

            if (price) {
                await supabase
                    .from('team')
                    .update({ subscription: price.subscription, sub_frequency: price.frequency })
                    .eq('customerid', customer)
            }

            break;

        case 'customer.subscription.updated':
            var checkoutSession = data?.object as Stripe.Subscription
            var price = prices.find((price) => price.id == checkoutSession.items.data[0].price.id)
            var customer = checkoutSession.customer

            if (price) {
                await supabase
                    .from('team')
                    .update({ subscription: price.subscription, sub_frequency: price.frequency })
                    .eq('customerid', customer)
            }

            break;
        case 'customer.subscription.deleted':
            var checkoutSession = data?.object as Stripe.Subscription
            var customer = checkoutSession.customer

            if (price) {
                await supabase
                    .from('team')
                    .update({ subscription: '', sub_frequency: '' })
                    .eq('customerid', customer)
            }

            break;
        case 'invoice.paid':
            // Continue to provision the subscription as payments continue to be made.
            // Store the status in your database and check when a user accesses your service.
            // This approach helps you avoid hitting rate limits.
            console.log('Event: invoice.paid');
            break;
        case 'invoice.payment_failed':
            // The payment failed or the customer does not have a valid payment method.
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information.
            console.log('Event: invoice.payment_failed');
            break;
        default:
        // Unhandled event type
    }

    return new Response(JSON.stringify({
        status: 200,
        headers: {},
        body: JSON.stringify({ received: true })
    }))
};