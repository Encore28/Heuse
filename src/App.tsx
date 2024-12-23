import React, { useState } from 'react';
import { StockItem } from './types/Stock';
import StockTable from './components/StockTable';
import AddItemModal from './components/AddItemModal';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import { sampleData } from './data/sampleData';

function App() {
  const [items, setItems] = useState<StockItem[]>(sampleData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = (newItem: Omit<StockItem, 'id'>) => {
    const itemWithId: StockItem = {
      ...newItem,
      id: crypto.randomUUID()
    };
    setItems([...items, itemWithId]);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <StockTable 
          items={items} 
          onAddItem={() => setIsModalOpen(true)} 
        />
        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
        <AddItemModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddItem}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;