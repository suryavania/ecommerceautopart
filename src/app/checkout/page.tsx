// src/app/checkout/page.tsx — Halaman Checkout & Pembayaran

'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LockClosedIcon, CheckCircleIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { formatRupiah } from '@/lib/utils'
import { BCAIcon, MandiriIcon, BNIIcon, CODIcon, QRISIcon } from '@/components/PaymentIcons'

const PROVINCES = ['Aceh','Bali','Banten','Bengkulu','DI Yogyakarta','DKI Jakarta','Gorontalo','Jambi','Jawa Barat','Jawa Tengah','Jawa Timur','Kalimantan Barat','Kalimantan Selatan','Kalimantan Tengah','Kalimantan Timur','Kalimantan Utara','Kepulauan Bangka Belitung','Kepulauan Riau','Lampung','Maluku','Maluku Utara','Nusa Tenggara Barat','Nusa Tenggara Timur','Papua','Papua Barat','Riau','Sulawesi Barat','Sulawesi Selatan','Sulawesi Tengah','Sulawesi Tenggara','Sulawesi Utara','Sumatera Barat','Sumatera Selatan','Sumatera Utara']

const PAYMENT_METHODS = [
  { id: 'bca',     label: 'Transfer BCA',       Icon: BCAIcon,     rekening: '1234-5678-9012', atasnama: 'PT AutoPart Indonesia' },
  { id: 'mandiri', label: 'Transfer Mandiri',    Icon: MandiriIcon, rekening: '9876-5432-1098', atasnama: 'PT AutoPart Indonesia' },
  { id: 'bni',     label: 'Transfer BNI',        Icon: BNIIcon,     rekening: '1122-3344-5566', atasnama: 'PT AutoPart Indonesia' },
  { id: 'qris',    label: 'QRIS',               Icon: QRISIcon,    rekening: '',               atasnama: '' },
  { id: 'cod',     label: 'Bayar di Tempat (COD)', Icon: CODIcon,  rekening: '',               atasnama: '' },
]
const ONGKIR = 25000

export default function CheckoutPage() {
  const router  = useRouter()
  const { data: session } = useSession()
  const { items, totalPrice, clearCart } = useCartStore()

  const [step, setStep] = useState<1|2|3>(1)
  const [shipping, setShipping] = useState({
    recipientName: session?.user?.name || '',
    phone: '', address: '', city: '', province: '', postalCode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('bca')
  const [loading, setLoading] = useState(false)

  const subtotal = totalPrice()
  const ongkir   = subtotal >= 500000 ? 0 : ONGKIR
  const total    = subtotal + ongkir

  if (!session) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <LockClosedIcon className="h-16 w-16 text-gray-300 mb-4" />
      <h2 className="text-xl font-bold text-gray-700 mb-2">Login Diperlukan</h2>
      <p className="text-sm text-gray-500 mb-4">Silakan masuk untuk melanjutkan checkout.</p>
      <Link href="/login?callbackUrl=/checkout" className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors">
        Masuk Sekarang
      </Link>
    </div>
  )

  if (items.length === 0 && step !== 3) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-2xl mb-2">🛒</p>
      <p className="font-semibold text-gray-700">Keranjang kamu kosong.</p>
      <Link href="/products" className="text-red-600 underline text-sm mt-2">Mulai belanja</Link>
    </div>
  )

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.product.id, quantity: i.quantity, price: i.product.price })),
          totalAmount: total,
          paymentMethod,
          ...shipping,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        clearCart()
        router.push(`/orders/success?orderId=${data.orderId}`)
      } else alert(data.message || 'Gagal membuat pesanan.')
    } catch { alert('Terjadi kesalahan jaringan.') }
    finally { setLoading(false) }
  }

  // Stepper UI
  const steps = ['Pengiriman', 'Pembayaran', 'Konfirmasi']

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${step > i+1 ? 'bg-green-500 text-white' : step === i+1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > i+1 ? <CheckCircleIcon className="h-5 w-5" /> : i+1}
            </div>
            <span className={`ml-2 text-sm font-semibold ${step === i+1 ? 'text-red-600' : 'text-gray-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`mx-4 h-0.5 w-12 sm:w-24 ${step > i+1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* ─ STEP 1: PENGIRIMAN ─ */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <TruckIcon className="h-5 w-5 text-red-600" />
                <h2 className="font-black text-gray-900 text-lg">Detail Pengiriman</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'recipientName', label: 'Nama Penerima', placeholder: 'Nama lengkap penerima', col: 2 },
                  { key: 'phone',         label: 'No. Telepon',   placeholder: '08xxxxxxxxxx', col: 1 },
                  { key: 'city',          label: 'Kota/Kabupaten',placeholder: 'Jakarta Selatan', col: 1 },
                  { key: 'postalCode',    label: 'Kode Pos',      placeholder: '12345', col: 1 },
                ].map(({ key, label, placeholder, col }) => (
                  <div key={key} className={col === 2 ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                    <input
                      type={key === 'phone' ? 'tel' : 'text'}
                      value={(shipping as any)[key]}
                      onChange={e => setShipping(s => ({ ...s, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Provinsi</label>
                  <select value={shipping.province} onChange={e => setShipping(s => ({ ...s, province: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors bg-white">
                    <option value="">-- Pilih Provinsi --</option>
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat Lengkap</label>
                  <textarea value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} placeholder="Nama jalan, nomor, RT/RW, kelurahan, kecamatan..." rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors resize-none" required />
                </div>
              </div>
              <button
                onClick={() => {
                  if (!shipping.recipientName || !shipping.phone || !shipping.address || !shipping.city || !shipping.province || !shipping.postalCode) {
                    alert('Harap lengkapi semua data pengiriman.'); return
                  }
                  setStep(2)
                }}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Lanjut ke Pembayaran →
              </button>
            </div>
          )}

          {/* ─ STEP 2: PEMBAYARAN ─ */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCardIcon className="h-5 w-5 text-red-600" />
                <h2 className="font-black text-gray-900 text-lg">Metode Pembayaran</h2>
              </div>
              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map(pm => (
                  <label key={pm.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} className="accent-red-600 flex-shrink-0" />
                    {/* Logo bank sebagai SVG */}
                    <pm.Icon className="h-8 w-auto flex-shrink-0" />
                    <span className="font-semibold text-sm text-gray-800">{pm.label}</span>
                  </label>
                ))}
              </div>

              {/* Info rekening — tampil sesuai metode dipilih */}
              {(() => {
                const selected = PAYMENT_METHODS.find(p => p.id === paymentMethod)
                if (!selected) return null
                if (paymentMethod === 'cod') return (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800 mb-6">
                    <p className="font-semibold mb-1">Bayar di Tempat (COD)</p>
                    <p>Siapkan uang tunai sesuai total tagihan saat kurir tiba. Pastikan nomor telepon aktif untuk koordinasi pengiriman.</p>
                  </div>
                )
                if (paymentMethod === 'qris') return (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 mb-6">
                    <p className="font-semibold mb-1">Pembayaran via QRIS</p>
                    <p>QR Code akan dikirimkan melalui email/WhatsApp setelah pesanan dikonfirmasi. Scan menggunakan aplikasi bank atau dompet digital apapun.</p>
                  </div>
                )
                return (
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 mb-6">
                    <p className="font-semibold text-gray-800 mb-2">Informasi Transfer {selected.label}</p>
                    <div className="space-y-1">
                      <p>No. Rekening: <span className="font-mono font-bold text-gray-900">{selected.rekening}</span></p>
                      <p>Atas nama: <span className="font-bold text-gray-900">{selected.atasnama}</span></p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Pembayaran dikonfirmasi dalam 1x24 jam kerja</p>
                  </div>
                )
              })()}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors">
                  ← Kembali
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors">
                  Tinjau Pesanan →
                </button>
              </div>
            </div>
          )}

          {/* ─ STEP 3: KONFIRMASI ─ */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <h2 className="font-black text-gray-900 text-lg">Konfirmasi Pesanan</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <p className="font-bold text-gray-800">Alamat Pengiriman</p>
                </div>
                <p className="text-gray-700">{shipping.recipientName} — {shipping.phone}</p>
                <p className="text-gray-600">{shipping.address}, {shipping.city}, {shipping.province} {shipping.postalCode}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCardIcon className="h-4 w-4 text-gray-500" />
                  <p className="font-bold text-gray-800">Metode Pembayaran</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {(() => {
                    const pm = PAYMENT_METHODS.find(p => p.id === paymentMethod)
                    return pm ? (
                      <>
                        <pm.Icon className="h-7 w-auto" />
                        <span className="text-gray-700">{pm.label}</span>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
              <div className="space-y-3 mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <Image src={product.image} alt={product.name} width={48} height={48} className="rounded-lg bg-gray-50 object-contain p-1" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-500">{quantity} pcs × {formatRupiah(product.price)}</p>
                    </div>
                    <p className="text-sm font-black text-gray-900">{formatRupiah(product.price * quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors">
                  ← Kembali
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {loading ? 'Memproses...' : 'Bayar Sekarang'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ringkasan */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h3 className="font-black text-gray-900 mb-4">Ringkasan</h3>
            <div className="space-y-2 text-sm mb-4 max-h-48 overflow-y-auto scrollbar-hide">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-gray-600">
                  <span className="line-clamp-1 flex-1 pr-2">{product.name} ×{quantity}</span>
                  <span className="flex-shrink-0 font-medium">{formatRupiah(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span className="font-semibold">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkir</span>
                <span className={`font-semibold ${ongkir === 0 ? 'text-green-600' : ''}`}>{ongkir === 0 ? 'GRATIS' : formatRupiah(ongkir)}</span>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span><span className="text-red-600">{formatRupiah(total)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
              <LockClosedIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
              Transaksi diproteksi enkripsi SSL 256-bit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
