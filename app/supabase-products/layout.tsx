'use client';

import React from 'react';
import Link from 'next/link';

export default function SupabaseProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-neutral-900 text-white">
			<header className="bg-neutral-800 p-4 flex justify-between items-center">
				<Link href="/" className="text-xl font-bold">
					Taqueria
				</Link>
				<div className="flex items-center gap-4">
					{/* Cart functionality temporarily removed for deployment */}
					<Link href="/" className="text-white hover:text-gray-300">
						Home
					</Link>
				</div>
			</header>
			{children}
			{/* Cart modal temporarily removed for deployment */}
		</div>
	);
}
