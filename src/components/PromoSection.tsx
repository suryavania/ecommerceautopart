// src/components/PromoSection.tsx — Section promo & diskon

'use client'
import Link from 'next/link'
import { TagIcon, TruckIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline'

const PROMOS = [
  {
    id: 1,
    badge: 'PROMO SPESIAL',
    title: 'Gratis Ongkir',
    desc: 'Untuk setiap pembelian di atas Rp 500.000 ke seluruh Indonesia',
    cta: 'Belanja Sekarang',
    href: '/products',
    icon: TruckIcon,
    bg: 'from-blue-600 to-blue-800',
    badgeColor: 'bg-blue-400',
  },
  {
    id: 2,
    badge: 'DISKON 15%',
    title: 'Sparepart Filter',
    desc: 'Dapatkan diskon 15% untuk semua produk kategori Filter minggu ini',
    cta: 'Lihat Produk',
    href: '/products?category=Filter',
    icon: TagIcon,
    bg: 'from-red-600 to-red-800',
    badgeColor: 'bg-red-400',
  },
  {
    id: 3,
    badge: 'GARANSI',
    title: 'Produk Original',
    desc: 'Semua produk bergaransi keaslian. Uang kembali jika tidak original',
    cta: 'Pelajari Lebih',
    href: '/contact',
    icon: ShieldCheckIcon,
    bg: 'from-green-600 to-green-800',
    badgeColor: 'bg-green-400',
  },
  {
    id: 4,
    badge: 'TERBATAS',
    title: 'Flash Sale Oli',
    desc: 'Harga spesial untuk produk pelumas pilihan. Stok terbatas!',
    cta: 'Beli Sekarang',
    href: '/products?category=Pelumas',
    icon: ClockIcon,
    bg: 'from-orange-600 to-orange-800',
    badgeColor: 'bg-orange-400',
  },
]

export default function PromoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-gray-900">Promo & Diskon</h2>
          <p className="text-sm text-gray-500 mt-0.5">Penawaran terbaik khusus untuk kamu</p>
        </div>
        <Link href="/products" className="text-sm text-red-600 hover:underline font-medium flex items-center gap-1">
          <TagIcon className="h-4 w-4" />
          Semua Promo
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROMOS.map(({ id, badge, title, desc, cta, href, icon: Icon, bg, badgeColor }) => (
          <div key={id} className={`relative bg-gradient-to-br ${bg} rounded-2xl p-5 text-white overflow-hidden group`}>
            {/* Background icon dekoratif */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Icon className="h-24 w-24" />
            </div>

            {/* Badge */}
            <span className={`inline-block ${badgeColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full mb-3 tracking-widest`}>
              {badge}
            </span>

            {/* Konten */}
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-5 w-5 opacity-80 flex-shrink-0" />
              <h3 className="font-black text-lg leading-tight">{title}</h3>
            </div>
            <p className="text-white/75 text-xs leading-relaxed mb-4">{desc}</p>

            {/* Tombol */}
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors group-hover:bg-white/30"
            >
              {cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
