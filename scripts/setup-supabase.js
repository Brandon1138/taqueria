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

// Path to sample product data - updated to correct location
const sampleDataPath = path.join(__dirname, '../infrastructure/data/menu.json');

async function verifyConnection() {
	try {
		// Simple query to test the connection
		const { data, error } = await supabase.from('_utils').select('*');

		if (error) {
			if (error.message.includes('does not exist')) {
				console.log(
					'Connected to Supabase successfully, but no tables found yet.'
				);
				return true;
			}
			throw error;
		}

		console.log('Successfully connected to Supabase!');
		return true;
	} catch (error) {
		if (error.message.includes('does not exist')) {
			console.log(
				'Connected to Supabase successfully, but no tables found yet.'
			);
			return true;
		}
		console.error('Error connecting to Supabase:', error.message);
		return false;
	}
}

async function importProductData() {
	try {
		if (!fs.existsSync(sampleDataPath)) {
			console.error('Sample data file not found:', sampleDataPath);
			return false;
		}

		// Load sample data
		const jsonData = fs.readFileSync(sampleDataPath, 'utf8');
		const products = JSON.parse(jsonData);

		if (!Array.isArray(products)) {
			console.error('Expected an array of products');
			return false;
		}

		console.log(`Loaded ${products.length} products from sample data`);

		// Check if products table exists by querying it
		const { error: tableCheckError } = await supabase
			.from('products')
			.select('count')
			.limit(1);

		// If the table doesn't exist, inform user to create it manually
		if (tableCheckError && tableCheckError.message.includes('does not exist')) {
			console.log(
				'\nThe products table does not exist yet. You need to create it manually in the Supabase dashboard.'
			);
			console.log('\nHere is the SQL to create the products table:');
			console.log(`
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies if needed
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read access" ON products FOR SELECT USING (true);
      `);
			return false;
		}

		// If we get here, the table exists, and we can insert data
		console.log('Inserting products into the database...');

		// First, clear existing data (optional)
		const { error: deleteError } = await supabase
			.from('products')
			.delete()
			.neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

		if (deleteError) {
			console.error('Error clearing existing data:', deleteError.message);
		} else {
			console.log('Cleared existing products data');
		}

		// Insert products in batches to avoid hitting API limits
		const batchSize = 20;
		let insertedCount = 0;

		for (let i = 0; i < products.length; i += batchSize) {
			const batch = products.slice(i, i + batchSize);
			const { error: insertError } = await supabase
				.from('products')
				.insert(batch);

			if (insertError) {
				console.error(
					`Error inserting batch ${i / batchSize + 1}:`,
					insertError.message
				);
			} else {
				insertedCount += batch.length;
				console.log(
					`Inserted batch ${i / batchSize + 1} (${insertedCount}/${
						products.length
					} products)`
				);
			}
		}

		console.log(`Successfully imported ${insertedCount} products`);
		return insertedCount > 0;
	} catch (error) {
		console.error('Error importing product data:', error.message);
		return false;
	}
}

async function main() {
	const connected = await verifyConnection();
	if (!connected) {
		console.error(
			'Could not connect to Supabase. Check your environment variables and network connection.'
		);
		process.exit(1);
	}

	// Try to import data (which will provide instructions if table doesn't exist)
	await importProductData();
}

main()
	.then(() => console.log('Setup complete'))
	.catch((error) => console.error('Unexpected error:', error));
