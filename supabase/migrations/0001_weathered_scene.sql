/*
  # Initial Schema Setup

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `stock_items`
      - `id` (uuid, primary key)
      - `reference` (text, unique)
      - `name` (text)
      - `buy_price` (numeric)
      - `sell_price` (numeric)
      - `supplier` (text)
      - `client` (text)
      - `quantity` (integer)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stock_items table
CREATE TABLE stock_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL,
  name text NOT NULL,
  buy_price numeric NOT NULL,
  sell_price numeric NOT NULL,
  supplier text NOT NULL,
  client text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON categories
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON categories
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON stock_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON stock_items
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON stock_items
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);