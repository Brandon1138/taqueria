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

// Load the menu.json to check its structure
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

// SQL for creating the products table based on menu.json structure
const createTableSQL = `
CREATE TABLE IF NOT EXISTS products (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT,
	price NUMERIC(10, 2) NOT NULL,
	image TEXT,
	category TEXT,
	tags JSONB,
	nutritionalInfo JSONB,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access" 
	ON products FOR SELECT 
	USING (true);

-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert" 
	ON products FOR INSERT 
	WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" 
	ON products FOR UPDATE 
	USING (auth.role() = 'authenticated');
`;

// Function to save SQL to a file for easier execution
function saveCreateTableSQL() {
	const sqlFilePath = path.join(__dirname, 'create-products-table.sql');
	fs.writeFileSync(sqlFilePath, createTableSQL, 'utf8');
	console.log(`SQL saved to: ${sqlFilePath}`);
	console.log('You can copy this SQL and run it in the Supabase SQL Editor');
}

async function createProductsTable() {
	try {
		console.log('Attempting to create products table in Supabase...');

		// Supabase doesn't have a direct method to execute arbitrary SQL via the JS client
		// We'll use a different approach by querying an existing table to check if it exists
		const { error: tableCheckError } = await supabase
			.from('products')
			.select('count')
			.limit(1);

		if (tableCheckError && tableCheckError.message.includes('does not exist')) {
			console.log('The products table does not exist yet.');
			saveCreateTableSQL();
			console.log(
				'Please create the table using the Supabase dashboard with the SQL above or from the saved file.'
			);
			return false;
		}

		if (!tableCheckError) {
			console.log('Products table already exists!');

			// Ask if the user wants to drop and recreate the table
			console.log(
				'\nIf you want to recreate the table, execute this SQL in the Supabase dashboard:'
			);
			console.log('DROP TABLE IF EXISTS products CASCADE;');
			console.log(createTableSQL);
			return true;
		}

		console.error('Error checking table:', tableCheckError);
		return false;
	} catch (error) {
		console.error('Error:', error.message);
		return false;
	}
}

async function importProductData() {
	try {
		// Check if products table exists
		const { error: tableCheckError } = await supabase
			.from('products')
			.select('count')
			.limit(1);

		if (tableCheckError && tableCheckError.message.includes('does not exist')) {
			console.log('Cannot import data: products table does not exist');
			return;
		}

		// If we get here, the table exists
		console.log('Importing product data...');

		// Get the products array from the menu.json data
		const products = menuData.products;

		if (!Array.isArray(products)) {
			console.error('Expected an array of products in menu.json');
			return;
		}

		console.log(`Found ${products.length} products to import`);

		// Clear existing data
		const { error: deleteError } = await supabase
			.from('products')
			.delete()
			.not('id', 'is', null);

		if (deleteError) {
			console.error('Error clearing existing data:', deleteError.message);
		} else {
			console.log('Cleared existing products data');
		}

		// Insert products
		const { error: insertError } = await supabase
			.from('products')
			.insert(products);

		if (insertError) {
			console.error('Error inserting data:', insertError.message);
		} else {
			console.log(`Successfully imported ${products.length} products`);
		}
	} catch (error) {
		console.error('Error importing data:', error.message);
	}
}

async function main() {
	// Save SQL to file regardless
	saveCreateTableSQL();

	// Check if table exists
	const tableExists = await createProductsTable();

	// If table doesn't exist, provide instructions
	if (!tableExists) {
		console.log(
			'\nAfter creating the table in Supabase dashboard, run this script again with:'
		);
		console.log('node scripts/create-products-table.js --import');
		return;
	}

	// Check for import flag
	if (process.argv.includes('--import') || process.argv.includes('-i')) {
		await importProductData();
	} else {
		console.log('\nTo import product data, run this script with:');
		console.log('node scripts/create-products-table.js --import');
	}
}

main()
	.then(() => console.log('Operation complete'))
	.catch((error) => console.error('Unexpected error:', error));
