/*
  # Update category policies

  1. Security Changes
    - Add policies for authenticated users to manage categories
    - Enable RLS on categories table
    
  2. Changes
    - Add policy for inserting categories
    - Add policy for reading categories
*/

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read categories
CREATE POLICY "Allow authenticated users to read categories"
ON categories FOR SELECT
TO authenticated
USING (true);

-- Allow all authenticated users to insert categories
CREATE POLICY "Allow authenticated users to insert categories"
ON categories FOR INSERT
TO authenticated
WITH CHECK (true);