// src/app/admin/products/page.tsx — Daftar produk admin

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatRupiah } from '@/lib/utils'
import { PencilSquareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/')

  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="text-gray-500 hover:text-red-600">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manajemen Produk</h1>
          <p className="text-sm text-gray-500">{products.length} produk terdaftar</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold w-16">Foto</th>
                <th className="text-left px-5 py-3 font-semibold">Nama Produk</th>
                <th className="text-left px-5 py-3 font-semibold">Kategori</th>
                <th className="text-left px-5 py-3 font-semibold">Harga</th>
                <th className="text-left px-5 py-3 font-semibold">Stok</th>
                <th className="text-left px-5 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                      <Image src={p.image} alt={p.name} width={44} height={44} className="object-contain" />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{p.slug}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">{p.category}</span>
                  </td>
                  <td className="px-5 py-3 font-bold text-red-600">{formatRupiah(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={`font-semibold ${p.stock <= 10 ? 'text-amber-600' : 'text-gray-700'}`}>{p.stock} pcs</span>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/products/${p.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                      <PencilSquareIcon className="h-4 w-4" /> Lihat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
