import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { Product } from '../domain/models/Product';

interface MenuProps {
	products: Product[];
	categories: string[];
}

export const getStaticProps: GetStaticProps = async () => {
	// In a real application, you would fetch this from an API or database
	const menuData = require('../infrastructure/data/menu.json');

	// Extract unique categories
	const categories = Array.from(
		new Set(menuData.products.map((product: Product) => product.category))
	);

	return {
		props: {
			products: menuData.products,
			categories,
		},
	};
};

const Menu: React.FC<MenuProps> = ({ products, categories }) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const filteredProducts = selectedCategory
		? products.filter((product) => product.category === selectedCategory)
		: products;

	return (
		<Layout fullWidth={true}>
			<Head>
				<title>Menu - Taqueria Mexican Street Food</title>
			</Head>
			<div
				id="menu"
				className="bg-neutral-900 py-16 w-full"
				style={{
					backgroundImage:
						"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
				}}
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6">
					<div className="text-center mb-12 relative">
						<h1
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
							Our Menu
						</h1>
						<div
							className="absolute h-1 w-32 bg-amber-300 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
							style={{
								boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
								transform: 'translateY(6px) rotate(1deg)',
							}}
						></div>
					</div>

					<div className="mb-10 flex justify-center">
						<div className="flex flex-wrap gap-2 border-2 border-dashed border-neutral-700 p-4 rounded-lg bg-neutral-800 shadow-inner">
							<button
								onClick={() => setSelectedCategory(null)}
								className={`px-4 py-2 rounded-md transform transition-all duration-200 uppercase tracking-wide font-bold text-sm 
								hover:scale-110 hover:shadow-lg hover:-translate-y-1 ${
									selectedCategory === null
										? 'bg-red-900 text-white focus:ring-2 focus:ring-red-700 focus:outline-none shadow-md -rotate-1'
										: 'bg-neutral-700 hover:bg-neutral-600 text-white focus:ring-2 focus:ring-neutral-600 focus:outline-none rotate-1'
								}`}
								style={{ fontFamily: "'Courier New', monospace" }}
								onMouseEnter={(e) => {
									const rotation = selectedCategory === null ? -2 : 2; // Enhance existing rotation
									e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.1) translateY(-4px)`;
									e.currentTarget.style.boxShadow =
										'0 6px 12px rgba(0,0,0,0.4)';
								}}
								onMouseLeave={(e) => {
									const originalRotation =
										selectedCategory === null ? '-1deg' : '1deg';
									e.currentTarget.style.transform = `rotate(${originalRotation})`;
									e.currentTarget.style.boxShadow =
										selectedCategory === null ? '' : '';
								}}
							>
								All
							</button>
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-4 py-2 rounded-md transform transition-all duration-200 uppercase tracking-wide font-bold text-sm
									hover:scale-110 hover:shadow-lg hover:-translate-y-1 ${
										selectedCategory === category
											? 'bg-red-900 text-white focus:ring-2 focus:ring-red-700 focus:outline-none shadow-md -rotate-1'
											: 'bg-neutral-700 hover:bg-neutral-600 text-white focus:ring-2 focus:ring-neutral-600 focus:outline-none rotate-1'
									}`}
									style={{ fontFamily: "'Courier New', monospace" }}
									onMouseEnter={(e) => {
										const rotation = selectedCategory === category ? -2 : 2; // Enhance existing rotation
										e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.1) translateY(-4px)`;
										e.currentTarget.style.boxShadow =
											'0 6px 12px rgba(0,0,0,0.4)';
									}}
									onMouseLeave={(e) => {
										const originalRotation =
											selectedCategory === category ? '-1deg' : '1deg';
										e.currentTarget.style.transform = `rotate(${originalRotation})`;
										e.currentTarget.style.boxShadow =
											selectedCategory === category ? '' : '';
									}}
								>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</button>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Menu;
