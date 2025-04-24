import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { Product } from '../domain/models/Product';

interface HomeProps {
	featuredProducts: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
	// In a real application, you would fetch this from an API or database
	const menuData = require('../infrastructure/data/menu.json');
	const featuredProducts = menuData.products.slice(0, 4); // Show up to 4 products

	return {
		props: {
			featuredProducts,
		},
	};
};

// Component for displaying a product tag with stamp-like appearance
const TagStamp: React.FC<{ label: string }> = ({ label }) => {
	// Define color classes based on tag name
	let stampStyles = '';

	switch (label) {
		case 'New':
			stampStyles = 'bg-green-600 rotate-3';
			break;
		case 'Chef Recommends':
			stampStyles = 'bg-blue-600 -rotate-2';
			break;
		case 'Special Offer':
			stampStyles = 'bg-red-600 rotate-1';
			break;
		default:
			stampStyles = 'bg-red-900 -rotate-1';
	}

	return (
		<span
			className={`inline-block ${stampStyles} text-white text-xs font-bold mr-2 px-3 py-1 rounded transform 
			shadow-sm border border-opacity-20 border-black uppercase tracking-wider`}
			style={{ fontFamily: "'Courier New', monospace" }}
		>
			{label}
		</span>
	);
};

// Component for a pill-shaped button with street food aesthetic
const StampButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<button
		className="bg-red-900 text-white px-6 py-2 rounded-md font-bold 
		hover:bg-red-800 focus:ring-2 focus:ring-red-700 focus:outline-none 
		transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-800
		uppercase tracking-wide"
		style={{ fontFamily: "'Courier New', monospace" }}
	>
		{children}
	</button>
);

const Home: React.FC<HomeProps> = ({ featuredProducts }) => {
	return (
		<Layout fullWidth={true}>
			{/* Hero Section */}
			<Hero />

			{/* Main Content */}
			<div className="flex flex-col items-center py-16 bg-neutral-900">
				<div className="w-full max-w-6xl px-4">
					<h2
						className="text-3xl font-bold text-center mb-8 text-white"
						style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
					>
						Featured Items
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{featuredProducts.map((product) => (
							<div
								key={product.id}
								className="relative overflow-hidden h-full transform transition-all hover:scale-102"
							>
								{/* Paper card with texture */}
								<div
									className="absolute inset-0 bg-neutral-800 rounded-lg"
									style={{
										backgroundImage:
											"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
										borderRadius: '0.75rem',
										boxShadow:
											'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
									}}
								></div>

								{/* Optional background stamp - faded */}
								{product.tags?.includes('New') && (
									<div className="absolute right-0 top-1/4 opacity-10 transform rotate-12 text-5xl font-extrabold text-green-400 pointer-events-none z-0">
										NEW
									</div>
								)}
								{product.tags?.includes('Chef Recommends') && (
									<div className="absolute right-1/4 top-1/2 opacity-10 transform -rotate-15 text-5xl font-extrabold text-neutral-400 pointer-events-none z-0">
										CHEF'S
									</div>
								)}

								<div className="relative flex flex-col h-full z-10">
									<div className="relative h-52 overflow-hidden rounded-t-lg">
										<div className="absolute inset-0 bg-black bg-opacity-30"></div>
										<Image
											src={product.image}
											alt={product.name}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											style={{ objectFit: 'cover' }}
										/>
										{/* Rough edge paper tear effect */}
										<div
											className="absolute bottom-0 left-0 right-0 h-4 bg-neutral-800"
											style={{
												backgroundImage:
													"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
												clipPath:
													'polygon(0% 100%, 5% 60%, 10% 90%, 15% 60%, 20% 80%, 25% 45%, 30% 90%, 35% 60%, 40% 80%, 45% 45%, 50% 90%, 55% 60%, 60% 80%, 65% 45%, 70% 90%, 75% 60%, 80% 80%, 85% 45%, 90% 90%, 95% 60%, 100% 100%)',
											}}
										></div>
									</div>
									<div className="p-6 flex flex-col justify-between flex-grow relative">
										<div>
											<div className="flex flex-wrap mb-3 -mt-8">
												{product.tags?.map((tag, index) => (
													<TagStamp key={index} label={tag} />
												))}
											</div>
											<h3
												className="font-extrabold text-xl text-white mt-2"
												style={{ fontFamily: 'sans-serif' }}
											>
												{product.name}
											</h3>
											<p
												className="text-gray-300 mt-2 font-medium"
												style={{ fontFamily: 'sans-serif' }}
											>
												{product.description}
											</p>
										</div>
										<div className="mt-4 flex items-center justify-between">
											<span
												className="block text-lg font-bold text-amber-300"
												style={{ fontFamily: "'Courier New', monospace" }}
											>
												{product.price.toFixed(2)} RON
											</span>
											<StampButton>Add to Cart</StampButton>
										</div>
									</div>
								</div>

								{/* Hand-drawn border effect */}
								<div
									className="absolute inset-0 border-2 border-neutral-600 rounded-lg opacity-20"
									style={{
										borderRadius: '0.75rem',
										borderStyle: 'solid',
										borderWidth: '2px',
										borderColor: 'rgba(255,255,255,0.2)',
										boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.5)',
									}}
								></div>
							</div>
						))}
					</div>

					<div className="text-center mt-10">
						<Link
							href="/menu"
							className="inline-block border-2 border-red-900 bg-neutral-800 text-amber-300 
							px-8 py-3 rounded-md font-bold hover:bg-red-900 hover:text-white 
							focus:ring-2 focus:ring-red-700 focus:outline-none transition-colors
							uppercase tracking-wider shadow-md transform hover:-translate-y-0.5"
							style={{
								fontFamily: "'Courier New', monospace",
								backgroundImage:
									"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
							}}
						>
							View All Menu Items
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
