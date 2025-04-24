import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useCart } from '../lib/cartContext';

const Checkout: React.FC = () => {
	const router = useRouter();
	const { items, total } = useCart();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Redirect to cart if cart is empty
	useEffect(() => {
		if (items.length === 0) {
			router.push('/cart');
		}
	}, [items, router]);

	const handleCheckout = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ items }),
			});

			if (!response.ok) {
				// Try to get detailed error message from the response
				let errorMessage = 'Something went wrong with the checkout process';
				try {
					const errorData = await response.json();
					if (errorData && errorData.error) {
						errorMessage = errorData.error;
					}
				} catch (parseError) {
					// If we can't parse the JSON, use the default error message
					console.error('Error parsing error response:', parseError);
				}
				throw new Error(errorMessage);
			}

			const data = await response.json();

			// Validate that we have a checkout URL
			if (!data.checkoutUrl) {
				throw new Error('No checkout URL returned from the server');
			}

			// Redirect to Stripe Checkout
			window.location.href = data.checkoutUrl;
		} catch (err) {
			console.error('Checkout error:', err);
			setError(
				err instanceof Error
					? err.message
					: 'An error occurred during checkout. Please try again.'
			);
		} finally {
			setLoading(false);
		}
	};

	if (items.length === 0) {
		return null; // This will be redirected, so no need to render anything
	}

	return (
		<Layout>
			<Head>
				<title>Checkout - Taqueria</title>
			</Head>
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Checkout</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Order summary */}
					<div className="bg-gray-50 p-6 rounded-lg">
						<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
						<div className="border-t">
							{items.map((item) => (
								<div
									key={item.product.id}
									className="py-4 flex justify-between border-b"
								>
									<div>
										<span className="font-medium">{item.product.name}</span>
										<span className="text-gray-600 ml-2">x{item.quantity}</span>
									</div>
									<span>
										{(item.product.price * item.quantity).toFixed(2)} RON
									</span>
								</div>
							))}
						</div>
						<div className="mt-4 flex justify-between text-xl font-bold">
							<span>Total</span>
							<span>{total.toFixed(2)} RON</span>
						</div>
					</div>

					{/* Payment */}
					<div>
						<h2 className="text-xl font-semibold mb-4">Payment</h2>
						<p className="text-gray-600 mb-6">
							Click the button below to proceed to our secure payment
							processing.
						</p>

						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{error}
							</div>
						)}

						<button
							onClick={handleCheckout}
							disabled={loading}
							className={`w-full py-3 rounded-md font-semibold ${
								loading
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-red-900 text-white hover:bg-red-800'
							} transition-colors`}
						>
							{loading ? 'Processing...' : 'Proceed to Payment'}
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Checkout;
