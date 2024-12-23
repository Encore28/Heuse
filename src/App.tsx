import React, { useState, useMemo } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { StockItem } from './types/Stock';
import { useAuth } from './hooks/useAuth';
import StockTable from './components/StockTable';
import AddItemModal from './components/AddItemModal';
import CategoryModal from './components/CategoryModal';
import AuthModal from './components/AuthModal';
import ThemeToggle from './components/ThemeToggle';
import TableFilters from './components/TableFilters';
import { ThemeProvider } from './context/ThemeContext';
import { sampleData } from './data/sampleData';

function App() {
  const { user, signOut } = useAuth();
  const [items, setItems] = useState<StockItem[]>(sampleData);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddItem = (newItem: Omit<StockItem, 'id'>) => {
    const itemWithId: StockItem = {
      ...newItem,
      id: crypto.randomUUID()
    };
    setItems([...items, itemWithId]);
  };

  const updateItemQuantity = (id: string, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = search === '' || 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.reference.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, selectedCategory]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion de Stock</h1>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => setIsItemModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Ajouter un article
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Se déconnecter"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
          
          <TableFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAddCategory={() => {
              if (user) {
                setIsCategoryModalOpen(true);
              } else {
                setIsAuthModalOpen(true);
              }
            }}
          />

          <StockTable 
            items={filteredItems} 
            onAddItem={() => setIsItemModalOpen(true)}
            onUpdateQuantity={updateItemQuantity}
          />
        </div>

        <div className="fixed bottom-4 right-4">
          <ThemeToggle />
        </div>

        <AddItemModal 
          isOpen={isItemModalOpen}
          onClose={() => setIsItemModalOpen(false)}
          onAdd={handleAddItem}
        />

        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onCategoryAdded={() => {
            setIsCategoryModalOpen(false);
          }}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;