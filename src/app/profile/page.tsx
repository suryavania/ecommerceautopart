// src/app/profile/page.tsx — Halaman profil lengkap

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatRupiah } from '@/lib/utils'
import {
  UserCircleIcon, ShoppingBagIcon,
  ClipboardDocumentListIcon, ShoppingCartIcon,
  Cog6ToothIcon, ChevronRightIcon, PencilSquareIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

// Icon Rupiah (Rp) sebagai SVG custom
function RupiahIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor" fontFamily="Arial">Rp</text>
    </svg>
  )
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login?callbackUrl=/profile')

  const [user, orderStats] = await Promise.all([
    prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.order.aggregate({
      where: { userId: parseInt(session.user.id) },
      _count: { id: true },
      _sum:   { totalAmount: true },
    }),
  ])

  if (!user) redirect('/')

  const joinDate = new Date(user.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Profil Saya</h1>

      {/* Kartu profil — nama & email diambil langsung dari database (selalu fresh) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <UserCircleIcon className="h-10 w-10 text-red-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-gray-900">{user.name}</h2>
              {user.role === 'ADMIN' && (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full">ADMIN</span>
              )}
            </div>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-400 text-xs mt-1">Bergabung sejak {joinDate}</p>
          </div>
          <Link
            href="/profile/edit"
            className="flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors flex-shrink-0"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Edit
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <ShoppingBagIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-black text-gray-900">{orderStats._count.id}</p>
          <p className="text-sm text-gray-500">Total Pesanan</p>
        </div>
        {/* Ganti dollar icon dengan Rupiah icon */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <RupiahIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-xl font-black text-gray-900">
            {formatRupiah(orderStats._sum.totalAmount ?? 0)}
          </p>
          <p className="text-sm text-gray-500">Total Belanja</p>
        </div>
      </div>

      {/* Menu navigasi */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {[
          { href: '/orders',           label: 'Pesanan Saya',    desc: 'Lihat riwayat dan status pesanan',    Icon: ClipboardDocumentListIcon, color: 'bg-purple-50 text-purple-600' },
          { href: '/cart',             label: 'Keranjang',        desc: 'Lihat produk di keranjang belanja',  Icon: ShoppingCartIcon,           color: 'bg-green-50  text-green-600'  },
          { href: '/profile/edit',     label: 'Edit Profil',      desc: 'Ubah nama dan email akun kamu',     Icon: PencilSquareIcon,           color: 'bg-blue-50   text-blue-600'   },
          { href: '/profile/password', label: 'Ganti Password',   desc: 'Perbarui password akun kamu',       Icon: LockClosedIcon,             color: 'bg-orange-50 text-orange-600' },
          ...(user.role === 'ADMIN'
            ? [{ href: '/admin', label: 'Dashboard Admin', desc: 'Kelola produk dan pesanan', Icon: Cog6ToothIcon, color: 'bg-red-50 text-red-600' }]
            : []),
        ].map(({ href, label, desc, Icon, color }) => (
          <Link key={href} href={href} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}
