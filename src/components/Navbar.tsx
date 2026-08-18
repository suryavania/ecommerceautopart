'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon,
  XMarkIcon, UserCircleIcon, ChevronDownIcon,
  ArrowRightOnRectangleIcon, Squares2X2Icon, HomeIcon,
  TruckIcon, ShieldCheckIcon, ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import MenuDropdown from './MenuDropdown'

const CATEGORIES = [
  'Pengapian','Pelumas','Pengereman','Kelistrikan',
  'Filter','Kaki-kaki','Eksterior','Transmisi',
  'Pendingin','Bahan Bakar','Mesin',
]

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const totalItems = useCartStore((s) => s.totalItems())
  const [query, setQuery]           = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [userOpen, setUserOpen]     = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false)
      if (userRef.current && !userRef.current.contains(event.target as Node)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/products?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Promo bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white text-xs py-1.5 text-center font-medium">
        <span className="inline-flex items-center gap-1.5">
          <TruckIcon className="h-3.5 w-3.5 inline" />
          Gratis Ongkir pembelian di atas Rp 500.000
          &nbsp;|&nbsp;
          <ShieldCheckIcon className="h-3.5 w-3.5 inline" />
          Garansi Produk Original
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-3">

          {/* ── Logo Baru ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 relative flex-shrink-0">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="40" height="40" rx="10" fill="#DC2626"/>
                <text x="20" y="28" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="white">A</text>
                <rect x="8" y="32" width="24" height="2.5" rx="1.25" fill="#FCA5A5"/>
              </svg>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <div className="text-lg font-black tracking-tight leading-none">
                <span className="text-red-600">Auto</span>
                <span className="text-gray-900">Part</span>
              </div>
              <span className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase mt-0.5">
                Sparepart Mobil
              </span>
            </div>
          </Link>

          {/* Beranda */}
          <Link href="/" className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors flex-shrink-0">
            <HomeIcon className="h-4 w-4" />
            Beranda
          </Link>

          {/* Menu dropdown */}
          <div className="hidden lg:block relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${menuOpen ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:text-red-600 hover:bg-gray-100'}`}
            >
              <Squares2X2Icon className="h-4 w-4" />
              Menu
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            {menuOpen && <MenuDropdown onClose={() => setMenuOpen(false)} />}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari sparepart, merek, kategori..."
                className="w-full pl-4 pr-12 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 bg-gray-50 transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Kanan */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-black">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            {status === 'authenticated' && session ? (
              <>
                <div className="relative hidden sm:block" ref={userRef}>
                  <button
                    type="button"
                    onClick={() => setUserOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                  >
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    <span className="max-w-[80px] truncate text-xs">{session.user?.name}</span>
                    <ChevronDownIcon className={`h-3 w-3 transition-transform ${userOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Masuk sebagai</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{session.user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <UserCircleIcon className="h-4 w-4 text-gray-400" /> Profil Saya
                      </Link>
                      <Link href="/orders" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <ClipboardDocumentListIcon className="h-4 w-4 text-gray-400" /> Pesanan Saya
                      </Link>
                      <Link href="/chat" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-400" /> Chat Admin
                      </Link>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-lg transition-colors border border-red-200"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </>
            ) : status === 'unauthenticated' ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Masuk
                </Link>
                <Link href="/register" className="text-sm font-semibold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Daftar
                </Link>
              </div>
            ) : null}

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 max-h-[80vh] overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Menu Utama</p>
          <div className="space-y-0.5 mb-4">
            {[
              { href: '/',         label: 'Beranda'       },
              { href: '/products', label: 'Semua Produk'  },
              { href: '/cart',     label: 'Keranjang'     },
              { href: '/orders',   label: 'Pesanan Saya'  },
              { href: '/chat',     label: 'Chat Admin'    },
              { href: '/profile',  label: 'Profil Saya'   },
              { href: '/contact',  label: 'Kontak Kami'   },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kategori</p>
          <div className="space-y-0.5 mb-4">
            {CATEGORIES.map(cat => (
              <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                {cat}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3">
            {status === 'authenticated' && session ? (
              <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }) }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors">
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Keluar / Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link href="/login"    onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-bold border-2 border-red-600 text-red-600 py-2.5 rounded-xl">Masuk</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-sm font-bold bg-red-600 text-white py-2.5 rounded-xl">Daftar</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
