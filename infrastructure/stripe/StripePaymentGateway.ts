import Stripe from 'stripe';
import { CartItem } from '../../domain/models/CartItem';
import { PaymentGateway } from '../../domain/ports/PaymentGateway';

export class StripePaymentGateway implements PaymentGateway {
	private stripe: Stripe;

	constructor(apiKey: string) {
		this.stripe = new Stripe(apiKey, {
			apiVersion: '2023-10-16',
		});
	}

	async createCheckoutSession(
		items: CartItem[],
		successUrl: string,
		cancelUrl: string
	): Promise<string> {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: items.map((item) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.product.name,
						description: item.product.description,
						images: [item.product.image],
					},
					unit_amount: Math.round(item.product.price * 100), // Stripe uses cents
				},
				quantity: item.quantity,
			})),
			mode: 'payment',
			success_url: successUrl,
			cancel_url: cancelUrl,
		});

		return session.url || '';
	}
}
