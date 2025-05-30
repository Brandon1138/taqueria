import React from 'react';
import Image from 'next/image';
import { CartItem as CartItemType } from '../domain/models/CartItem';
import { useCart } from '../lib/cartContext';

interface CartItemProps {
	item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { updateQuantity, removeFromCart } = useCart();
	const { product, quantity } = item;

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity < 1) {
			removeFromCart(product.id);
		} else {
			updateQuantity(product.id, newQuantity);
		}
	};

	return (
		<div className="flex items-center border-b py-4">
			<div className="relative h-20 w-20 flex-shrink-0">
				<Image
					src={product.image}
					alt={product.name}
					fill
					style={{ objectFit: 'cover' }}
					className="rounded"
				/>
			</div>
			<div className="ml-4 flex-grow">
				<h3 className="font-medium text-white">{product.name}</h3>
				<p className="text-amber-300 text-sm">{product.price.toFixed(2)} RON</p>
			</div>
			<div className="flex items-center">
				<button
					onClick={() => handleQuantityChange(quantity - 1)}
					className="w-8 h-8 flex items-center justify-center border rounded-md bg-neutral-700 text-white hover:bg-neutral-600"
				>
					-
				</button>
				<span className="mx-2 w-8 text-center text-white">{quantity}</span>
				<button
					onClick={() => handleQuantityChange(quantity + 1)}
					className="w-8 h-8 flex items-center justify-center border rounded-md bg-neutral-700 text-white hover:bg-neutral-600"
				>
					+
				</button>
			</div>
			<div className="ml-6 w-24 text-right">
				<span className="font-medium text-amber-300">
					{(product.price * quantity).toFixed(2)} RON
				</span>
			</div>
			<button
				onClick={() => removeFromCart(product.id)}
				className="ml-4 text-red-500 hover:text-red-700"
				aria-label="Remove item"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</button>
		</div>
	);
};

export default CartItem;
