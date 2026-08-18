// src/app/about/page.tsx — Halaman Tentang Kami

import Link from 'next/link'
import {
  ShieldCheckIcon, TruckIcon, WrenchScrewdriverIcon,
  UserGroupIcon, StarIcon, BuildingStorefrontIcon,
} from '@heroicons/react/24/outline'
import TeamAvatar from '@/components/TeamAvatar'

const STATS = [
  { value: '500+', label: 'Produk Tersedia' },
  { value: '10K+', label: 'Pelanggan Puas' },
  { value: '5+',   label: 'Tahun Berpengalaman' },
  { value: '99%',  label: 'Tingkat Kepuasan' },
]

const VALUES = [
  { icon: ShieldCheckIcon,       title: 'Keaslian Produk',   desc: 'Kami hanya menjual produk original dan aftermarket berkualitas dari distributor resmi dan terpercaya.',       color: 'bg-red-50    text-red-600'    },
  { icon: TruckIcon,             title: 'Pengiriman Cepat',  desc: 'Pesanan diproses dalam 1×24 jam dan dikirim ke seluruh Indonesia melalui ekspedisi terpercaya.',             color: 'bg-blue-50   text-blue-600'   },
  { icon: WrenchScrewdriverIcon, title: 'Konsultasi Gratis', desc: 'Tim teknisi berpengalaman kami siap membantu memilih sparepart yang tepat untuk kendaraan Anda.',           color: 'bg-green-50  text-green-600'  },
  { icon: UserGroupIcon,         title: 'Pelayanan Prima',   desc: 'Customer service kami siap melayani pertanyaan dan keluhan Anda setiap hari kerja pukul 08.00–17.00 WIB.',  color: 'bg-orange-50 text-orange-600' },
]

// Tambahkan path foto di properti `image`. Simpan file foto di /public/images/team/
// dan gunakan path yang diawali "/images/team/..." (contoh: "/images/team/suryo.jpg").
// Kalau `image` dikosongkan atau file fotonya belum ada, otomatis fallback ke inisial.
const TEAM = [
  { name: 'Suryo Wikantoro', role: 'Founder & CEO',       initial: 'SW', image: '/images/team/suryo.jpeg'   },
  { name: 'GARPIT',    role: 'Best Friend',            initial: 'AN', image: '/images/team/aqilla.jpeg'  },
  { name: 'Corona Beer',   role: 'Best Friend', initial: 'CP', image: '/images/team/chintia.jpeg' },
  { name: 'MARLONG',           role: 'Best Friend',                   initial: 'C',  image: '/images/team/cella.jpeg'   },
]

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full mb-4">
          <BuildingStorefrontIcon className="h-4 w-4" />
          Tentang AutoPart
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Toko Sparepart Mobil<br />
          <span className="text-red-600">Terpercaya di Indonesia</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          AutoPart berdiri sejak 2019 dengan misi menyediakan suku cadang kendaraan
          berkualitas tinggi dengan harga yang terjangkau dan pelayanan yang memuaskan
          untuk seluruh masyarakat Indonesia.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-3xl font-black text-red-600 mb-1">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Cerita */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 text-white rounded-3xl p-8 sm:p-10 mb-12">
        <h2 className="text-2xl font-black mb-4">Cerita Kami</h2>
        <div className="space-y-3 text-gray-300 leading-relaxed">
          <p>
            AutoPart didirikan pada tahun 2019 oleh sekelompok praktisi otomotif yang
            berpengalaman di industri sparepart selama lebih dari satu dekade.
            Berawal dari toko fisik kecil di Semarang, kami berkembang menjadi
            platform e-commerce yang melayani pelanggan di seluruh Indonesia.
          </p>
          <p>
            Kami percaya bahwa setiap pemilik kendaraan berhak mendapatkan akses
            mudah ke sparepart berkualitas dengan harga yang transparan. Dengan
            menghubungkan langsung konsumen dengan distributor resmi, kami memastikan
            keaslian setiap produk yang kami jual.
          </p>
          <p>
            Hingga saat ini, AutoPart telah melayani lebih dari 10.000 pelanggan
            setia dan terus berkembang dengan menambah lebih dari 500 produk
            sparepart original dan aftermarket berkualitas.
          </p>
        </div>
      </div>

      {/* Nilai */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-6">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tim */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-6">Tim Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TEAM.map(({ name, role, initial, image }) => (
            <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <TeamAvatar name={name} initial={initial} image={image} />
              <p className="font-bold text-gray-900 text-sm">{name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
        <StarIcon className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-black text-gray-900 mb-2">Bergabung Bersama Kami</h2>
        <p className="text-gray-500 text-sm mb-5">
          Temukan ribuan produk sparepart berkualitas dan nikmati pengalaman belanja yang menyenangkan.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/products" className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors text-sm">
            Mulai Belanja
          </Link>
          <Link href="/contact" className="border-2 border-red-600 text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  )
}