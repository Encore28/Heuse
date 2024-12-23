export interface StockItem {
  id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  supplier: string;
  client: string;
  quantity: number;
  imageUrl: string;
  reference: string;
  category: string;
}

export type Category = {
  id: string;
  name: string;
};