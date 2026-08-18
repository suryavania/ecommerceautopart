// src/components/HeroBanner.tsx — Hero section profesional seperti referensi

'use client'
import Link from 'next/link'
import { ShieldCheckIcon, TruckIcon, StarIcon } from '@heroicons/react/24/outline'

const BADGES = [
  { icon: StarIcon,         text: 'Kualitas OEM Terjamin'          },
  { icon: ShieldCheckIcon,  text: '100% Produk Asli & Bergaransi'  },
  { icon: TruckIcon,        text: 'Jaringan Distribusi Nasional'    },
]

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] text-white min-h-[88vh] flex items-center">

      {/* ── Background: pattern gear/teknik ── */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/95 to-[#0A1628]/60 z-10" />
        {/* Grid teknik */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Gear SVG dekoratif kanan */}
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.04]" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="200" r="180" stroke="white" strokeWidth="2"/>
          <circle cx="400" cy="200" r="120" stroke="white" strokeWidth="1.5"/>
          <circle cx="400" cy="200" r="60"  stroke="white" strokeWidth="1"/>
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x1 = 400 + 170 * Math.cos(angle)
            const y1 = 200 + 170 * Math.sin(angle)
            const x2 = 400 + 195 * Math.cos(angle)
            const y2 = 200 + 195 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="8" strokeLinecap="round"/>
          })}
          <circle cx="150" cy="550" r="120" stroke="white" strokeWidth="1.5"/>
          <circle cx="150" cy="550" r="70"  stroke="white" strokeWidth="1"/>
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            const x1 = 150 + 110 * Math.cos(angle)
            const y1 = 550 + 110 * Math.sin(angle)
            const x2 = 150 + 128 * Math.cos(angle)
            const y2 = 550 + 128 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="6" strokeLinecap="round"/>
          })}
        </svg>
        {/* Glow merah */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-red-800/10 rounded-full blur-3xl" />
      </div>

      {/* ── Konten Hero ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">

          {/* Badge distributor */}
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Principal Distributor Sparepart Indonesia
          </div>

          {/* Heading utama — besar seperti referensi */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            AutoPart —<br />
            <span className="text-red-500">Sparepart</span><br />
            <span className="text-white/90">Terpercaya</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-white/60 mb-8 max-w-xl leading-relaxed">
            Memperkuat pasokan suku cadang berkualitas original untuk kendaraan
            dan bengkel Anda. Lebih dari 500 produk siap kirim ke seluruh Indonesia.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/products"
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-red-900/40"
            >
              Lihat Produk Kami
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all text-base backdrop-blur-sm"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { val: '500+',  label: 'Produk'     },
              { val: '10K+',  label: 'Pelanggan'  },
              { val: '5+',    label: 'Tahun'      },
              { val: '99%',   label: 'Kepuasan'   },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-white">{val}</p>
                <p className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ticker bar bawah seperti referensi ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-red-700/80 backdrop-blur-sm border-t border-red-600/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/90">
                <Icon className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                <span className="text-xs font-bold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
