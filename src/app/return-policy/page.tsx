// src/app/return-policy/page.tsx — Halaman Kebijakan Pengembalian

import Link from 'next/link'
import {
  ShieldCheckIcon, ClockIcon, XCircleIcon,
  CheckCircleIcon, PhotoIcon, PhoneIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

const CONDITIONS_OK = [
  'Produk rusak atau cacat saat diterima',
  'Produk tidak sesuai dengan deskripsi di website',
  'Produk salah kirim (beda dari yang dipesan)',
  'Produk tidak lengkap (ada bagian yang kurang)',
]

const CONDITIONS_NOT = [
  'Produk sudah dipasang atau digunakan',
  'Kerusakan akibat kesalahan pemasangan oleh pembeli',
  'Produk tidak cocok karena salah memilih (bukan kesalahan kami)',
  'Pengajuan retur lebih dari 3 hari setelah barang diterima',
  'Produk tanpa kemasan asli',
]

const STEPS = [
  { icon: PhoneIcon,       step: 1, title: 'Hubungi CS',          desc: 'Hubungi customer service kami via chat, WhatsApp, atau email dalam 3 hari setelah barang diterima.' },
  { icon: PhotoIcon,       step: 2, title: 'Kirim Bukti',          desc: 'Lampirkan foto/video produk yang bermasalah dan foto kemasan luar untuk diverifikasi.' },
  { icon: ClockIcon,       step: 3, title: 'Verifikasi (1–2 hari)', desc: 'Tim kami akan memverifikasi laporan dalam 1–2 hari kerja dan menginformasikan hasilnya.' },
  { icon: ArrowPathIcon,   step: 4, title: 'Proses Penggantian',   desc: 'Jika disetujui, produk pengganti akan dikirim atau refund diproses dalam 3–5 hari kerja.' },
]

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheckIcon className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Kebijakan Pengembalian</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Kepuasan pelanggan adalah prioritas kami. Kami menerima pengembalian produk
          dengan syarat dan ketentuan berikut.
        </p>
      </div>

      {/* Batas waktu */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 text-white rounded-2xl p-6 mb-8 flex items-center gap-5">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <ClockIcon className="h-8 w-8 text-white" />
        </div>
        <div>
          <p className="text-white/60 text-sm mb-1">Batas Waktu Pengajuan Retur</p>
          <p className="text-3xl font-black text-white">3 Hari</p>
          <p className="text-white/70 text-sm mt-1">Terhitung sejak produk diterima di alamat kamu</p>
        </div>
      </div>

      {/* Kondisi diterima & ditolak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {/* Diterima */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
            <h2 className="font-black text-gray-900">Kondisi Diterima</h2>
          </div>
          <ul className="space-y-2.5">
            {CONDITIONS_OK.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Ditolak */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircleIcon className="h-6 w-6 text-red-600" />
            <h2 className="font-black text-gray-900">Kondisi Ditolak</h2>
          </div>
          <ul className="space-y-2.5">
            {CONDITIONS_NOT.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                <XCircleIcon className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prosedur */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-5">Prosedur Pengembalian</h2>
        <div className="space-y-3">
          {STEPS.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-400">{step}</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">{title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info refund */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
          <ArrowPathIcon className="h-5 w-5 text-blue-600" />
          Informasi Refund
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Refund dilakukan ke rekening bank atau metode pembayaran asal.</p>
          <p>• Proses refund membutuhkan <strong>3–5 hari kerja</strong> setelah disetujui.</p>
          <p>• Biaya transfer akan ditanggung oleh AutoPart.</p>
          <p>• Untuk pembayaran COD, refund dilakukan via transfer bank.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
        <p className="text-gray-600 text-sm mb-4">
          Ada pertanyaan tentang pengembalian produk? Tim kami siap membantu.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/chat" className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors text-sm">
            Chat CS Sekarang
          </Link>
          <Link href="/contact" className="border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm">
            Lihat Kontak
          </Link>
        </div>
      </div>
    </div>
  )
}
