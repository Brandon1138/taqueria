# Menu.json to Supabase Migration Guide

## Step 1: Update Schema (Current Step)

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Paste and run the following SQL:

```sql
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
```

## Step 2: Import Data

After updating the schema, run the import script:

```
node scripts/create-products-table.js --import
```

## Step 3: Update Application to Use Supabase

Next steps after successful data import:

1. Update front-end components to fetch data from Supabase instead of local JSON:

   - Use the Supabase client to fetch products
   - Example: `const { data, error } = await supabase.from('products').select('*')`

2. Implement proper error handling for database operations

3. Add fallback mechanisms if database connection fails

## Step 4: Testing

1. Verify all product data has been correctly imported
2. Check that the application works with the new data source
3. Ensure proper security with row-level security policies

## Troubleshooting

If you encounter issues with the import:

1. Check Supabase console logs for errors
2. Verify environment variables are set correctly
3. Confirm the database schema matches the expected structure
4. Run `node scripts/fix-products-schema.js` again to check the schema
