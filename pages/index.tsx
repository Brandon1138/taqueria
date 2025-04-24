import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { Product } from '../domain/models/Product';
import { useCart } from '../lib/cartContext';

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
const StampButton: React.FC<{
	onClick: () => void;
	children: React.ReactNode;
}> = ({ onClick, children }) => (
	<button
		onClick={onClick}
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
	const { addToCart } = useCart();

	const handleAddToCart = (product: Product) => {
		addToCart(product);
		// Toast notification is handled in the CartContext
	};

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
											<StampButton onClick={() => handleAddToCart(product)}>
												Add to Cart
											</StampButton>
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

					<div className="text-center mt-10 mb-16">
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

					{/* See our Dishes Section */}
					<div className="mt-16">
						<h2
							className="text-3xl font-bold text-center mb-8 text-white"
							style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
						>
							See our Dishes
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Bagel Dish */}
							<div className="relative overflow-hidden rounded-lg transform transition-all hover:scale-105 shadow-xl">
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
								<div className="relative aspect-square">
									<Image
										src="/bagel.webp"
										alt="Bagel"
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										style={{ objectFit: 'cover' }}
										className="rounded-t-lg"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
									<div className="absolute bottom-4 left-4 right-4">
										<h3 className="text-white text-xl font-bold">
											Breakfast Bagel
										</h3>
										<p className="text-gray-200 text-sm">
											Start your day right
										</p>
									</div>
								</div>
							</div>

							{/* Burger Dish */}
							<div className="relative overflow-hidden rounded-lg transform transition-all hover:scale-105 shadow-xl">
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
								<div className="relative aspect-square">
									<Image
										src="/burger.webp"
										alt="Burger"
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										style={{ objectFit: 'cover' }}
										className="rounded-t-lg"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
									<div className="absolute bottom-4 left-4 right-4">
										<h3 className="text-white text-xl font-bold">
											Signature Burger
										</h3>
										<p className="text-gray-200 text-sm">
											Our customer favorite
										</p>
									</div>
								</div>
							</div>

							{/* Wrap Dish */}
							<div className="relative overflow-hidden rounded-lg transform transition-all hover:scale-105 shadow-xl">
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
								<div className="relative aspect-square">
									<Image
										src="/wrap.webp"
										alt="Wrap"
										fill
										sizes="(max-width: 768px) 100vw, 33vw"
										style={{ objectFit: 'cover' }}
										className="rounded-t-lg"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
									<div className="absolute bottom-4 left-4 right-4">
										<h3 className="text-white text-xl font-bold">
											Fresh Wraps
										</h3>
										<p className="text-gray-200 text-sm">Light and delicious</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Mobile App Download Section */}
					<div className="mt-16">
						<h2
							className="text-3xl font-bold text-center mb-8 text-white"
							style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
						>
							Download our Mobile App
						</h2>

						<div className="flex flex-col items-center">
							<div
								className="relative overflow-hidden rounded-lg transform transition-all hover:scale-105 shadow-xl 
								w-full bg-gradient-to-br from-red-900 to-neutral-900 p-8 mb-8"
								style={{
									backgroundImage:
										"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
									borderRadius: '0.75rem',
									boxShadow:
										'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
								}}
							>
								<div className="flex flex-col md:flex-row items-center justify-between">
									{/* Text Content */}
									<div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
										<div className="inline-block mb-4 text-amber-300 border-b-2 border-amber-300 pb-1">
											<span
												className="text-lg font-bold uppercase tracking-wide"
												style={{ fontFamily: "'Courier New', monospace" }}
											>
												NEW
											</span>
										</div>
										<h3 className="text-white text-2xl font-bold mb-4">
											The Taqueria Experience
											<br />
											In Your Pocket
										</h3>
										<p className="text-gray-300 mb-6 leading-relaxed">
											Enjoy our delicious Mexican street food anytime, anywhere!
											Order directly from your phone, track your delivery in
											real-time, and earn rewards with every purchase.
										</p>
										<a
											href="https://play.google.com/store/apps/details?id=com.restaumatic.taqueria&pli=1"
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-md font-bold 
											hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none 
											transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-700
											uppercase tracking-wide"
											style={{ fontFamily: "'Courier New', monospace" }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 mr-2"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
												<path
													fillRule="evenodd"
													d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
													clipRule="evenodd"
												/>
											</svg>
											Get it on Google Play
										</a>
									</div>

									{/* Phone Mockup */}
									<div className="md:w-1/2 flex justify-center relative">
										<div className="relative w-48 h-80 bg-black rounded-3xl overflow-hidden border-4 border-neutral-800 shadow-xl transform -rotate-2">
											{/* Phone Screen */}
											<div className="absolute inset-0 bg-neutral-800">
												{/* App UI Mockup */}
												<div className="h-6 bg-red-900 flex items-center justify-center">
													<div className="w-16 h-1 bg-neutral-400 rounded-full"></div>
												</div>
												<div className="p-3">
													{/* App Logo */}
													<div className="mx-auto w-16 h-16 bg-red-900 rounded-xl flex items-center justify-center mb-3">
														<Image
															src="/taqueria_logo_white.svg"
															alt="Taqueria App Logo"
															width={40}
															height={40}
															style={{ objectFit: 'contain' }}
														/>
													</div>
													{/* Menu Items */}
													<div className="space-y-3">
														<div className="h-14 bg-neutral-700 rounded-lg flex p-2">
															<div className="w-10 h-10 bg-red-800 rounded mr-2"></div>
															<div className="flex-1">
																<div className="w-20 h-2 bg-neutral-400 rounded mb-1"></div>
																<div className="w-16 h-2 bg-neutral-500 rounded"></div>
															</div>
														</div>
														<div className="h-14 bg-neutral-700 rounded-lg flex p-2">
															<div className="w-10 h-10 bg-red-800 rounded mr-2"></div>
															<div className="flex-1">
																<div className="w-24 h-2 bg-neutral-400 rounded mb-1"></div>
																<div className="w-20 h-2 bg-neutral-500 rounded"></div>
															</div>
														</div>
														<div className="h-14 bg-neutral-700 rounded-lg flex p-2">
															<div className="w-10 h-10 bg-red-800 rounded mr-2"></div>
															<div className="flex-1">
																<div className="w-16 h-2 bg-neutral-400 rounded mb-1"></div>
																<div className="w-12 h-2 bg-neutral-500 rounded"></div>
															</div>
														</div>
													</div>
												</div>
											</div>

											{/* Phone Home Button */}
											<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-neutral-700 rounded-full"></div>
										</div>

										{/* Decorative elements */}
										<div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-300 rounded-full opacity-30 transform rotate-12"></div>
										<div className="absolute bottom-8 -left-6 w-12 h-12 bg-red-700 rounded-full opacity-20"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
