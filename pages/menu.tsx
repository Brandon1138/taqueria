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
		<Layout>
			<Head>
				<title>Menu - Taqueria Mexican Street Food</title>
			</Head>
			<div
				className="bg-neutral-900 py-16 w-full"
				style={{
					backgroundImage:
						"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
				}}
			>
				<div className="max-w-6xl mx-auto px-4">
					<div className="mb-8 text-center">
						<h1
							className="text-4xl font-extrabold mb-2 text-white"
							style={{
								textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
								fontFamily: 'sans-serif',
							}}
						>
							Our Menu
						</h1>
						<p
							className="text-gray-300 font-medium"
							style={{ fontFamily: 'sans-serif' }}
						>
							Explore our delicious offerings
						</p>
					</div>

					<div className="mb-10 flex justify-center">
						<div className="flex flex-wrap gap-2 border-2 border-dashed border-neutral-700 p-4 rounded-lg bg-neutral-800 shadow-inner">
							<button
								onClick={() => setSelectedCategory(null)}
								className={`px-4 py-2 rounded-md transform transition-all uppercase tracking-wide font-bold text-sm ${
									selectedCategory === null
										? 'bg-red-900 text-white focus:ring-2 focus:ring-red-700 focus:outline-none shadow-md -rotate-1'
										: 'bg-neutral-700 hover:bg-neutral-600 text-white focus:ring-2 focus:ring-neutral-600 focus:outline-none rotate-1'
								}`}
								style={{ fontFamily: "'Courier New', monospace" }}
							>
								All
							</button>
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-4 py-2 rounded-md transform transition-all uppercase tracking-wide font-bold text-sm ${
										selectedCategory === category
											? 'bg-red-900 text-white focus:ring-2 focus:ring-red-700 focus:outline-none shadow-md -rotate-1'
											: 'bg-neutral-700 hover:bg-neutral-600 text-white focus:ring-2 focus:ring-neutral-600 focus:outline-none rotate-1'
									}`}
									style={{ fontFamily: "'Courier New', monospace" }}
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
