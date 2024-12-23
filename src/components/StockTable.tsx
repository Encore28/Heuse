import React from 'react';
import { StockItem } from '../types/Stock';
import { Plus } from 'lucide-react';

interface StockTableProps {
  items: StockItem[];
  onAddItem: () => void;
}

const StockTable: React.FC<StockTableProps> = ({ items, onAddItem }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Gestion de Stock</h1>
        <button
          onClick={onAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Ajouter un article
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Référence</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Nom</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Image</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Prix d'achat</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Prix de vente</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Fournisseur</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Client</th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Stock</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;