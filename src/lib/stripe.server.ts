import Stripe from 'stripe'

const stripe = new Stripe(
    process.env.STRIPE_SECRET ? process.env.STRIPE_SECRET : '',
    {
        apiVersion: '2022-11-15'
    }
)

export default stripe