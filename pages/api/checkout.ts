import type { NextApiRequest, NextApiResponse } from 'next';
import { StripePaymentGateway } from '../../infrastructure/stripe/StripePaymentGateway';
import { CreateCheckout } from '../../application/use-cases/CreateCheckout';
import { CartItem } from '../../domain/models/CartItem';

type ResponseData =
	| {
			checkoutUrl: string;
	  }
	| {
			error: string;
	  };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { items } = req.body;

		if (!items || !Array.isArray(items) || items.length === 0) {
			return res.status(400).json({ error: 'Invalid cart items' });
		}

		// Get the Stripe API key from environment variables
		const stripeApiKey = process.env.STRIPE_SECRET_KEY;
		if (!stripeApiKey) {
			throw new Error('Missing Stripe API key');
		}

		// Create the payment gateway
		const paymentGateway = new StripePaymentGateway(stripeApiKey);

		// Create the use case
		const createCheckout = new CreateCheckout(paymentGateway);

		// Get the base URL
		const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
		const host = req.headers.host || 'localhost:3000';
		const baseUrl = `${protocol}://${host}`;

		// Execute the use case
		const checkoutUrl = await createCheckout.execute(
			items as CartItem[],
			baseUrl
		);

		// Return the checkout URL
		return res.status(200).json({ checkoutUrl });
	} catch (error) {
		console.error('Checkout error:', error);
		return res.status(500).json({ error: 'Failed to create checkout session' });
	}
}
