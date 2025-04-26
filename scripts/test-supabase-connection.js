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

async function testConnection() {
	try {
		// Simple query to test the connection
		const { data, error } = await supabase
			.from('products')
			.select('*')
			.limit(1);

		if (error) throw error;

		console.log('Successfully connected to Supabase!');
		console.log('Data:', data);
		return data;
	} catch (error) {
		console.error('Error connecting to Supabase:', error.message);
		return null;
	}
}

testConnection()
	.then(() => console.log('Test complete'))
	.catch((error) => console.error('Unexpected error:', error));
