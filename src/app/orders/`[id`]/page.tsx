// src/app/orders/[id]/page.tsx — Detail Pesanan + Instruksi Pembayaran + Konfirmasi Selesai

'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  ClockIcon, CheckCircleIcon, ArrowLeftIcon,
  ClipboardDocumentIcon, BanknotesIcon,
  InformationCircleIcon, ShieldCheckIcon,
  TruckIcon, XCircleIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'
import { formatRupiah } from '@/lib/utils'

interface OrderItem {
  id: number
  quantity: number
  price: number
  product: { name: string; image: string; slug: string }
}

interface Order {
  id: number
  status: string
  totalAmount: number
  paymentMethod: string
  recipientName: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  createdAt: string
  paidAt: string | null
  items: OrderItem[]
}

const PAYMENT_INFO: Record<string, { bank: string; noRek: string; atasnama: string; color: string }> = {
  bca:     { bank: 'BCA',     noRek: '1234-5678-9012', atasnama: 'PT AutoPart Indonesia', color: 'bg-blue-700'   },
  mandiri: { bank: 'Mandiri', noRek: '9876-5432-1098', atasnama: 'PT AutoPart Indonesia', color: 'bg-yellow-500' },
  bni:     { bank: 'BNI',     noRek: '1122-3344-5566', atasnama: 'PT AutoPart Indonesia', color: 'bg-orange-600' },
}

const TRANSFER_STEPS = [
  'Buka aplikasi mobile banking atau ATM bank kamu',
  'Pilih menu Transfer → Transfer ke Bank Lain (jika beda bank)',
  'Masukkan nomor rekening tujuan dengan benar',
  'Masukkan nominal transfer TEPAT sesuai total tagihan',
  'Pastikan nama penerima sudah benar sebelum konfirmasi',
  'Simpan bukti transfer (screenshot atau struk ATM)',
  'Klik tombol "Saya Sudah Bayar" di bawah atau chat CS kami',
]

// Countdown timer 24 jam
function useCountdown(createdAt: string) {
  const deadline = new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000)
  const calc = useCallback(() => {
    const diff = deadline.getTime() - Date.now()
    if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true }
    return { h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000), expired: false }
  }, [deadline])
  const [time, setTime] = useState(calc())
  useEffect(() => { const t = setInterval(() => setTime(calc()), 1000); return () => clearInterval(t) }, [calc])
  return time
}

function CountdownTimer({ createdAt }: { createdAt: string }) {
  const { h, m, s, expired } = useCountdown(createdAt)
  if (expired) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
      <p className="text-red-600 font-bold text-sm">Batas waktu pembayaran telah habis</p>
    </div>
  )
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
      <p className="text-xs text-red-600 font-semibold text-center mb-3 flex items-center justify-center gap-1.5">
        <ClockIcon className="h-4 w-4" /> Selesaikan pembayaran sebelum waktu habis
      </p>
      <div className="flex items-center justify-center gap-2">
        {[{ val: h, label: 'Jam' }, { val: m, label: 'Menit' }, { val: s, label: 'Detik' }].map(({ val, label }, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="bg-red-600 text-white rounded-xl px-4 py-3 text-center min-w-[64px]">
              <p className="text-2xl font-black leading-none">{String(val).padStart(2, '0')}</p>
              <p className="text-[10px] text-red-200 mt-1">{label}</p>
            </div>
            {i < 2 && <span className="text-red-600 font-black text-xl">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
      {copied ? <CheckCircleSolid className="h-3.5 w-3.5" /> : <ClipboardDocumentIcon className="h-3.5 w-3.5" />}
      {copied ? 'Tersalin!' : 'Salin'}
    </button>
  )
}

export default function OrderDetailPage() {
  const params  = useParams()
  const router  = useRouter()
  const { data: session, status } = useSession()
  const [order, setOrder]       = useState<Order | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch(`/api/orders/${params.id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => { setError('Pesanan tidak ditemukan.'); setLoading(false) })
  }, [params.id, status])

  // Konfirmasi "Saya Sudah Bayar" — ubah status ke PAID
  const handleConfirmPayment = async () => {
    if (!order) return
    setConfirming(true)
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PAID' }),
      })
      if (res.ok) {
        setOrder(prev => prev ? { ...prev, status: 'PAID' } : prev)
        setConfirmMsg('✅ Pembayaran dikonfirmasi! Pesanan kamu sedang diproses.')
      } else {
        const data = await res.json()
        setConfirmMsg(`❌ ${data.message}`)
      }
    } catch {
      setConfirmMsg('❌ Terjadi kesalahan jaringan.')
    } finally {
      setConfirming(false)
    }
  }

  // Konfirmasi "Pesanan Diterima" — ubah status ke DELIVERED
  const handleConfirmReceived = async () => {
    if (!order) return
    setConfirming(true)
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DELIVERED' }),
      })
      if (res.ok) {
        setOrder(prev => prev ? { ...prev, status: 'DELIVERED' } : prev)
        setConfirmMsg('✅ Pesanan selesai! Terima kasih sudah berbelanja di AutoPart.')
      } else {
        const data = await res.json()
        setConfirmMsg(`❌ ${data.message}`)
      }
    } catch {
      setConfirmMsg('❌ Terjadi kesalahan jaringan.')
    } finally {
      setConfirming(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error || !order) return (
    <div className="text-center py-20">
      <p className="text-gray-500">{error}</p>
      <Link href="/orders" className="text-red-600 underline text-sm mt-2 block">Kembali</Link>
    </div>
  )

  const isPending   = order.status === 'PENDING'
  const isShipped   = order.status === 'SHIPPED'
  const isDelivered = order.status === 'DELIVERED'
  const isPaid      = order.status === 'PAID' || order.status === 'PROCESSING'
  const isTransfer  = ['bca','mandiri','bni'].includes(order.paymentMethod.toLowerCase())
  const isQRIS      = order.paymentMethod.toLowerCase() === 'qris'
  const isCOD       = order.paymentMethod.toLowerCase() === 'cod'
  const payInfo     = PAYMENT_INFO[order.paymentMethod.toLowerCase()]

  const dateStr = new Date(order.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 mb-6 transition-colors">
        <ArrowLeftIcon className="h-4 w-4" /> Kembali ke Pesanan
      </Link>

      {/* Header status */}
      <div className={`rounded-2xl p-5 mb-5 text-center ${isPending ? 'bg-yellow-50 border border-yellow-200' : isPaid ? 'bg-blue-50 border border-blue-200' : isDelivered ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
        <p className="text-xs font-bold text-gray-500 mb-1">NOMOR PESANAN</p>
        <p className="text-2xl font-black text-gray-900 mb-2">#{order.id}</p>
        <p className="text-xs text-gray-500">{dateStr}</p>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mt-3 ${
          isPending   ? 'bg-yellow-100 text-yellow-700' :
          isPaid      ? 'bg-blue-100   text-blue-700'   :
          isShipped   ? 'bg-indigo-100 text-indigo-700' :
          isDelivered ? 'bg-green-100  text-green-700'  :
          'bg-gray-100 text-gray-700'
        }`}>
          {isPending   ? 'Menunggu Pembayaran' :
           isPaid      ? 'Pembayaran Diterima — Sedang Diproses' :
           isShipped   ? 'Sedang Dikirim'      :
           isDelivered ? 'Pesanan Selesai'     :
           order.status}
        </div>
      </div>

      {/* Notifikasi konfirmasi */}
      {confirmMsg && (
        <div className={`rounded-xl p-4 mb-5 text-sm font-semibold ${confirmMsg.startsWith('✅') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {confirmMsg}
        </div>
      )}

      {/* ── INSTRUKSI PEMBAYARAN (PENDING) ── */}
      {isPending && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-4">
            <h2 className="text-white font-black flex items-center gap-2">
              <BanknotesIcon className="h-5 w-5" /> Instruksi Pembayaran
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <CountdownTimer createdAt={order.createdAt} />

            {/* Transfer Bank */}
            {isTransfer && payInfo && (
              <>
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Transfer ke</p>
                    <p className="font-black text-gray-900 text-xl">{payInfo.bank}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl font-black text-white text-lg ${payInfo.color}`}>
                    {payInfo.bank}
                  </div>
                </div>
                <div className="border-2 border-dashed border-red-200 rounded-xl p-4 bg-red-50">
                  <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl font-black text-gray-900 tracking-widest">{payInfo.noRek}</p>
                    <CopyButton text={payInfo.noRek.replace(/-/g, '')} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Atas nama: <span className="font-semibold text-gray-700">{payInfo.atasnama}</span></p>
                </div>
                <div className="border-2 border-dashed border-green-200 rounded-xl p-4 bg-green-50">
                  <p className="text-xs text-gray-500 mb-1">Jumlah Transfer</p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl font-black text-green-700">{formatRupiah(order.totalAmount)}</p>
                    <CopyButton text={String(order.totalAmount)} />
                  </div>
                  <p className="text-xs text-red-600 mt-1 font-semibold">⚠️ Transfer TEPAT sesuai nominal di atas</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                    <InformationCircleIcon className="h-4 w-4 text-blue-600" /> Cara Transfer
                  </p>
                  <ol className="space-y-2">
                    {TRANSFER_STEPS.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            )}

            {/* QRIS */}
            {isQRIS && (
              <div className="text-center space-y-3">
                <div className="bg-gray-50 rounded-2xl p-6 inline-block">
                  <div className="w-48 h-48 bg-white border-4 border-gray-200 rounded-xl mx-auto flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className={`w-12 h-12 rounded-sm ${[0,2,6,8].includes(i) ? 'bg-gray-900' : i === 4 ? 'bg-red-600' : 'bg-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">QR Code Pembayaran</p>
                </div>
                <p className="text-lg font-black text-gray-900">{formatRupiah(order.totalAmount)}</p>
              </div>
            )}

            {/* COD */}
            {isCOD && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="font-bold text-gray-900 mb-2">Bayar di Tempat (COD)</p>
                <p className="text-2xl font-black text-green-700">{formatRupiah(order.totalAmount)}</p>
                <p className="text-xs text-gray-500 mt-2">Siapkan uang tunai. Kurir akan menghubungi kamu sebelum pengiriman.</p>
              </div>
            )}

            {/* ── TOMBOL SAYA SUDAH BAYAR ── */}
            {!isCOD && (
              <button
                onClick={handleConfirmPayment}
                disabled={confirming}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-black py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
              >
                {confirming
                  ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <CheckCircleSolid className="h-5 w-5" />
                }
                {confirming ? 'Memproses...' : 'Saya Sudah Bayar'}
              </button>
            )}

            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-gray-900">Perlu Bantuan?</p>
                <p className="text-xs text-gray-500">Chat CS kami untuk konfirmasi pembayaran</p>
              </div>
              <Link href="/chat" className="bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors flex-shrink-0">
                Chat CS
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── PESANAN DIKIRIM — Tombol Konfirmasi Terima ── */}
      {isShipped && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <TruckIcon className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="font-black text-gray-900">Pesanan Sedang Dikirim</p>
              <p className="text-sm text-gray-500">Sudah menerima paket? Konfirmasi di sini.</p>
            </div>
          </div>
          <button
            onClick={handleConfirmReceived}
            disabled={confirming}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-black py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {confirming
              ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <CheckCircleSolid className="h-5 w-5" />
            }
            {confirming ? 'Memproses...' : 'Konfirmasi Pesanan Diterima'}
          </button>
        </div>
      )}

      {/* ── PESANAN SELESAI ── */}
      {isDelivered && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-5 text-center">
          <CheckCircleSolid className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="font-black text-green-800 text-lg">Pesanan Selesai!</p>
          <p className="text-sm text-green-600 mt-1">Terima kasih sudah berbelanja di AutoPart.</p>
          <Link href="/products" className="inline-block mt-4 bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors text-sm">
            Belanja Lagi
          </Link>
        </div>
      )}

      {/* ── SUDAH DIBAYAR / DIPROSES ── */}
      {isPaid && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-5 flex items-center gap-4">
          <CheckCircleSolid className="h-10 w-10 text-blue-500 flex-shrink-0" />
          <div>
            <p className="font-black text-blue-800">Pembayaran Dikonfirmasi</p>
            <p className="text-sm text-blue-600">Pesanan kamu sedang diproses oleh tim kami.</p>
          </div>
        </div>
      )}

      {/* Produk dipesan */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-black text-gray-900">Produk Dipesan</h3>
        </div>
        <div className="p-5 space-y-3">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.product.name}</p>
                <p className="text-xs text-gray-500">{item.quantity} pcs × {formatRupiah(item.price)}</p>
              </div>
              <p className="text-sm font-black text-gray-900 flex-shrink-0">{formatRupiah(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex justify-between items-center">
          <span className="font-black text-gray-900">Total</span>
          <span className="font-black text-xl text-red-600">{formatRupiah(order.totalAmount)}</span>
        </div>
      </div>

      {/* Alamat pengiriman */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <h3 className="font-black text-gray-900 mb-3">Alamat Pengiriman</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-semibold text-gray-900">{order.recipientName}</p>
          <p>{order.phone}</p>
          <p>{order.address}</p>
          <p>{order.city}, {order.province} {order.postalCode}</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3 text-sm text-gray-600">
        <ShieldCheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
        Semua produk bergaransi keaslian. Hubungi CS jika ada masalah dalam 3 hari setelah terima.
      </div>
    </div>
  )
}
