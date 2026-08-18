// src/app/not-found.tsx — Halaman 404

import Link from 'next/link'
import { HomeIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Visual */}
      <div className="relative mb-8">
        <div className="text-[120px] font-black text-gray-100 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center shadow-lg">
            <MagnifyingGlassIcon className="h-10 w-10 text-red-400" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-black text-gray-800 mb-3">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        Yuk kembali ke halaman utama!
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">
          <HomeIcon className="h-5 w-5" />
          Kembali ke Beranda
        </Link>
        <Link href="/products" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
          <ShoppingBagIcon className="h-5 w-5" />
          Lihat Produk
        </Link>
      </div>
    </div>
  )
}
