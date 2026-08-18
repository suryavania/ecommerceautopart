// src/app/page.tsx — Halaman Beranda AutoPart

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/ProductCard'
import CategoryGrid from '@/components/CategoryGrid'
import HeroCarousel from '@/components/HeroCarousel'
import HeroBanner from '@/components/HeroBanner'
import PromoSection from '@/components/PromoSection'
import {
  ChevronRightIcon, ShieldCheckIcon, TruckIcon,
  WrenchScrewdriverIcon, PhoneIcon,
} from '@heroicons/react/24/outline'

const GUARANTEES = [
  { icon: ShieldCheckIcon,       title: 'Produk Original',    desc: 'Garansi keaslian dari distributor resmi'   },
  { icon: TruckIcon,             title: 'Pengiriman Cepat',   desc: 'Kirim ke seluruh Indonesia 1–3 hari'       },
  { icon: WrenchScrewdriverIcon, title: 'Dijamin Kompatibel', desc: 'Konsultasi gratis pilih sparepart'         },
  { icon: PhoneIcon,             title: 'CS Siap Membantu',   desc: 'Layanan pelanggan setiap hari kerja'       },
]

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({ take: 8, orderBy: { id: 'asc' } })
  const allProducts      = await prisma.product.findMany({ orderBy: { id: 'asc' } })

  return (
    <>
      {/* ══════════ HERO BANNER ══════════ */}
      <section className="relative overflow-hidden bg-[#0A1628] text-white min-h-[88vh] flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/95 to-[#0A1628]/50 z-10" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          {/* Gear dekoratif */}
          <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.05]" viewBox="0 0 500 800" fill="none">
            <circle cx="400" cy="200" r="180" stroke="white" strokeWidth="2"/>
            <circle cx="400" cy="200" r="120" stroke="white" strokeWidth="1.5"/>
            <circle cx="400" cy="200" r="60"  stroke="white" strokeWidth="1"/>
            {[...Array(12)].map((_, i) => {
              const a = (i * 30 * Math.PI) / 180
              return <line key={i} x1={400 + 170*Math.cos(a)} y1={200 + 170*Math.sin(a)} x2={400 + 195*Math.cos(a)} y2={200 + 195*Math.sin(a)} stroke="white" strokeWidth="8" strokeLinecap="round"/>
            })}
            <circle cx="150" cy="580" r="120" stroke="white" strokeWidth="1.5"/>
            <circle cx="150" cy="580" r="70"  stroke="white" strokeWidth="1"/>
            {[...Array(8)].map((_, i) => {
              const a = (i * 45 * Math.PI) / 180
              return <line key={i} x1={150 + 110*Math.cos(a)} y1={580 + 110*Math.sin(a)} x2={150 + 128*Math.cos(a)} y2={580 + 128*Math.sin(a)} stroke="white" strokeWidth="6" strokeLinecap="round"/>
            })}
          </svg>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        </div>

        {/* Konten */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Kiri: Teks */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                Principal Distributor Sparepart Indonesia
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5 tracking-tight">
                AutoPart —<br />
                <span className="text-red-500">Sparepart</span><br />
                <span className="text-white/90">Terpercaya</span>
              </h1>

              <p className="text-base text-white/60 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Memperkuat pasokan suku cadang berkualitas original untuk kendaraan dan bengkel Anda.
                Lebih dari 500 produk siap kirim ke seluruh Indonesia.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <Link href="/products" className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg shadow-red-900/40">
                  Lihat Produk Kami
                </Link>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all backdrop-blur-sm">
                  Hubungi Kami
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                {[['500+','Produk'],['10K+','Pelanggan'],['5+','Tahun'],['99%','Kepuasan']].map(([val, label]) => (
                  <div key={label} className="text-center lg:text-left">
                    <p className="text-2xl font-black text-white">{val}</p>
                    <p className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan: Carousel produk */}
            <div className="flex-shrink-0 w-full max-w-sm">
              <HeroCarousel products={allProducts} />
            </div>
          </div>
        </div>

        {/* Ticker bar bawah */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-red-700/80 backdrop-blur-sm border-t border-red-600/30">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
              {[
                { icon: ShieldCheckIcon, text: 'Kualitas OEM Terjamin'         },
                { icon: ShieldCheckIcon, text: '100% Produk Asli & Bergaransi' },
                { icon: TruckIcon,       text: 'Jaringan Distribusi Nasional'  },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/90">
                  <Icon className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs font-bold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ JAMINAN ══════════ */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {GUARANTEES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROMO ══════════ */}
      <PromoSection />

      {/* ══════════ KATEGORI ══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-gray-900">Belanja per Kategori</h2>
          <Link href="/products" className="text-sm text-red-600 hover:underline flex items-center gap-1 font-medium">
            Semua <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* ══════════ PRODUK PILIHAN ══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-gray-900">Produk Pilihan</h2>
            <p className="text-sm text-gray-500 mt-0.5">Sparepart terlaris dan paling dicari</p>
          </div>
          <Link href="/products" className="text-sm text-red-600 hover:underline flex items-center gap-1 font-medium">
            Lihat semua <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ══════════ SEMUA PRODUK ══════════ */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-gray-900">
              Semua Produk <span className="text-gray-400 font-normal text-base">({allProducts.length} item)</span>
            </h2>
            <Link href="/products" className="text-sm text-red-600 hover:underline flex items-center gap-1 font-medium">
              Filter & Cari <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-gradient-to-r from-red-700 to-red-800 text-white py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Butuh Bantuan Memilih Sparepart?</h2>
          <p className="text-red-100 mb-6 text-sm sm:text-base">
            Tim teknisi kami siap membantu memastikan suku cadang yang tepat untuk kendaraan Anda.
          </p>
          <a href="tel:021-555-0199" className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-lg">
            <PhoneIcon className="h-5 w-5" />
            Hubungi Kami: (021) 555-0199
          </a>
        </div>
      </section>
    </>
  )
}
