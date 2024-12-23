import React from 'react';
import { Plus } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
  onAddCategory: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onChange,
  onAddCategory 
}) => {
  const { categories, loading } = useCategories();

  return (
    <div className="flex gap-2">
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      <button
        onClick={onAddCategory}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
        title="Ajouter une catégorie"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default CategoryFilter;