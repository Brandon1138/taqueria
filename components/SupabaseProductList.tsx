'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	tags?: string[];
	nutritionalInfo?: {
		weight: string;
		calories: string;
	};
}

export default function SupabaseProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchProducts() {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from('products')
					.select('*')
					.order('name');

				if (error) {
					throw new Error(error.message);
				}

				setProducts(data || []);
			} catch (err) {
				console.error('Error fetching products:', err);
				setError(
					err instanceof Error ? err.message : 'Failed to load products'
				);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	if (loading) return <div className="p-4">Loading products...</div>;
	if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Our Menu (from Supabase)</h2>

			{products.length === 0 ? (
				<p>No products found</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<div
							key={product.id}
							className="border rounded-lg overflow-hidden shadow-md"
						>
							{product.image && (
								<div className="h-48 overflow-hidden">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								</div>
							)}
							<div className="p-4">
								<h3 className="text-xl font-bold">{product.name}</h3>
								<p className="text-gray-700 mt-1">{product.description}</p>
								<div className="mt-2 flex justify-between items-center">
									<span className="text-lg font-bold">
										${product.price.toFixed(2)}
									</span>
									<span className="text-sm text-gray-500">
										{product.category}
									</span>
								</div>
								{product.tags && product.tags.length > 0 && (
									<div className="mt-2 flex flex-wrap gap-1">
										{product.tags.map((tag, index) => (
											<span
												key={index}
												className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
											>
												{tag}
											</span>
										))}
									</div>
								)}
								{product.nutritionalInfo && (
									<div className="mt-2 text-xs text-gray-500">
										{product.nutritionalInfo.weight} |{' '}
										{product.nutritionalInfo.calories}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
