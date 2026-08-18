// src/app/contact/page.tsx — Halaman Kontak Kami

import {
  MapPinIcon, PhoneIcon, EnvelopeIcon,
  ClockIcon, ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    title: 'Alamat Toko',
    color: 'bg-red-50 text-red-600',
    lines: ['Jl. Raya Otomotif No.10', 'Semarang, Jawa Tengah 50111', 'Indonesia'],
  },
  {
    icon: PhoneIcon,
    title: 'Telepon',
    color: 'bg-green-50 text-green-600',
    lines: ['(021) 555-0199', 'WhatsApp: 0812-3456-7890'],
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    color: 'bg-blue-50 text-blue-600',
    lines: ['info@autopart.id', 'support@autopart.id'],
  },
  {
    icon: ClockIcon,
    title: 'Jam Operasional',
    color: 'bg-orange-50 text-orange-600',
    lines: ['Senin – Jumat: 08.00 – 17.00 WIB', 'Sabtu: 08.00 – 15.00 WIB', 'Minggu: Tutup'],
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-3">Kontak Kami</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Punya pertanyaan tentang produk atau pesanan? Tim kami siap membantu kamu.
          Hubungi kami melalui salah satu kontak di bawah ini.
        </p>
      </div>

      {/* Grid info kontak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {CONTACT_INFO.map(({ icon: Icon, title, color, lines }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              {lines.map((line, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Peta embed (Google Maps iframe Semarang) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900 flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-red-600" />
            Lokasi Toko
          </h2>
        </div>
        <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1690143752135!2d110.40921!3d-6.99277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4e7f6b1b1b%3A0x1b1b1b1b1b1b1b1b!2sSemarang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1234567890"
            width="100%"
            height="288"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi AutoPart Semarang"
          />
        </div>
      </div>

      {/* CTA Chat */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
        <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-3 opacity-80" />
        <h2 className="text-xl font-black mb-2">Butuh Bantuan Lebih Cepat?</h2>
        <p className="text-red-100 text-sm mb-5">
          Chat langsung dengan tim CS kami — biasanya membalas dalam beberapa menit.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          Mulai Chat Sekarang
        </Link>
      </div>
    </div>
  )
}
