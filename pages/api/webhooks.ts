import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Disable body parsing, we need the raw body for webhook signature verification
export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: '2023-10-16',
	});

	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		return res.status(500).json({ error: 'Webhook secret not configured' });
	}

	try {
		// Get raw body data
		const chunks: Buffer[] = [];
		for await (const chunk of req) {
			chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
		}
		const rawBody = Buffer.concat(chunks).toString('utf8');
		const signature = req.headers['stripe-signature'] as string;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
		} catch (err) {
			console.error(
				`Webhook signature verification failed: ${
					err instanceof Error ? err.message : 'Unknown error'
				}`
			);
			return res
				.status(400)
				.json({ error: 'Webhook signature verification failed' });
		}

		// Handle different event types
		switch (event.type) {
			case 'checkout.session.completed':
				const session = event.data.object as Stripe.Checkout.Session;
				console.log(`Payment succeeded for session: ${session.id}`);
				// Here you would typically:
				// 1. Update order status in your database
				// 2. Fulfill the order (send confirmation emails, etc.)
				break;

			case 'payment_intent.succeeded':
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log(`Payment intent succeeded: ${paymentIntent.id}`);
				break;

			case 'payment_intent.payment_failed':
				const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log(`Payment failed: ${failedPaymentIntent.id}`);
				// Handle failed payment (notify customer, update order status)
				break;

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		return res.status(200).json({ received: true });
	} catch (err) {
		console.error(
			`Webhook error: ${err instanceof Error ? err.message : 'Unknown error'}`
		);
		return res.status(500).json({ error: 'Webhook handler failed' });
	}
}
