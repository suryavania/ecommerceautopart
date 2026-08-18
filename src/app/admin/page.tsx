// src/app/admin/page.tsx — Dashboard admin sederhana

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatRupiah } from '@/lib/utils'
import {
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/')

  // Statistik
  const [totalOrders, totalUsers, totalProducts, revenueResult, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.aggregate({ where: { status: { in: ['PAID','DELIVERED'] } }, _sum: { totalAmount: true } }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
  ])

  const revenue = revenueResult._sum.totalAmount ?? 0

  const stats = [
    { label: 'Total Pesanan',   value: totalOrders,            icon: ShoppingBagIcon,    color: 'bg-blue-50   text-blue-600'   },
    { label: 'Total Pengguna',  value: totalUsers,             icon: UsersIcon,           color: 'bg-green-50  text-green-600'  },
    { label: 'Total Produk',    value: totalProducts,          icon: ArchiveBoxIcon,      color: 'bg-purple-50 text-purple-600' },
    { label: 'Pendapatan',      value: formatRupiah(revenue),  icon: CurrencyDollarIcon,  color: 'bg-red-50    text-red-600'    },
  ]

  const STATUS_COLORS: Record<string, string> = {
    PENDING:    'bg-yellow-100 text-yellow-700',
    PAID:       'bg-blue-100   text-blue-700',
    PROCESSING: 'bg-purple-100 text-purple-700',
    SHIPPED:    'bg-indigo-100 text-indigo-700',
    DELIVERED:  'bg-green-100  text-green-700',
    CANCELLED:  'bg-red-100    text-red-700',
  }
  const STATUS_LABEL: Record<string, string> = {
    PENDING:'Menunggu', PAID:'Dibayar', PROCESSING:'Diproses',
    SHIPPED:'Dikirim', DELIVERED:'Selesai', CANCELLED:'Batal',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Selamat datang, {session.user.name} 👋</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products" className="bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors">
            + Tambah Produk
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`w-10 h-10 ${color.split(' ')[0]} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`h-5 w-5 ${color.split(' ')[1]}`} />
            </div>
            <p className="text-2xl font-black text-gray-900">{typeof value === 'number' ? value.toLocaleString('id-ID') : value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabel pesanan terbaru */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-black text-gray-900">Pesanan Terbaru</h2>
          <span className="text-xs text-gray-500">10 pesanan terakhir</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                <th className="text-left px-6 py-3 font-semibold">ID</th>
                <th className="text-left px-6 py-3 font-semibold">Pelanggan</th>
                <th className="text-left px-6 py-3 font-semibold">Kota</th>
                <th className="text-left px-6 py-3 font-semibold">Total</th>
                <th className="text-left px-6 py-3 font-semibold">Pembayaran</th>
                <th className="text-left px-6 py-3 font-semibold">Status</th>
                <th className="text-left px-6 py-3 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{order.user.name}</p>
                    <p className="text-xs text-gray-500">{order.user.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.city}</td>
                  <td className="px-6 py-4 font-bold text-red-600">{formatRupiah(order.totalAmount)}</td>
                  <td className="px-6 py-4 text-gray-600 text-xs">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                      {STATUS_LABEL[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-400 py-12">Belum ada pesanan</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
