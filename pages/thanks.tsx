import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../lib/cartContext';

const Thanks: React.FC = () => {
	const router = useRouter();
	const { clearCart } = useCart();

	// Clear cart on successful payment
	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<Layout>
			<div className="max-w-2xl mx-auto text-center py-12">
				<div className="mb-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-16 h-16 mx-auto text-green-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
				<p className="text-gray-600 mb-8">
					Your order has been successfully processed. You'll receive a
					confirmation email shortly.
				</p>

				<div className="flex flex-col md:flex-row justify-center gap-4">
					<Link
						href="/menu"
						className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
					>
						Order More Food
					</Link>
					<Link
						href="/"
						className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-500 hover:text-white transition-colors"
					>
						Back to Home
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Thanks;
