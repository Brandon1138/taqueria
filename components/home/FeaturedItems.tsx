import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../domain/models/Product';
import { useCart } from '../../lib/cartContext';
import SmoothScroll from '../SmoothScroll';

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
			shadow-sm border border-opacity-20 border-black uppercase tracking-wider
			transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-md 
			hover:z-10 cursor-pointer hover:-translate-y-0.5`}
			style={{ fontFamily: "'Courier New', monospace" }}
			onMouseEnter={(e) => {
				// Random slight rotation on hover for a dynamic effect
				const rotation = Math.random() * 8 - 4; // Between -4 and 4 degrees
				e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.1) translateY(-2px)`;
				e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
			}}
			onMouseLeave={(e) => {
				// Reset to original rotation from the stampStyles
				const originalRotation = stampStyles.includes('rotate-3')
					? '3deg'
					: stampStyles.includes('-rotate-2')
					? '-2deg'
					: stampStyles.includes('rotate-1')
					? '1deg'
					: '-1deg';
				e.currentTarget.style.transform = `rotate(${originalRotation})`;
				e.currentTarget.style.boxShadow = '';
			}}
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
		transition-all duration-200 transform hover:-translate-y-1 shadow-md border border-red-800
		uppercase tracking-wide hover:shadow-lg"
		style={{ fontFamily: "'Courier New', monospace" }}
		onMouseEnter={(e) => {
			e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
			e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
		}}
		onMouseLeave={(e) => {
			e.currentTarget.style.transform = '';
			e.currentTarget.style.boxShadow = '';
		}}
		onMouseDown={(e) => {
			// Add a "pressed" effect
			e.currentTarget.style.transform = 'translateY(-2px) scale(0.98)';
			e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
		}}
		onMouseUp={(e) => {
			e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
			e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
		}}
	>
		{children}
	</button>
);

interface FeaturedItemsProps {
	featuredProducts: Product[];
}

// Component for displaying nutritional information in a small table
const NutritionalInfo: React.FC<{ weight: string; calories: string }> = ({
	weight,
	calories,
}) => (
	<div className="mt-2">
		<table className="w-full text-sm">
			<tbody>
				<tr>
					<td className="text-gray-400 pr-2">Weight:</td>
					<td className="text-gray-300 font-medium text-right">{weight}</td>
				</tr>
				<tr>
					<td className="text-gray-400 pr-2">Calories:</td>
					<td className="text-gray-300 font-medium text-right">{calories}</td>
				</tr>
			</tbody>
		</table>
	</div>
);

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ featuredProducts }) => {
	const { addToCart } = useCart();

	const handleAddToCart = (product: Product) => {
		addToCart(product);
		// Toast notification is handled in the CartContext
	};

	// Determine consistent staggered animation delays based on grid position
	const getStaggerDelay = (index: number) => {
		// For a 3-column grid layout
		const col = index % 3;
		const row = Math.floor(index / 3);

		// Base delay of 100ms with 200ms increments
		return 100 + col * 200 + row * 100;
	};

	return (
		<div id="featured" className="py-16">
			<div className="text-center mb-12 relative">
				<SmoothScroll animation="fade" duration={800}>
					<h2
						className="text-4xl font-extrabold text-center text-white uppercase tracking-wider relative z-10 inline-block px-8 py-2"
						style={{
							fontFamily: "'Courier New', monospace",
							textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
							background:
								'linear-gradient(to right, rgba(153, 27, 27, 0.8), rgba(120, 20, 20, 0.8))',
							borderRadius: '0.5rem',
							boxShadow:
								'0 4px 10px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)',
							transform: 'rotate(-1deg)',
						}}
					>
						Featured Items
					</h2>
					<div
						className="absolute h-1 w-32 bg-amber-300 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
						style={{
							boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
							transform: 'translateY(6px) rotate(1deg)',
						}}
					></div>
				</SmoothScroll>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{featuredProducts.map((product, index) => (
					<SmoothScroll
						key={product.id}
						animation="slide-up"
						delay={getStaggerDelay(index)}
						duration={800}
					>
						<div
							className="relative overflow-hidden h-full transition-all duration-300"
							onMouseEnter={(e) => {
								// Add shadow and translateY without scaling up
								e.currentTarget.style.transform = 'translateY(-5px)';
								e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';

								// Apply subtle rotation for a "picked up" effect
								const rotation = Math.random() * 1 - 0.5; // Small random rotation between -0.5 and 0.5 degrees
								e.currentTarget.style.transform += ` rotate(${rotation}deg)`;
							}}
							onMouseLeave={(e) => {
								// Return to original state
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '';
							}}
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
										<div className="flex flex-wrap mb-3 -mt-10">
											{product.tags?.map((tag, index) => (
												<TagStamp key={index} label={tag} />
											))}
										</div>
										<h3
											className={`text-xl font-bold text-white mb-2 ${
												!product.tags || product.tags.length === 0 ? 'mt-8' : ''
											}`}
											style={{
												fontFamily: "'Courier New', monospace",
												textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
											}}
										>
											{product.name}
										</h3>
										<p className="text-neutral-300 mb-4 text-sm leading-relaxed">
											{product.description}
										</p>
										{/* If there's nutritional info available */}
										{product.nutritionalInfo && (
											<NutritionalInfo
												weight={product.nutritionalInfo.weight}
												calories={product.nutritionalInfo.calories}
											/>
										)}
									</div>
									<div className="mt-6 flex items-center justify-between">
										<div
											className="text-amber-400 font-bold text-lg"
											style={{ fontFamily: "'Courier New', monospace" }}
										>
											{product.price.toFixed(2)} RON
										</div>
										<StampButton onClick={() => handleAddToCart(product)}>
											Add to Cart
										</StampButton>
									</div>
								</div>
							</div>
						</div>
					</SmoothScroll>
				))}
			</div>
		</div>
	);
};

export default FeaturedItems;
