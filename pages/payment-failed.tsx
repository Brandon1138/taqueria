import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const PaymentFailed: React.FC = () => {
	const router = useRouter();
	const { error } = router.query;

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
						className="w-16 h-16 mx-auto text-red-500"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
				<p className="text-gray-600 mb-8">
					{error
						? `There was an issue with your payment: ${error}`
						: 'Your payment could not be processed. Please try again.'}
				</p>

				<div className="flex flex-col md:flex-row justify-center gap-4">
					<Link
						href="/checkout"
						className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
					>
						Try Again
					</Link>
					<Link
						href="/cart"
						className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-500 hover:text-white transition-colors"
					>
						Return to Cart
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default PaymentFailed;
