// src/components/AddToCartButton.tsx — Tombol tambah ke keranjang (client)

'use client'
import { useState } from 'react'
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'

interface Props {
  product: Product
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function AddToCartButton({ product, className = '', size = 'md' }: Props) {
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2',
  }[size]

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 active:scale-95
        ${added ? 'bg-green-500 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}
        ${sizeClasses} ${className}`}
    >
      {added ? <CheckIcon className="h-4 w-4" /> : <ShoppingCartIcon className="h-4 w-4" />}
      {added ? 'Ditambahkan!' : 'Keranjang'}
    </button>
  )
}
