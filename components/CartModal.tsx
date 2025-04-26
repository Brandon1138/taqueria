import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../lib/cartContext';

interface CartModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
	const { items, updateQuantity, removeFromCart, total } = useCart();

	// Handler for quantity changes
	const handleQuantityChange = (productId: string, newQuantity: number) => {
		if (newQuantity <= 0) {
			removeFromCart(productId);
		} else {
			updateQuantity(productId, newQuantity);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Modal backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-50"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Modal content */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
						className="fixed top-0 right-0 h-full w-80 md:w-96 bg-neutral-900 bg-opacity-80 backdrop-blur-md shadow-lg z-50"
						style={{ maxHeight: '100vh', overflowY: 'auto' }}
					>
						<div className="px-6 py-6 space-y-6">
							{/* Close button */}
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-bold text-white">Your Cart</h2>
								<button
									onClick={onClose}
									className="text-white focus:outline-none"
									aria-label="Close menu"
								>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{/* Cart Items */}
							<div className="space-y-4">
								{items.length === 0 ? (
									<div className="text-center py-8">
										<p className="text-white mb-4">Your cart is empty</p>
										<button
											onClick={onClose}
											className="bg-white text-red-900 px-4 py-2 rounded hover:bg-red-200 transition-colors"
										>
											Continue Shopping
										</button>
									</div>
								) : (
									<>
										{items.map((item) => (
											<div
												key={item.product.id}
												className="border-b border-neutral-800 pb-4"
											>
												<div className="flex items-center">
													<div className="w-16 h-16 relative">
														<Image
															src={item.product.image}
															alt={item.product.name}
															fill
															style={{ objectFit: 'cover' }}
															className="rounded-md"
														/>
													</div>
													<div className="ml-4 flex-grow">
														<p className="text-white font-medium">
															{item.product.name}
														</p>
														<p className="text-neutral-400 text-sm">
															{(item.product.price * item.quantity).toFixed(2)}{' '}
															RON
														</p>
													</div>
													<button
														onClick={() => removeFromCart(item.product.id)}
														className="text-neutral-400 hover:text-white p-1"
														aria-label="Remove item"
													>
														<svg
															className="w-5 h-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</div>

												{/* Quantity controls */}
												<div className="flex justify-end items-center mt-2">
													<button
														onClick={() =>
															handleQuantityChange(
																item.product.id,
																item.quantity - 1
															)
														}
														className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 text-white hover:bg-neutral-700"
														aria-label="Decrease quantity"
													>
														-
													</button>
													<span className="mx-3 text-white">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															handleQuantityChange(
																item.product.id,
																item.quantity + 1
															)
														}
														className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 text-white hover:bg-neutral-700"
														aria-label="Increase quantity"
													>
														+
													</button>
													<button
														onClick={() =>
															handleQuantityChange(
																item.product.id,
																item.quantity * 2
															)
														}
														className="ml-3 text-xs bg-red-800 text-white py-1 px-2 rounded hover:bg-red-700"
														aria-label="Double quantity"
													>
														2×
													</button>
												</div>
											</div>
										))}

										{/* Total and checkout */}
										<div className="pt-4 border-t border-neutral-800">
											<div className="flex justify-between items-center mb-4">
												<span className="text-white font-medium">Total:</span>
												<span className="text-white font-bold text-xl">
													{total.toFixed(2)} RON
												</span>
											</div>

											<Link
												href="/checkout"
												onClick={onClose}
												className="block w-full text-center py-3 rounded-md text-base font-medium bg-white text-red-900 hover:bg-red-200 transition-colors"
											>
												Proceed to Checkout
											</Link>

											<button
												onClick={onClose}
												className="block w-full text-center py-3 mt-2 rounded-md text-base font-medium bg-transparent border border-white text-white hover:bg-white hover:text-red-900 transition-colors"
											>
												Continue Shopping
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default CartModal;
