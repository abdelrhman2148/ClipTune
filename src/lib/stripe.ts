import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
    if (!stripeClient) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Missing STRIPE_SECRET_KEY environment variable');
        }
        stripeClient = new Stripe(secretKey, {
            apiVersion: '2025-11-17.clover',
        });
    }
    return stripeClient;
}

// Lazy initialization - only creates client when accessed at runtime
// This prevents build-time errors when env vars aren't available
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        const client = getStripeClient();
        const value = client[prop as keyof Stripe];
        // If it's a function, bind it to the client
        if (typeof value === 'function') {
            return value.bind(client);
        }
        // If it's an object (like .customers), return it directly
        if (typeof value === 'object' && value !== null) {
            return value;
        }
        return value;
    }
});

// Pricing tiers
export const PRICING_PLANS = {
    free: {
        name: 'Free',
        price: 0,
        credits: 3, // 3 clips per month
        features: ['3 clips/month', 'Basic AI suggestions', 'Watermarked exports'],
    },
    pro: {
        name: 'Pro',
        price: 29,
        priceId: process.env.STRIPE_PRICE_ID_PRO,
        credits: 50,
        features: ['50 clips/month', 'Advanced AI', 'No watermarks', '1080p exports'],
    },
    unlimited: {
        name: 'Unlimited',
        price: 79,
        priceId: process.env.STRIPE_PRICE_ID_UNLIMITED,
        credits: -1, // Unlimited
        features: ['Unlimited clips', 'Priority processing', '4K exports', 'API access'],
    },
};
