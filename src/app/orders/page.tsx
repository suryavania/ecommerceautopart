// src/app/orders/page.tsx — Riwayat Pesanan lengkap sesuai soal UAS

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatRupiah } from '@/lib/utils'
import {
  ClockIcon, CheckCircleIcon, TruckIcon,
  XCircleIcon, ShoppingBagIcon, CreditCardIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

const STEPS = [
  { key: 'process',  label: 'Proses',     icon: ClockIcon       },
  { key: 'payment',  label: 'Pembayaran', icon: CreditCardIcon  },
  { key: 'done',     label: 'Selesai',    icon: CheckCircleIcon },
]

function getActiveStep(status: string): number {
  switch (status) {
    case 'PENDING':                                    return 0
    case 'PAID': case 'PROCESSING': case 'SHIPPED':   return 1
    case 'DELIVERED':                                  return 2
    case 'CANCELLED':                                  return -1
    default:                                           return 0
  }
}

const STATUS_BADGE: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Belum Dibayar',   color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  PAID:       { label: 'Diproses',        color: 'bg-blue-100   text-blue-700   border-blue-200'   },
  PROCESSING: { label: 'Diproses',        color: 'bg-purple-100 text-purple-700 border-purple-200' },
  SHIPPED:    { label: 'Dikirim',         color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  DELIVERED:  { label: 'Selesai',         color: 'bg-green-100  text-green-700  border-green-200'  },
  CANCELLED:  { label: 'Dibatalkan',      color: 'bg-red-100    text-red-700    border-red-200'    },
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login?callbackUrl=/orders')

  const orders = await prisma.order.findMany({
    where: { userId: parseInt(session.user.id) },
    include: { items: { include: { product: { select: { name: true, image: true } } } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
          <ShoppingBagIcon className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Riwayat Pemesanan</h1>
          <p className="text-sm text-gray-500">{orders.length} pesanan ditemukan</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <ShoppingBagIcon className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <p className="font-semibold text-gray-700">Belum ada pesanan</p>
          <p className="text-sm text-gray-500 mt-1 mb-5">Yuk mulai belanja sparepart pertamamu!</p>
          <Link href="/products" className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const activeStep  = getActiveStep(order.status)
            const badge       = STATUS_BADGE[order.status] ?? STATUS_BADGE.PENDING
            const isCancelled = order.status === 'CANCELLED'
            const isPending   = order.status === 'PENDING'
            const dateStr     = new Date(order.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric',
            })
            const timeStr = new Date(order.createdAt).toLocaleTimeString('id-ID', {
              hour: '2-digit', minute: '2-digit',
            })

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* ── Header: No Order, Tanggal, Metode, Status ── */}
                <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">No. Transaksi</p>
                        <p className="font-black text-gray-900 text-base">#{String(order.id).padStart(5, '0')}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Tgl Order</p>
                        <p className="text-sm font-semibold text-gray-700">{dateStr}</p>
                        <p className="text-xs text-gray-400">{timeStr} WIB</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200 hidden sm:block" />
                      <div className="hidden sm:block">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Metode Bayar</p>
                        <p className="text-sm font-semibold text-gray-700">{
                          order.paymentMethod === 'cod' ? 'COD (Bayar di Tempat)' :
                          order.paymentMethod === 'qris' ? 'QRIS' :
                          `Transfer ${order.paymentMethod.toUpperCase()}`
                        }</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* ── Alamat Pengiriman (sesuai soal UAS) ── */}
                <div className="px-5 py-3 bg-blue-50 border-b border-blue-100">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-700 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="font-semibold">{order.recipientName}</span>
                      <span>|</span>
                      <span>{order.phone}</span>
                      <span>|</span>
                      <span>{order.address},</span>
                      <span className="font-semibold">Kota: {order.city}</span>
                      <span>|</span>
                      <span className="font-semibold">Provinsi: {order.province}</span>
                      <span>|</span>
                      <span>Kode Pos: {order.postalCode}</span>
                    </div>
                  </div>
                </div>

                {/* ── Progress bar 3 tahap ── */}
                {!isCancelled && (
                  <div className="px-5 py-5 border-b border-gray-100">
                    <div className="flex items-center justify-between relative">
                      <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 mx-10 z-0" />
                      <div
                        className="absolute left-0 top-5 h-0.5 bg-red-500 z-0 transition-all duration-500 mx-10"
                        style={{ width: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%' }}
                      />
                      {STEPS.map((step, idx) => {
                        const isDone   = idx < activeStep
                        const isActive = idx === activeStep
                        const StepIcon = step.icon
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-2 z-10 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                              isDone   ? 'bg-red-600 border-red-600' :
                              isActive ? 'bg-white border-red-500 shadow-md shadow-red-100' :
                              'bg-white border-gray-200'
                            }`}>
                              {isDone
                                ? <CheckCircleSolid className="h-5 w-5 text-white" />
                                : <StepIcon className={`h-5 w-5 ${isActive ? 'text-red-600' : 'text-gray-300'}`} />
                              }
                            </div>
                            <span className={`text-xs font-semibold text-center ${isDone || isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                              {step.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Banner info */}
                    {isPending && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                          <p className="text-xs text-yellow-700 font-medium">Segera selesaikan pembayaran kamu</p>
                        </div>
                        <Link href={`/orders/${order.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex-shrink-0">
                          Bayar Sekarang
                        </Link>
                      </div>
                    )}
                    {order.status === 'PAID' && (
                      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <p className="text-xs text-blue-700 font-medium">Pembayaran dikonfirmasi. Pesanan sedang dipersiapkan.</p>
                      </div>
                    )}
                    {order.status === 'SHIPPED' && (
                      <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center gap-2">
                        <TruckIcon className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                        <p className="text-xs text-indigo-700 font-medium">Pesanan sedang dalam perjalanan ke alamat kamu.</p>
                      </div>
                    )}
                    {order.status === 'DELIVERED' && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
                        <CheckCircleSolid className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <p className="text-xs text-green-700 font-medium">Pesanan telah diterima. Terima kasih sudah berbelanja!</p>
                      </div>
                    )}
                  </div>
                )}

                {isCancelled && (
                  <div className="px-5 py-4 border-b border-gray-100">
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                      <XCircleIcon className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <p className="text-xs text-red-700 font-medium">Pesanan ini telah dibatalkan.</p>
                    </div>
                  </div>
                )}

                {/* ── Produk ── */}
                <div className="px-5 py-4">
                  <div className="space-y-2.5">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-11 h-11 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500">{item.quantity} pcs × {formatRupiah(item.price)}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 flex-shrink-0">{formatRupiah(item.price * item.quantity)}</p>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-xs text-gray-400 pl-14">+{order.items.length - 3} produk lainnya</p>
                    )}
                  </div>
                </div>

                {/* ── Footer: Total + Tombol ── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Total Bayar</p>
                    <p className="font-black text-red-600 text-lg">{formatRupiah(order.totalAmount)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/products" className="text-xs font-semibold text-gray-500 hover:text-red-600 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                      Beli Lagi
                    </Link>
                    <Link href={`/orders/${order.id}`} className="text-xs font-semibold bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors">
                      {isPending ? 'Instruksi Bayar' : 'Lihat Detail'}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
