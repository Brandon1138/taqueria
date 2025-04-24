import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
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
			<Head>
				<title>Taqueria - Authentic Mexican Street Food</title>
			</Head>
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
								className="relative overflow-visible rounded-lg transform transition-all hover:scale-105 shadow-xl 
								w-full bg-gradient-to-br from-red-900 to-neutral-900 p-8 mb-8"
								style={{
									backgroundImage:
										"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
									borderRadius: '0.75rem',
									boxShadow:
										'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
								}}
							>
								<div className="absolute top-0 right-0 rotate-12 transform translate-x-8 -translate-y-4 z-10">
									<div
										className="bg-red-600 text-white py-2 px-8 shadow-lg font-bold uppercase tracking-wider text-sm transform -rotate-6"
										style={{ fontFamily: "'Courier New', monospace" }}
									>
										Special Offer
									</div>
								</div>

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

					{/* Happy Hour Promotion Section */}
					<div className="mt-16">
						<h2
							className="text-3xl font-bold text-center mb-8 text-white"
							style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
						>
							Happy Hour
						</h2>

						<div className="flex flex-col items-center">
							<div
								className="relative overflow-visible rounded-lg transform transition-all hover:scale-105 shadow-xl 
								w-full bg-gradient-to-br from-red-900 to-neutral-900 p-8 mb-8"
								style={{
									backgroundImage:
										"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
									borderRadius: '0.75rem',
									boxShadow:
										'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
								}}
							>
								<div className="absolute top-0 right-0 rotate-12 transform translate-x-8 -translate-y-4 z-10">
									<div
										className="bg-red-600 text-white py-2 px-8 shadow-lg font-bold uppercase tracking-wider text-sm transform -rotate-6"
										style={{ fontFamily: "'Courier New', monospace" }}
									>
										Special Offer
									</div>
								</div>

								<div className="flex flex-col md:flex-row items-center justify-between">
									{/* Left Side - Promo Image */}
									<div className="md:w-1/2 flex justify-center relative mb-8 md:mb-0">
										<div className="relative">
											{/* Decorative Background */}
											<div className="absolute -inset-4 bg-neutral-800 rounded-full opacity-20 blur-sm"></div>

											{/* Circle Background */}
											<div className="relative flex justify-center items-center">
												{/* Cocktail on the left */}
												<div className="absolute -left-10 bottom-[-50px] transform -rotate-6 z-10">
													<div className="relative h-64 w-40">
														<Image
															src="/images/cocktail.webp"
															alt="Cocktail"
															width={160}
															height={256}
															style={{ objectFit: 'contain' }}
														/>
													</div>
												</div>

												{/* Dark background for 50% OFF */}
												<div className="bg-neutral-800 w-48 h-48 rounded-full flex items-center justify-center z-0 relative mt-16">
													<div className="absolute inset-0 flex items-center justify-center">
														<div
															className="text-5xl text-white font-extrabold z-0"
															style={{
																fontFamily: "'Courier New', monospace",
																textShadow: '2px 2px 0 rgba(139, 0, 0, 0.5)',
															}}
														>
															<div className="relative">
																<div className="text-6xl">50%</div>
																<div className="text-5xl ml-8">OFF</div>
															</div>
														</div>
													</div>
												</div>

												{/* Corona on the right */}
												<div className="absolute -right-6 bottom-0 transform rotate-12 z-10">
													<div className="relative h-56 w-28">
														<Image
															src="/images/corona.webp"
															alt="Beer"
															width={112}
															height={224}
															style={{ objectFit: 'contain' }}
														/>
													</div>
												</div>
											</div>

											{/* Happy Hour Text - moved to be on top */}
											<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-64 z-20">
												<h3
													className="text-white text-3xl font-extrabold text-center"
													style={{
														fontFamily: 'cursive',
														textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
													}}
												>
													Happy Hour
												</h3>
												<div className="text-sm text-center text-gray-300 mt-1">
													Monday - Friday
												</div>
												<div className="text-xs text-center text-gray-400 mt-1">
													FROM 4:00 PM - 8 PM
												</div>
											</div>

											{/* Footer Text - repositioned and z-index increased */}
											<div className="relative mt-4 w-full text-center z-20">
												<div
													className="text-xs text-gray-400 font-medium uppercase tracking-wider"
													style={{ fontFamily: "'Courier New', monospace" }}
												>
													BRING YOUR FRIENDS, NOT YOUR PROBLEMS
												</div>
												<div className="flex justify-center mt-2">
													<div className="w-8 h-1 bg-red-900 rounded-full mx-1"></div>
													<div className="w-1 h-1 bg-red-900 rounded-full mx-1"></div>
													<div className="w-1 h-1 bg-red-900 rounded-full mx-1"></div>
												</div>
											</div>
										</div>
									</div>

									{/* Right Side - Text Content */}
									<div className="md:w-1/2 text-center md:text-left md:pl-8">
										<div
											className="inline-block mb-4 text-red-600 font-extrabold text-5xl"
											style={{
												textShadow: '1px 1px 0 rgba(255,255,255,0.1)',
											}}
										>
											50% Reducere
										</div>
										<h3 className="text-gray-200 text-4xl font-bold mb-6">
											Happy Hour
										</h3>
										<p className="text-gray-300 mb-6 leading-relaxed">
											From Monday to Friday between 16:00-20:00PM, enjoy all
											your favorite drinks at half price. Perfect time to unwind
											after work with friends!
										</p>
										<a
											href="/menu"
											className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-md font-bold 
											hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none 
											transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-700
											uppercase tracking-wide"
											style={{ fontFamily: "'Courier New', monospace" }}
										>
											Order now
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Section - Full width */}
					<div className="mt-16 w-full bg-neutral-900">
						<div className="max-w-6xl mx-auto px-4 pb-0">
							<h2
								className="text-3xl font-bold text-center mb-2 text-red-600 italic"
								style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
							>
								Do you have questions?
							</h2>
							<h3
								className="text-4xl font-bold text-center mb-8 text-white"
								style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
							>
								Contact us
							</h3>

							<p className="text-center text-gray-300 mb-8">
								Write or call us!
							</p>

							{/* Contact buttons - moved above the map */}
							<div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
								<a
									href="tel:+40721234567"
									className="inline-flex items-center bg-neutral-800 text-white px-6 py-3 rounded-md font-bold 
									hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:outline-none 
									transition-colors transform hover:-translate-y-0.5 shadow-md border border-neutral-700
									uppercase tracking-wide"
									style={{ fontFamily: "'Courier New', monospace" }}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
									</svg>
									Call Now
								</a>
								<a
									href="mailto:contact@taqueria.ro"
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
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
									Email Us
								</a>
							</div>

							{/* Weekly Schedule Table */}
							<div className="mx-auto max-w-3xl mb-0">
								<h3
									className="text-2xl font-bold text-center mb-6 text-amber-300"
									style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}
								>
									Our Opening Hours
								</h3>

								<div className="relative overflow-hidden rounded-lg shadow-xl">
									{/* Background with texture */}
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

									{/* Table Content */}
									<div className="relative p-6 z-10">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{/* Day Column */}
											<div className="space-y-4">
												{[
													{ day: 'Monday', hours: '11:00 - 22:00' },
													{ day: 'Tuesday', hours: '11:00 - 22:00' },
													{ day: 'Wednesday', hours: '11:00 - 23:00' },
													{ day: 'Thursday', hours: '11:00 - 23:00' },
													{ day: 'Friday', hours: '11:00 - 00:00' },
													{ day: 'Saturday', hours: '12:00 - 00:00' },
													{ day: 'Sunday', hours: '12:00 - 22:00' },
												].map((item, index) => (
													<div key={index} className="flex items-center">
														<div className="text-red-600 font-bold mr-2">•</div>
														<div className="flex-1 flex justify-between items-center">
															<span
																className="text-white font-bold"
																style={{
																	fontFamily: "'Courier New', monospace",
																}}
															>
																{item.day}
															</span>
															<div className="flex-grow mx-4 border-b border-dotted border-neutral-600 opacity-50"></div>
															<span
																className="text-amber-300"
																style={{
																	fontFamily: "'Courier New', monospace",
																}}
															>
																{item.hours}
															</span>
														</div>
													</div>
												))}
											</div>

											{/* Notes Column */}
											<div className="p-4 bg-neutral-900 rounded-lg border border-neutral-700 flex flex-col justify-between">
												<div>
													<h4
														className="text-red-600 font-bold mb-4 uppercase tracking-wide"
														style={{ fontFamily: "'Courier New', monospace" }}
													>
														Special Notes
													</h4>
													<ul className="space-y-3">
														<li className="text-gray-300 text-sm flex items-start">
															<span className="text-amber-300 mr-2">✓</span>
															<span>Happy Hour: Monday-Friday 16:00-20:00</span>
														</li>
														<li className="text-gray-300 text-sm flex items-start">
															<span className="text-amber-300 mr-2">✓</span>
															<span>
																Live Music: Friday & Saturday from 20:00
															</span>
														</li>
														<li className="text-gray-300 text-sm flex items-start">
															<span className="text-amber-300 mr-2">✓</span>
															<span>Taco Tuesday: 25% off all tacos!</span>
														</li>
														<li className="text-gray-300 text-sm flex items-start">
															<span className="text-amber-300 mr-2">✓</span>
															<span>Sunday Family Special: Kids eat free</span>
														</li>
													</ul>
												</div>
												<div
													className="text-xs text-amber-200 mt-4 p-2 border-t border-neutral-700 font-medium uppercase tracking-wider text-center"
													style={{ fontFamily: "'Courier New', monospace" }}
												>
													Kitchen closes 30 minutes before closing time
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Truly full-width map container (edge-to-edge) */}
			<div className="w-full h-[600px] relative">
				{/* Google Maps integration using map ID */}
				<iframe
					className="absolute inset-0 w-full h-full border-0"
					src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8331711076716!2d26.10100941554901!3d44.44147297910183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b7%3A0xb89d1b5b2fc13e80!2s123%20Strada%20Mihai%20Eminescu%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1603456384249!5m2!1sen!2sro!3m2!1sid!2s${encodeURIComponent(
						'b921238f4c767f7'
					)}!4v1603456384249`}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="Taqueria Location Map"
				></iframe>
			</div>
		</Layout>
	);
};

export default Home;
