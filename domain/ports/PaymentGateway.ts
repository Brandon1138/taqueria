import { CartItem } from '../models/CartItem';

export interface PaymentGateway {
	createCheckoutSession(
		items: CartItem[],
		successUrl: string,
		cancelUrl: string
	): Promise<string>;
}
