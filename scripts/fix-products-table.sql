
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS products (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT,
	price NUMERIC(10, 2) NOT NULL,
	image TEXT,
	category TEXT,
	tags JSONB,
	nutritional_info JSONB,
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
