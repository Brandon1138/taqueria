import React, { useState } from 'react';
import CartWidget from '../../components/CartWidget';
import CartModal from '../../components/CartModal';
import Link from 'next/link';

export default function SupabaseProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);

	const toggleCartModal = () => {
		setIsCartModalOpen(!isCartModalOpen);
	};

	return (
		<div className="min-h-screen bg-neutral-900 text-white">
			<header className="bg-neutral-800 p-4 flex justify-between items-center">
				<Link href="/" className="text-xl font-bold">
					Taqueria
				</Link>
				<div className="flex items-center gap-4">
					<CartWidget onCartClick={toggleCartModal} />
				</div>
			</header>
			{children}
			<CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
		</div>
	);
}
