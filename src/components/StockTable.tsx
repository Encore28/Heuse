import React from 'react';
import { StockItem } from '../types/Stock';
import { Plus, Minus } from 'lucide-react';
import { categories } from '../data/categories';

interface StockTableProps {
  items: StockItem[];
  onAddItem: () => void;
  onUpdateQuantity: (id: string, change: number) => void;
}

const StockTable: React.FC<StockTableProps> = ({ items, onAddItem, onUpdateQuantity }) => {
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Référence</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Nom</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Catégorie</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Image</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Prix d'achat</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Prix de vente</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Fournisseur</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Client</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Stock</th>
            <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr 
              key={item.id} 
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{item.reference}</td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{item.name}</td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{getCategoryName(item.category)}</td>
              <td className="px-4 py-3">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                {item.buyPrice.toFixed(2)} €
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                {item.sellPrice.toFixed(2)} €
              </td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{item.supplier}</td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{item.client}</td>
              <td className="px-4 py-3 text-gray-800 dark:text-gray-300">{item.quantity}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded dark:hover:bg-red-900"
                    disabled={item.quantity === 0}
                    title="Retirer un article"
                  >
                    <Minus size={20} />
                  </button>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 text-green-600 hover:bg-green-100 rounded dark:hover:bg-green-900"
                    title="Ajouter un article"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;