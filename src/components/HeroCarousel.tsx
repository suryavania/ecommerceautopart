// src/components/HeroCarousel.tsx — Carousel gambar produk autoscroll

'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Product } from '@/types'
import { formatRupiah } from '@/lib/utils'

interface Props {
  products: Product[]
}

export default function HeroCarousel({ products }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % products.length)
  }, [products.length])

  const prev = () => {
    setCurrent(c => (c - 1 + products.length) % products.length)
  }

  // Autoscroll setiap 3 detik, berhenti jika di-hover
  useEffect(() => {
    if (paused || products.length === 0) return
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [paused, next, products.length])

  if (products.length === 0) return null

  const product = products[current]

  return (
    <div
      className="relative flex-shrink-0 w-full max-w-[420px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Kartu produk utama */}
      <div className="relative bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        {/* Gambar produk — besar dan centered */}
        <Link href={`/products/${product.slug}`}>
          <div className="relative w-full h-64 sm:h-72 bg-white/5 flex items-center justify-center p-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 transition-all duration-500"
              priority
            />
          </div>
        </Link>

        {/* Info produk */}
        <div className="px-5 pb-5 pt-3">
          <span className="inline-block bg-red-500/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
            {product.category}
          </span>
          <h3 className="text-white font-black text-base leading-snug mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-white/60 text-xs mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-orange-400 font-black text-xl">{formatRupiah(product.price)}</p>
            <Link
              href={`/products/${product.slug}`}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Lihat Detail
            </Link>
          </div>
        </div>

        {/* Tombol navigasi kiri & kanan */}
        <button
          onClick={prev}
          className="absolute left-3 top-[calc(50%-2rem)] -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-[calc(50%-2rem)] -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-red-500'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center text-white/40 text-xs mt-2">
        {current + 1} / {products.length} produk
      </p>
    </div>
  )
}
