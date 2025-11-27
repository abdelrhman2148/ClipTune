import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

// Stripe webhook to handle subscription events
export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle events
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;

            if (userId && session.subscription) {
                await supabase
                    .from('users')
                    .update({
                        stripe_subscription_id: session.subscription,
                        subscription_tier: 'pro', // Determine from price_id in real app
                    })
                    .eq('id', userId);
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            await supabase
                .from('users')
                .update({ subscription_tier: 'free' })
                .eq('stripe_subscription_id', subscription.id);
            break;
        }
    }

    return NextResponse.json({ received: true });
}
