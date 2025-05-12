import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SmoothScroll from '../SmoothScroll';

interface DishInfo {
	id: string;
	name: string;
	description: string;
	shortDescription: string;
	imageSrc: string;
	price: number;
	nutritionalInfo?: {
		weight: string;
		calories: string;
	};
	featured?: boolean;
}

const dishes: DishInfo[] = [
	{
		id: 'wraps',
		name: 'Fresh Wraps',
		shortDescription: 'Light and delicious',
		description:
			'Our signature wraps are made fresh daily with locally-sourced ingredients. Perfect blend of vegetables and premium meats in a soft tortilla.',
		imageSrc: '/images/wrap.webp',
		price: 32.99,
		nutritionalInfo: {
			weight: '12oz',
			calories: '420kcal',
		},
		featured: true,
	},
	{
		id: 'nachos',
		name: 'Loaded Nachos',
		shortDescription: 'Perfect for sharing',
		description:
			'Crispy corn tortilla chips smothered in melted cheese, jalapeños, guacamole, sour cream, and your choice of protein. A crowd favorite!',
		imageSrc: '/images/nachos.webp',
		price: 45.99,
		nutritionalInfo: {
			weight: '16oz',
			calories: '780kcal',
		},
		featured: true,
	},
	{
		id: 'burger',
		name: 'Signature Burger',
		shortDescription: 'Our customer favorite',
		description:
			'Premium beef patty with Mexican-inspired toppings including guacamole, pico de gallo, and chipotle mayo. Served with seasoned fries.',
		imageSrc: '/images/burger.webp',
		price: 54.99,
		nutritionalInfo: {
			weight: '14oz',
			calories: '820kcal',
		},
		featured: true,
	},
];

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

const DishCard: React.FC<{ dish: DishInfo; delay: number }> = ({
	dish,
	delay,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<SmoothScroll animation="slide-up" delay={delay}>
			<div
				className="relative overflow-hidden rounded-lg transform transition-all hover:scale-[1.02] shadow-xl h-full"
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
			>
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
				{dish.featured && (
					<div className="absolute right-0 top-1/4 opacity-10 transform rotate-12 text-5xl font-extrabold text-amber-400 pointer-events-none z-0">
						FEATURED
					</div>
				)}

				<div className="relative flex flex-col h-full z-10">
					<div className="relative aspect-square overflow-hidden">
						<Image
							src={dish.imageSrc}
							alt={dish.name}
							fill
							sizes="(max-width: 768px) 100vw, 33vw"
							style={{ objectFit: 'cover' }}
							className="rounded-t-lg transition-transform duration-500 ease-in-out transform"
							quality={75}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

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

					<div className="p-6">
						<h3
							className="text-white text-xl font-bold mb-1"
							style={{
								fontFamily: "'Courier New', monospace",
								textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
							}}
						>
							{dish.name}
						</h3>
						<p className="text-gray-300 text-sm mb-3">
							{dish.shortDescription}
						</p>

						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${
								isExpanded ? 'max-h-48' : 'max-h-0'
							}`}
						>
							<p className="text-gray-400 text-sm mb-3">{dish.description}</p>
							{dish.nutritionalInfo && (
								<NutritionalInfo
									weight={dish.nutritionalInfo.weight}
									calories={dish.nutritionalInfo.calories}
								/>
							)}
							<div className="mt-3 flex items-center justify-between">
								<div
									className="text-amber-400 font-bold"
									style={{ fontFamily: "'Courier New', monospace" }}
								>
									{dish.price.toFixed(2)} RON
								</div>
							</div>
						</div>

						<div
							className={`mt-2 w-full text-center transition-opacity duration-300 ${
								isExpanded ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<p className="text-gray-400 text-xs italic">Hover for details</p>
						</div>
					</div>
				</div>
			</div>
		</SmoothScroll>
	);
};

const DishesSection: React.FC = () => {
	return (
		<div id="dishes" className="py-16">
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
						See our Dishes
					</h2>
					<div
						className="absolute h-1 w-32 bg-amber-300 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
						style={{
							boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
							transform: 'translateY(6px) rotate(1deg)',
						}}
					></div>
				</SmoothScroll>

				<SmoothScroll animation="fade" duration={1000} delay={200}>
					<p className="text-gray-300 mt-8 max-w-xl mx-auto">
						Explore our signature dishes made with authentic Mexican recipes and
						the freshest ingredients. Each dish is crafted with care to bring
						you the true taste of Mexico.
					</p>
				</SmoothScroll>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				{dishes.map((dish, index) => (
					<DishCard key={dish.id} dish={dish} delay={(index + 1) * 100} />
				))}
			</div>

			<SmoothScroll animation="fade" duration={1000} delay={500}>
				<div className="text-center mt-8">
					<Link
						href="/menu"
						className="inline-flex items-center bg-red-800 text-white px-8 py-3 rounded-md font-bold 
						hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none 
						transition-all duration-200 transform hover:-translate-y-1 shadow-md border border-red-700
						uppercase tracking-wide"
						style={{ fontFamily: "'Courier New', monospace" }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
						View Full Menu
					</Link>
				</div>
			</SmoothScroll>
		</div>
	);
};

export default DishesSection;
