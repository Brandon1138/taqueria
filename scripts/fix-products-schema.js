require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

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

// SQL to update the products table
const updateTableSQL = `
-- First, check if the columns already exist
DO $$
BEGIN
  -- Add tags column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'tags'
  ) THEN
    ALTER TABLE products ADD COLUMN tags JSONB;
    RAISE NOTICE 'Added tags column to products table';
  ELSE
    RAISE NOTICE 'tags column already exists';
  END IF;

  -- Add nutritionalInfo column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'nutritionalInfo'
  ) THEN
    ALTER TABLE products ADD COLUMN "nutritionalInfo" JSONB;
    RAISE NOTICE 'Added nutritionalInfo column to products table';
  ELSE
    RAISE NOTICE 'nutritionalInfo column already exists';
  END IF;
END $$;
`;

async function checkProductsTable() {
	try {
		console.log('Checking products table schema...');

		// Get current schema by querying a product (we can't directly get schema info through JS client)
		const { data, error } = await supabase
			.from('products')
			.select('*')
			.limit(1);

		if (error) {
			console.error('Error checking table:', error.message);
			return false;
		}

		console.log('Current table schema:');
		if (data && data.length > 0) {
			console.log(Object.keys(data[0]));

			// Check if our required columns exist
			const hasNutritionalInfo = data[0].hasOwnProperty('nutritionalInfo');
			const hasTags = data[0].hasOwnProperty('tags');

			console.log(`Has nutritionalInfo column: ${hasNutritionalInfo}`);
			console.log(`Has tags column: ${hasTags}`);

			return { hasNutritionalInfo, hasTags };
		} else {
			console.log('No data found in products table');
			return { hasNutritionalInfo: false, hasTags: false };
		}
	} catch (error) {
		console.error('Error:', error.message);
		return { hasNutritionalInfo: false, hasTags: false };
	}
}

async function main() {
	// Check current schema
	const schemaInfo = await checkProductsTable();

	if (!schemaInfo.hasNutritionalInfo || !schemaInfo.hasTags) {
		console.log(
			'\nSchema update needed. Please execute this SQL in the Supabase dashboard:'
		);
		console.log(updateTableSQL);
		console.log('\nAfter updating the schema, run the import script again:');
		console.log('node scripts/create-products-table.js --import');
	} else {
		console.log('\nSchema is correct! You can run the import script:');
		console.log('node scripts/create-products-table.js --import');
	}
}

main()
	.then(() => console.log('Schema check complete'))
	.catch((error) => console.error('Unexpected error:', error));
