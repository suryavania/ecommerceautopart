// src/components/Footer.tsx

import Link from 'next/link'
import {
  MapPinIcon, PhoneIcon, EnvelopeIcon,
  ClockIcon, LockClosedIcon, ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const LAYANAN = [
  { label: 'Tentang Kami',           href: '/about'         },
  { label: 'Cara Berbelanja',        href: '/how-to-order'  },
  { label: 'Kebijakan Pengembalian', href: '/return-policy' },
  { label: 'Hubungi Kami',           href: '/contact'       },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <div>
                <span className="font-black text-red-500 text-lg">Auto</span>
                <span className="font-black text-white text-lg">Part</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Toko sparepart mobil terpercaya. Produk original &amp; aftermarket berkualitas dengan harga kompetitif.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kategori Produk</h4>
            <ul className="space-y-2 text-sm">
              {['Pengapian','Pelumas','Pengereman','Kelistrikan','Kaki-kaki'].map(c => (
                <li key={c}>
                  <Link href={`/products?category=${c}`} className="hover:text-red-400 transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan — semua link aktif */}
          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {LAYANAN.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-red-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Jl. Raya Otomotif No.10, Semarang</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>(021) 555-0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <EnvelopeIcon className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>info@autopart.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>Sen–Sab: 08.00–17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AutoPart. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-3">
            <span className="bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <LockClosedIcon className="h-3.5 w-3.5 text-green-400" />
              SSL Secured
            </span>
            <span className="bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-green-400" />
              Produk Original
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
