require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.error('Missing Supabase environment variables');
	process.exit(1);
}

console.log('Supabase URL:', supabaseUrl);
console.log('Environment variables loaded successfully');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Load the menu.json data for comparison
const menuDataPath = path.join(__dirname, '../infrastructure/data/menu.json');
let menuData;

try {
	const rawData = fs.readFileSync(menuDataPath, 'utf8');
	menuData = JSON.parse(rawData);
	console.log('Menu data loaded successfully');
} catch (error) {
	console.error('Error loading menu data:', error.message);
	process.exit(1);
}

async function verifyProducts() {
	try {
		// Get all products from Supabase
		const { data: supabaseProducts, error } = await supabase
			.from('products')
			.select('*');

		if (error) {
			console.error('Error fetching products from Supabase:', error.message);
			return;
		}

		// Get products from menu.json
		const localProducts = menuData.products;

		console.log(`Found ${supabaseProducts?.length || 0} products in Supabase`);
		console.log(`Found ${localProducts?.length || 0} products in menu.json`);

		if (supabaseProducts?.length === 0) {
			console.log('No products found in Supabase. Run the import script:');
			console.log('node scripts/create-products-table.js --import');
			return;
		}

		// Compare counts
		if (supabaseProducts?.length !== localProducts?.length) {
			console.log(
				'Warning: Product count mismatch between Supabase and menu.json'
			);
		} else {
			console.log('Product count matches between Supabase and menu.json');
		}

		// Check if all products from menu.json exist in Supabase by ID
		const localIds = new Set(localProducts.map((p) => p.id));
		const supabaseIds = new Set(supabaseProducts.map((p) => p.id));

		const missingIds = [...localIds].filter((id) => !supabaseIds.has(id));
		if (missingIds.length > 0) {
			console.log(
				'Warning: The following IDs from menu.json are missing in Supabase:'
			);
			console.log(missingIds);
		} else {
			console.log('All products from menu.json exist in Supabase');
		}

		// Check if all required fields exist for each product
		let fieldsOk = true;
		const requiredFields = [
			'id',
			'name',
			'description',
			'price',
			'image',
			'category',
		];

		for (const product of supabaseProducts) {
			const missingFields = requiredFields.filter((field) => !product[field]);
			if (missingFields.length > 0) {
				console.log(
					`Product ${
						product.id
					} is missing required fields: ${missingFields.join(', ')}`
				);
				fieldsOk = false;
			}
		}

		if (fieldsOk) {
			console.log('All products have the required fields');
		}

		// Check for JSONB fields
		let jsonFieldsOk = true;
		for (const product of supabaseProducts) {
			if (!product.tags) {
				console.log(`Product ${product.id} is missing the tags JSONB field`);
				jsonFieldsOk = false;
			}
			if (!product.nutritionalInfo) {
				console.log(
					`Product ${product.id} is missing the nutritionalInfo JSONB field`
				);
				jsonFieldsOk = false;
			}
		}

		if (jsonFieldsOk) {
			console.log('All products have the required JSONB fields');
		}

		console.log('\nVerification complete!');

		if (fieldsOk && jsonFieldsOk && missingIds.length === 0) {
			console.log(
				'All checks passed - data appears to be migrated successfully'
			);
			console.log(
				'\nYou can now access the Supabase products at: /supabase-products'
			);
		} else {
			console.log('Some issues were found. You may need to reimport the data.');
		}
	} catch (error) {
		console.error('Verification error:', error.message);
	}
}

verifyProducts()
	.then(() => console.log('Operation complete'))
	.catch((error) => console.error('Unexpected error:', error));
