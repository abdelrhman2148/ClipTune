import Stripe from 'stripe';

// Initialize Stripe on the server side
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2025-11-17.clover' as any, // Cast to any if strict typing fails on version
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
