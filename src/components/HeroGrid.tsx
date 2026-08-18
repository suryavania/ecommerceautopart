// src/components/HeroGrid.tsx — Client component untuk grid produk di hero

'use client'

import Link from 'next/link'
import { Product } from '@/types'

interface Props {
  products: Product[]
  totalCount: number
}

export default function HeroGrid({ products, totalCount }: Props) {
  return (
    <div className="flex-shrink-0 w-full max-w-[340px] sm:max-w-[380px]">
      <div className="grid grid-cols-3 gap-3">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="group flex flex-col items-center justify-between bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-2xl p-3 transition-all duration-200"
            style={{ minHeight: '110px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.name}
              width={64}
              height={64}
              className="object-contain max-h-16 max-w-full w-auto h-auto group-hover:scale-110 transition-transform duration-200"
            />
            <p className="text-white/75 text-[9px] font-semibold text-center leading-tight line-clamp-2 mt-2 w-full">
              {p.name.split(' ').slice(0, 3).join(' ')}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-xs text-white/40 px-2">+ {totalCount - 6} produk lainnya</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  )
}
