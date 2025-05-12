import React from 'react';
import Image from 'next/image';
import { Product } from '../domain/models/Product';
import { useCart } from '../lib/cartContext';

interface ProductCardProps {
	product: Product;
}

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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { addToCart } = useCart();

	return (
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
				<div className="absolute right-4 top-4 opacity-10 transform -rotate-15 text-5xl font-extrabold text-neutral-400 pointer-events-none z-0">
					CHEF'S
				</div>
			)}

			<div className="relative flex flex-col h-full z-10">
				<div className="relative h-44 overflow-hidden rounded-t-lg">
					<div className="absolute inset-0 bg-black bg-opacity-30"></div>
					<Image
						src={product.image}
						alt={product.name}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
						style={{ objectFit: 'cover' }}
						quality={75}
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
				<div className="p-5 flex flex-col justify-between flex-grow relative">
					<div>
						<div className="flex flex-wrap mb-3 -mt-9">
							{product.tags?.map((tag, index) => (
								<TagStamp key={index} label={tag} />
							))}
						</div>
						<h3
							className={`font-extrabold text-lg text-white uppercase tracking-wide ${
								!product.tags || product.tags.length === 0 ? 'mt-8' : 'mt-2'
							}`}
							style={{
								fontFamily: "'Courier New', monospace",
								textShadow: '1px 1px 0px rgba(0,0,0,0.8)',
								transform: 'rotate(-0.5deg)',
								display: 'inline-block',
								borderBottom: '2px solid rgba(251, 191, 36, 0.6)',
								paddingBottom: '4px',
							}}
						>
							{product.name}
						</h3>
						<p
							className="text-gray-300 mt-2 font-medium text-sm"
							style={{ fontFamily: 'sans-serif' }}
						>
							{product.description}
						</p>

						{product.nutritionalInfo && (
							<NutritionalInfo
								weight={product.nutritionalInfo.weight}
								calories={product.nutritionalInfo.calories}
							/>
						)}
					</div>
					<div className="mt-3 flex items-center justify-between">
						<span
							className="block text-lg font-bold text-amber-300"
							style={{ fontFamily: "'Courier New', monospace" }}
						>
							{product.price.toFixed(2)} RON
						</span>
						<button
							onClick={() => addToCart(product)}
							className="bg-red-900 text-white px-4 py-1.5 rounded-md font-bold 
							hover:bg-red-800 focus:ring-2 focus:ring-red-700 focus:outline-none 
							transition-all duration-200 transform hover:-translate-y-1 shadow-md border border-red-800
							uppercase tracking-wide text-sm hover:shadow-lg"
							style={{ fontFamily: "'Courier New', monospace" }}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform =
									'translateY(-4px) scale(1.05)';
								e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = '';
								e.currentTarget.style.boxShadow = '';
							}}
							onMouseDown={(e) => {
								// Add a "pressed" effect
								e.currentTarget.style.transform =
									'translateY(-2px) scale(0.98)';
								e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
							}}
							onMouseUp={(e) => {
								e.currentTarget.style.transform =
									'translateY(-4px) scale(1.05)';
								e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
							}}
						>
							Add to Cart
						</button>
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
	);
};

export default ProductCard;
