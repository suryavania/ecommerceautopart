// src/app/products/page.tsx — Katalog produk dengan filter harga + pagination

import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const CATEGORIES = [
  'Pengapian','Pelumas','Pengereman','Kelistrikan',
  'Filter','Kaki-kaki','Eksterior','Transmisi',
  'Pendingin','Bahan Bakar','Mesin',
]

const PRICE_RANGES = [
  { label: 'Semua Harga',          min: 0,      max: 999999999 },
  { label: 'Di bawah Rp 50.000',   min: 0,      max: 50000     },
  { label: 'Rp 50.000 – 200.000',  min: 50000,  max: 200000    },
  { label: 'Rp 200.000 – 500.000', min: 200000, max: 500000    },
  { label: 'Di atas Rp 500.000',   min: 500000, max: 999999999 },
]

const PER_PAGE = 12

interface Props {
  searchParams: { q?: string; category?: string; price?: string; page?: string }
}

export default async function ProductsPage({ searchParams }: Props) {
  const q        = searchParams?.q        ?? ''
  const category = searchParams?.category ?? ''
  const price    = searchParams?.price    ?? '0'
  const page     = Math.max(1, parseInt(searchParams?.page ?? '1'))
  const priceRange = PRICE_RANGES[parseInt(price)] ?? PRICE_RANGES[0]

  const where: any = {
    AND: [
      category ? { category } : {},
      q ? { OR: [{ name: { contains: q } }, { description: { contains: q } }, { category: { contains: q } }] } : {},
      parseInt(price) > 0 ? { price: { gte: priceRange.min, lte: priceRange.max } } : {},
    ],
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy: { id: 'asc' }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.product.count({ where }),
  ])

  const totalPages = Math.ceil(total / PER_PAGE)

  const buildUrl = (params: Record<string, string>) => {
    const base = new URLSearchParams()
    if (q)             base.set('q', q)
    if (category)      base.set('category', category)
    if (price !== '0') base.set('price', price)
    base.set('page', '1')
    Object.entries(params).forEach(([k, v]) => v ? base.set(k, v) : base.delete(k))
    return `/products?${base.toString()}`
  }

  const title = category ? `Kategori: ${category}` : q ? `Hasil: "${q}"` : 'Semua Produk'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full lg:w-60 flex-shrink-0 space-y-4">
          {/* Kategori */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Kategori</h3>
            <ul className="space-y-0.5">
              <li>
                <Link href={buildUrl({ category: '' })} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  Semua Kategori
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link href={buildUrl({ category: cat })} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${category === cat ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter Harga */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Rentang Harga</h3>
            <ul className="space-y-0.5">
              {PRICE_RANGES.map((range, idx) => (
                <li key={idx}>
                  <Link href={buildUrl({ price: String(idx) })} className={`block px-3 py-2 rounded-lg text-sm transition-colors ${price === String(idx) ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {range.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Stok */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Ketersediaan</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                Tersedia (stok ada)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0" />
                Tidak Tersedia (stok 0)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0" />
                Stok Terbatas (≤10)
              </div>
            </div>
          </div>

          {(category || q || price !== '0') && (
            <Link href="/products" className="block w-full text-center text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl transition-colors">
              Reset Semua Filter
            </Link>
          )}
        </aside>

        {/* Grid produk */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-black text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {total} produk · Halaman {page} dari {Math.max(1, totalPages)}
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="text-5xl mb-3">🔍</div>
              <p className="font-semibold text-gray-700">Produk tidak ditemukan</p>
              <p className="text-sm text-gray-500 mt-1">Coba filter yang berbeda</p>
              <Link href="/products" className="inline-block mt-4 text-sm text-red-600 font-semibold hover:underline">Reset Filter</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {page > 1 ? (
                    <Link href={buildUrl({ page: String(page - 1) })} className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <ChevronLeftIcon className="h-4 w-4" /> Sebelumnya
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 bg-gray-50 border border-gray-100 rounded-xl cursor-not-allowed">
                      <ChevronLeftIcon className="h-4 w-4" /> Sebelumnya
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .reduce((acc: (number | string)[], p, idx, arr) => {
                        if (idx > 0 && (arr[idx - 1] as number) !== p - 1) acc.push('...')
                        acc.push(p)
                        return acc
                      }, [])
                      .map((p, i) => p === '...' ? (
                        <span key={`d${i}`} className="px-2 text-gray-400 text-sm">...</span>
                      ) : (
                        <Link key={p} href={buildUrl({ page: String(p) })}
                          className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${p === page ? 'bg-red-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                          {p}
                        </Link>
                      ))}
                  </div>

                  {page < totalPages ? (
                    <Link href={buildUrl({ page: String(page + 1) })} className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      Selanjutnya <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 bg-gray-50 border border-gray-100 rounded-xl cursor-not-allowed">
                      Selanjutnya <ChevronRightIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
