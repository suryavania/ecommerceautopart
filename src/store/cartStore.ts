// src/store/cartStore.ts
// Global state keranjang belanja menggunakan Zustand (no server needed)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  // Tambah produk ke cart (atau tambah qty jika sudah ada)
  addItem: (product: Product) => void
  // Hapus satu item dari cart
  removeItem: (productId: number) => void
  // Update qty item tertentu
  updateQuantity: (productId: number, quantity: number) => void
  // Kosongkan cart
  clearCart: () => void
  // Total item (untuk badge di navbar)
  totalItems: () => number
  // Total harga
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: 'autopart-cart', // Key di localStorage
    }
  )
)
