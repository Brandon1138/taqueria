import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartWidget from './CartWidget';

interface LayoutProps {
	children: ReactNode;
	fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="fixed top-0 left-0 right-0 bg-red-900 text-white shadow-md z-50">
				<div className="container mx-auto px-6 flex justify-between items-center h-16">
					<Link href="/" className="flex items-center">
						<Image
							src="/taqueria_logo_white.svg"
							alt="Taqueria Logo"
							width={120}
							height={30}
							priority
						/>
					</Link>
					<nav className="flex items-center space-x-6">
						<Link href="/menu" className="hover:underline">
							Menu
						</Link>
						<CartWidget />
					</nav>
				</div>
			</header>
			<main
				className={`flex-grow pt-16 ${
					fullWidth ? '' : 'container mx-auto px-6'
				}`}
			>
				{children}
			</main>
			<footer className="bg-neutral-800 text-white">
				<div className="container mx-auto py-4 px-6 text-center">
					<p>© {new Date().getFullYear()} Taqueria. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
