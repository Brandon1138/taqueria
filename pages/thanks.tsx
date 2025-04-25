import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../lib/cartContext';
import { useToast } from '../components/ToastProvider';

const Thanks: React.FC = () => {
	const router = useRouter();
	const { clearCart, items, updateQuantity } = useCart();
	const { showToast, removeToast } = useToast();
	const [toastId, setToastId] = useState<string | null>(null);

	// Clear cart on successful payment and show toast
	useEffect(() => {
		// Silently clear the cart without triggering toast notifications
		// by removing each item individually without notifications
		if (items.length > 0) {
			// Clear items without triggering toasts
			items.forEach((item) => {
				updateQuantity(item.product.id, 0);
			});
		}

		// Show only one success toast
		if (!toastId) {
			const id = Math.random().toString(36).substring(2, 9);
			setToastId(id);
			showToast('Order completed successfully!', 'success', 8000);
		}

		// Clean up function to remove toast when leaving page
		return () => {
			if (toastId) {
				removeToast(toastId);
			}
		};
	}, [items, updateQuantity, showToast, removeToast, toastId]);

	// Navigation handlers with explicit navigation
	const goToMenu = () => {
		if (toastId) {
			removeToast(toastId);
		}
		// Force navigation to menu page
		window.location.href = '/menu';
	};

	const goToHome = () => {
		if (toastId) {
			removeToast(toastId);
		}
		// Force navigation to home page
		window.location.href = '/';
	};

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

				<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
					Thank You for Your Order!
				</h1>
				<p className="text-gray-700 dark:text-gray-300 mb-8">
					Your order has been successfully processed. You'll receive a
					confirmation email shortly.
				</p>

				<div className="flex flex-col md:flex-row justify-center gap-4">
					<button
						onClick={goToMenu}
						className="bg-red-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition-colors"
					>
						Order More Food
					</button>
					<button
						onClick={goToHome}
						className="border-2 border-red-900 text-red-900 dark:text-red-400 dark:border-red-400 px-6 py-3 rounded-md font-semibold hover:bg-red-900 hover:text-white dark:hover:bg-red-900 dark:hover:text-white transition-colors"
					>
						Back to Home
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default Thanks;
