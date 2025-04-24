import { CartItem } from '../../domain/models/CartItem';
import { PaymentGateway } from '../../domain/ports/PaymentGateway';

export class CreateCheckout {
	constructor(private paymentGateway: PaymentGateway) {}

	async execute(items: CartItem[], baseUrl: string): Promise<string> {
		const successUrl = `${baseUrl}/thanks`;
		const cancelUrl = `${baseUrl}/cart`;
		const paymentFailedUrl = `${baseUrl}/payment-failed`;

		return this.paymentGateway.createCheckoutSession(
			items,
			successUrl,
			cancelUrl,
			paymentFailedUrl
		);
	}
}
