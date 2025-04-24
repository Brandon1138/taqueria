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

	/**
	 * Validates if a URL is valid for Stripe
	 * @param url The URL to validate
	 * @returns boolean indicating if URL is valid
	 */
	private isValidUrl(url: string): boolean {
		try {
			// Check if it's a valid URL format
			const urlObj = new URL(url);
			// Stripe requires HTTPS URLs
			return urlObj.protocol === 'https:';
		} catch (e) {
			// Error thrown if URL is invalid
			return false;
		}
	}

	/**
	 * Ensures the image URL is properly formatted for Stripe
	 * @param imageUrl The original image URL
	 * @param baseUrl The base URL of the application
	 * @returns A valid absolute URL or null if it can't be converted
	 */
	private formatImageUrl(imageUrl: string, baseUrl: string): string | null {
		// If URL is already absolute and valid, return it
		if (this.isValidUrl(imageUrl)) {
			return imageUrl;
		}

		// If URL starts with a slash, it's likely a relative URL
		if (imageUrl && imageUrl.startsWith('/')) {
			const fullUrl = `${baseUrl}${imageUrl}`;
			if (this.isValidUrl(fullUrl)) {
				return fullUrl;
			}
		}

		// Check if the baseUrl itself can be converted to a valid URL
		if (baseUrl.startsWith('http://')) {
			// Convert to https for Stripe
			const httpsUrl = baseUrl.replace('http://', 'https://');
			const fullUrl = `${httpsUrl}${
				imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
			}`;
			if (this.isValidUrl(fullUrl)) {
				return fullUrl;
			}
		}

		// Fallback: If we can't make a valid URL, return null
		return null;
	}

	async createCheckoutSession(
		items: CartItem[],
		successUrl: string,
		cancelUrl: string,
		paymentFailedUrl?: string
	): Promise<string> {
		// Format the URLs with potential error parameters
		const formattedSuccessUrl = successUrl;
		const formattedCancelUrl = cancelUrl;

		// Get base URL from success URL
		const baseUrl = successUrl.substring(0, successUrl.lastIndexOf('/'));

		// If payment failed URL is provided, we'll handle it in the checkout session
		const errorUrl = paymentFailedUrl
			? `${paymentFailedUrl}?error={CHECKOUT_ERROR}`
			: cancelUrl;

		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: items.map((item) => {
				// Format the image URL or remove if invalid
				const imageUrl = this.formatImageUrl(item.product.image, baseUrl);

				// Create the product data object with or without image
				const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData =
					{
						name: item.product.name,
						description: item.product.description,
					};

				// Only add images if we have a valid URL
				if (imageUrl) {
					productData.images = [imageUrl];
				}

				return {
					price_data: {
						currency: 'ron',
						product_data: productData,
						unit_amount: Math.round(item.product.price * 100), // Stripe uses cents
					},
					quantity: item.quantity,
				};
			}),
			mode: 'payment',
			success_url: formattedSuccessUrl,
			cancel_url: formattedCancelUrl,
			payment_intent_data: {
				metadata: {
					error_url: errorUrl,
				},
			},
		});

		return session.url || '';
	}
}
