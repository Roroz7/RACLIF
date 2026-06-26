import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY is missing from environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any, // fallback pour les versions plus récentes
  appInfo: {
    name: 'Raclif',
    version: '0.1.0',
  },
});
