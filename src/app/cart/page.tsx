// src/app/cart/page.tsx — Halaman Keranjang Belanja

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { formatRupiah } from '@/lib/utils'

const ONGKIR = 25000

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()
  const subtotal = totalPrice()
  const ongkir   = subtotal >= 500000 ? 0 : ONGKIR
  const total    = subtotal + ongkir

  if (items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <ShoppingBagIcon className="h-20 w-20 text-gray-200 mb-4" />
      <h2 className="text-xl font-bold text-gray-700 mb-2">Keranjang Belanja Kosong</h2>
      <p className="text-sm text-gray-500 mb-6">Yuk, mulai tambahkan produk ke keranjang kamu!</p>
      <Link href="/products" className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors">
        Mulai Belanja
      </Link>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Keranjang Belanja ({items.length} produk)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Item list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src={product.image} alt={product.name} width={80} height={80} className="object-contain p-1" />
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="font-semibold text-gray-900 text-sm hover:text-red-600 line-clamp-2 leading-snug">
                  {product.name}
                </Link>
                <span className="text-xs text-gray-500">{product.category}</span>
                <p className="text-red-600 font-black mt-1">{formatRupiah(product.price)}</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Qty control */}
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold">−</button>
                    <span className="px-4 py-1.5 font-bold text-sm text-gray-900 min-w-[2.5rem] text-center">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold">+</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-gray-900 text-sm">{formatRupiah(product.price * quantity)}</span>
                    <button onClick={() => removeItem(product.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan pesanan */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-black text-gray-900 text-lg mb-5">Ringkasan Pesanan</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} item)</span>
                <span className="font-semibold text-gray-900">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span className={`font-semibold ${ongkir === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {ongkir === 0 ? 'GRATIS 🎉' : formatRupiah(ongkir)}
                </span>
              </div>
              {subtotal < 500000 && (
                <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  Tambah {formatRupiah(500000 - subtotal)} lagi untuk gratis ongkir!
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-5">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-xl text-red-600">{formatRupiah(total)}</span>
            </div>

            <Link href="/checkout" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-center transition-colors">
              Lanjut ke Checkout →
            </Link>

            <Link href="/products" className="block w-full text-center text-sm text-gray-500 hover:text-red-600 mt-3 py-2 transition-colors">
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
