// src/app/how-to-order/page.tsx — Halaman Cara Berbelanja

import Link from 'next/link'
import {
  UserPlusIcon, MagnifyingGlassIcon, ShoppingCartIcon,
  CreditCardIcon, TruckIcon, CheckCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

const STEPS = [
  {
    step: 1,
    icon: UserPlusIcon,
    title: 'Buat Akun',
    desc: 'Daftar akun gratis dengan email dan password. Sudah punya akun? Langsung login.',
    color: 'bg-blue-600',
    tip: 'Gunakan email aktif agar bisa menerima konfirmasi pesanan.',
  },
  {
    step: 2,
    icon: MagnifyingGlassIcon,
    title: 'Cari Produk',
    desc: 'Gunakan search bar atau filter kategori untuk menemukan sparepart yang kamu butuhkan.',
    color: 'bg-purple-600',
    tip: 'Klik detail produk untuk melihat spesifikasi lengkap dan kompatibilitas kendaraan.',
  },
  {
    step: 3,
    icon: ShoppingCartIcon,
    title: 'Tambah ke Keranjang',
    desc: 'Klik tombol "Keranjang" di halaman produk. Kamu bisa tambah beberapa produk sekaligus.',
    color: 'bg-orange-600',
    tip: 'Tidak perlu login untuk menambah ke keranjang, tapi wajib login saat checkout.',
  },
  {
    step: 4,
    icon: CreditCardIcon,
    title: 'Checkout & Bayar',
    desc: 'Isi alamat pengiriman lengkap, pilih metode pembayaran, dan konfirmasi pesanan.',
    color: 'bg-red-600',
    tip: 'Tersedia Transfer BCA, Mandiri, BNI, QRIS, dan COD (Bayar di Tempat).',
  },
  {
    step: 5,
    icon: TruckIcon,
    title: 'Pesanan Diproses',
    desc: 'Setelah pembayaran dikonfirmasi, pesanan akan dikemas dan dikirim dalam 1×24 jam.',
    color: 'bg-indigo-600',
    tip: 'Kamu akan mendapat notifikasi saat pesanan dikirim.',
  },
  {
    step: 6,
    icon: CheckCircleIcon,
    title: 'Terima Pesanan',
    desc: 'Produk tiba di alamat kamu. Cek kondisi barang dan konfirmasi penerimaan.',
    color: 'bg-green-600',
    tip: 'Jika ada masalah dengan produk, hubungi CS kami dalam 3 hari setelah terima.',
  },
]

const FAQS = [
  { q: 'Berapa lama estimasi pengiriman?', a: '1–3 hari untuk Jawa, 3–7 hari untuk luar Jawa.' },
  { q: 'Apakah produk yang dijual original?', a: 'Ya, semua produk 100% original dari distributor resmi. Ada juga pilihan aftermarket berkualitas.' },
  { q: 'Bisa COD (Bayar di Tempat)?', a: 'Bisa, COD tersedia untuk area tertentu. Pilih opsi COD saat checkout.' },
  { q: 'Bagaimana jika produk tidak sesuai?', a: 'Kamu bisa mengajukan retur dalam 3 hari setelah barang diterima. Lihat kebijakan pengembalian kami.' },
  { q: 'Apakah bisa beli tanpa akun?', a: 'Kamu bisa browse produk tanpa akun, tapi wajib login/daftar untuk checkout.' },
]

export default function HowToOrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-3">Cara Berbelanja</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Belanja sparepart di AutoPart sangat mudah. Ikuti 6 langkah sederhana berikut ini.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-12">
        {STEPS.map(({ step, icon: Icon, title, desc, color, tip }) => (
          <div key={step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5">
            {/* Nomor & icon */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              {step < STEPS.length && (
                <div className="w-0.5 h-8 bg-gray-200" />
              )}
            </div>
            {/* Konten */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-400">LANGKAH {step}</span>
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-1">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-2">{desc}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 text-xs text-yellow-700 flex items-start gap-1.5">
                <span className="font-bold flex-shrink-0">Tips:</span>
                <span>{tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-5 flex items-center gap-2">
          <QuestionMarkCircleIcon className="h-6 w-6 text-red-600" />
          Pertanyaan Umum
        </h2>
        <div className="space-y-3">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="font-bold text-gray-900 mb-1.5">{q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-black mb-2">Siap Mulai Belanja?</h2>
        <p className="text-red-100 text-sm mb-5">Temukan sparepart yang kamu butuhkan sekarang.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/products" className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Lihat Produk
          </Link>
          <Link href="/register" className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
            Daftar Gratis
          </Link>
        </div>
      </div>
    </div>
  )
}
