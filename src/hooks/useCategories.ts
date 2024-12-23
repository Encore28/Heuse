import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (supabaseError) throw supabaseError;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();

    // Subscribe to changes
    const channel = supabase
      .channel('categories_changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'categories' }, 
          () => {
            fetchCategories();
          })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
}