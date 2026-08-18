// src/app/products/[slug]/page.tsx — Halaman detail produk

'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ShoppingCartIcon, CheckBadgeIcon, TruckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatRupiah } from '@/lib/utils'
import { Product } from '@/types'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setProduct(data); setLoading(false) })
  }, [slug])

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return (
    <div className="text-center py-20">
      <p className="text-2xl">😕</p>
      <p className="font-semibold mt-2">Produk tidak ditemukan</p>
      <Link href="/products" className="text-red-600 underline text-sm mt-2 block">Kembali ke katalog</Link>
    </div>
  )

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 mb-6 transition-colors">
        <ArrowLeftIcon className="h-4 w-4" /> Kembali ke Katalog
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Gambar */}
          <div className="bg-gray-50 flex items-center justify-center p-12 min-h-80">
            <Image src={product.image} alt={product.name} width={320} height={320} className="object-contain max-h-72" />
          </div>

          {/* Detail */}
          <div className="p-8 lg:p-10 flex flex-col">
            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
              {product.category}
            </span>

            <h1 className="text-2xl font-black text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} className="h-4 w-4 text-amber-400" />)}</div>
              <span className="text-sm text-gray-500">5.0 (24 ulasan)</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="bg-red-50 rounded-2xl p-4 mb-6">
              <p className="text-3xl font-black text-red-600">{formatRupiah(product.price)}</p>
              <p className="text-sm text-gray-500 mt-1">Stok: <span className="font-semibold text-gray-700">{product.stock} pcs</span></p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-gray-700">Jumlah:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 font-bold text-lg">−</button>
                <span className="px-5 py-2.5 font-bold text-gray-900 min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 font-bold text-lg">+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${added ? 'bg-green-500 text-white' : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'}`}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {added ? '✓ Ditambahkan!' : 'Tambah ke Keranjang'}
              </button>
              <Link href="/checkout" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors text-center">
                Beli Langsung
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: CheckBadgeIcon, text: 'Produk 100% Original' },
                { icon: TruckIcon,      text: 'Gratis Ongkir > Rp500rb' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                  <Icon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
