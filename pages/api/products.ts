import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../domain/models/Product';

type ResponseData =
	| {
			products: Product[];
	  }
	| {
			error: string;
	  };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		// In a real application, you would fetch this from a database
		const menuData = require('../../infrastructure/data/menu.json');

		// Get the category parameter from the query
		const { category } = req.query;

		// Filter products by category if provided
		let products = menuData.products;
		if (category && typeof category === 'string') {
			products = products.filter(
				(product: Product) => product.category === category
			);
		}

		return res.status(200).json({ products });
	} catch (error) {
		console.error('Products API error:', error);
		return res.status(500).json({ error: 'Failed to fetch products' });
	}
}
