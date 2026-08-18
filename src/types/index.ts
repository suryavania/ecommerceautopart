// src/types/index.ts — Global TypeScript types

export interface Product {
  id: number
  name: string
  slug: string
  category: string
  description: string
  price: number
  image: string
  stock: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingDetails {
  recipientName: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}
