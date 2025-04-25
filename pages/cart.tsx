import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import { useCart } from '../lib/cartContext';

const Cart: React.FC = () => {
	const { items, total, clearCart } = useCart();

	return (
		<Layout>
			<Head>
				<title>Your Cart - Taqueria</title>
			</Head>
			<div className="max-w-4xl mx-auto pt-8">
				<h1 className="text-3xl font-bold mb-8 text-white">Your Cart</h1>

				{items.length === 0 ? (
					<div className="text-center py-12">
						<h2 className="text-xl mb-4 text-white">Your cart is empty</h2>
						<p className="text-gray-300 mb-8">
							Looks like you haven't added any items to your cart yet.
						</p>
						<Link
							href="/menu"
							className="bg-red-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition-colors"
						>
							Browse Our Menu
						</Link>
					</div>
				) : (
					<>
						<div className="mb-4 flex justify-between items-center">
							<span className="text-gray-300">
								{items.length} item(s) in cart
							</span>
							<button
								onClick={clearCart}
								className="text-red-400 hover:text-red-300"
							>
								Clear Cart
							</button>
						</div>

						<div className="border-t border-gray-700">
							{items.map((item) => (
								<CartItem key={item.product.id} item={item} />
							))}
						</div>

						<div className="mt-8 border-t border-gray-700 pt-6">
							<div className="flex justify-between text-xl font-bold mb-8 text-white">
								<span>Total</span>
								<span>{total.toFixed(2)} RON</span>
							</div>

							<div className="flex justify-end">
								<Link
									href="/checkout"
									className="bg-red-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-800 transition-colors"
								>
									Proceed to Checkout
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	);
};

export default Cart;
