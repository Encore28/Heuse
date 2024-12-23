import React from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

interface TableFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAddCategory: () => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onAddCategory,
}) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <SearchBar value={search} onChange={onSearchChange} />
      </div>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onChange={onCategoryChange}
        onAddCategory={onAddCategory}
      />
    </div>
  );
};

export default TableFilters;