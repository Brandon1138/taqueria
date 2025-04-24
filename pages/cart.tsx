import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import CartItem from '../components/CartItem';
import { useCart } from '../lib/cartContext';

const Cart: React.FC = () => {
	const { items, total, clearCart } = useCart();

	return (
		<Layout fullWidth={false}>
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Your Cart</h1>

				{items.length === 0 ? (
					<div className="text-center py-12">
						<h2 className="text-xl mb-4">Your cart is empty</h2>
						<p className="text-gray-600 mb-8">
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
							<span className="text-gray-600">
								{items.length} item(s) in cart
							</span>
							<button
								onClick={clearCart}
								className="text-red-500 hover:text-red-700"
							>
								Clear Cart
							</button>
						</div>

						<div className="border-t">
							{items.map((item) => (
								<CartItem key={item.product.id} item={item} />
							))}
						</div>

						<div className="mt-8 border-t pt-6">
							<div className="flex justify-between text-xl font-bold mb-8">
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
