'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { formatRupiah } from '@/lib/utils'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)
  const isAvailable = product.stock > 0

  const handleAddToCart = () => {
    if (!isAvailable) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-100 flex flex-col">

      {/* Gambar */}
      <Link href={`/products/${product.slug}`} className="block relative h-48 bg-gray-50 overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-contain p-4 group-hover:scale-105 transition-transform duration-300 ${!isAvailable ? 'opacity-50 grayscale' : ''}`}
        />
        {/* Badge kategori */}
        <div className="absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {product.category}
        </div>
        {/* Badge status tersedia/tidak tersedia */}
        {isAvailable ? (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <CheckCircleIcon className="h-3 w-3" />
            Tersedia
          </div>
        ) : (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <XCircleIcon className="h-3 w-3" />
            Tidak Tersedia
          </div>
        )}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Sisa {product.stock}
          </div>
        )}
      </Link>

      {/* Info produk */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-3 w-3 text-amber-400" />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">(24)</span>
        </div>

        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-red-600 transition-colors mb-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            <p className={`text-base font-black ${isAvailable ? 'text-red-600' : 'text-gray-400'}`}>
              {formatRupiah(product.price)}
            </p>
            <p className="text-[10px] text-gray-400">Stok: {product.stock}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex-shrink-0 ${
              !isAvailable
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                ? 'bg-green-500 text-white scale-95'
                : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
            }`}
          >
            <ShoppingCartIcon className="h-3.5 w-3.5" />
            {!isAvailable ? 'Habis' : added ? '✓' : 'Keranjang'}
          </button>
        </div>
      </div>
    </div>
  )
}
