export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      stock_items: {
        Row: {
          id: string
          reference: string
          name: string
          buy_price: number
          sell_price: number
          supplier: string
          client: string
          quantity: number
          image_url: string
          category_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference: string
          name: string
          buy_price: number
          sell_price: number
          supplier: string
          client: string
          quantity?: number
          image_url: string
          category_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference?: string
          name?: string
          buy_price?: number
          sell_price?: number
          supplier?: string
          client?: string
          quantity?: number
          image_url?: string
          category_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}