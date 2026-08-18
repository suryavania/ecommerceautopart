// src/components/MenuDropdown.tsx — Dropdown menu utama navigasi

'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  Squares2X2Icon, ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon, UserCircleIcon,
  ShoppingBagIcon, ShieldCheckIcon, TagIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

const CATEGORIES = [
  'Pengapian','Pelumas','Pengereman','Kelistrikan',
  'Filter','Kaki-kaki','Eksterior','Transmisi',
]

interface Props { onClose: () => void }

export default function MenuDropdown({ onClose }: Props) {
  const { data: session } = useSession()

  const MENU_ITEMS = [
    { href: '/products', icon: Squares2X2Icon,            label: 'Semua Produk',   desc: 'Lihat seluruh katalog sparepart',  color: 'text-blue-600   bg-blue-50'   },
    { href: '/cart',     icon: ShoppingBagIcon,           label: 'Keranjang Saya', desc: 'Produk yang siap di-checkout',     color: 'text-green-600  bg-green-50'  },
    { href: '/orders',   icon: ClipboardDocumentListIcon, label: 'Pesanan Saya',   desc: 'Cek status & riwayat checkout',    color: 'text-purple-600 bg-purple-50' },
    { href: '/chat',     icon: ChatBubbleLeftRightIcon,   label: 'Chat Admin',     desc: 'Tanya-jawab seputar produk',       color: 'text-orange-600 bg-orange-50' },
    { href: '/profile',  icon: UserCircleIcon,            label: 'Profil Saya',    desc: 'Kelola data akun kamu',            color: 'text-pink-600   bg-pink-50'   },
    { href: '/contact',  icon: PhoneIcon,                 label: 'Kontak Kami',    desc: 'Alamat & informasi toko kami',     color: 'text-teal-600   bg-teal-50'   },
  ]

  return (
    <div className="absolute top-full left-0 mt-1 w-[640px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50">
      <div className="grid grid-cols-2 gap-5">

        {/* Kolom kiri: Menu Fitur */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Menu Utama
          </p>
          <div className="space-y-1">
            {MENU_ITEMS.map(({ href, icon: Icon, label, desc, color }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{desc}</p>
                </div>
              </Link>
            ))}

            {session?.user?.role === 'ADMIN' && (
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-red-600 bg-red-50">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">Dashboard Admin</p>
                  <p className="text-xs text-gray-400">Kelola produk &amp; pesanan</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Kolom kanan: Kategori Produk */}
        <div className="border-l border-gray-100 pl-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-1.5">
            <TagIcon className="h-3.5 w-3.5" /> Kategori Produk
          </p>
          <div className="grid grid-cols-2 gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                onClick={onClose}
                className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
          <Link
            href="/products"
            onClick={onClose}
            className="block mt-3 text-center text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl py-2.5 transition-colors"
          >
            Lihat Semua Kategori →
          </Link>
        </div>
      </div>
    </div>
  )
}
