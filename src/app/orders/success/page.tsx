// src/app/orders/success/page.tsx — Auto redirect ke halaman instruksi pembayaran

'use client'
import { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

function SuccessContent() {
  const sp      = useSearchParams()
  const router  = useRouter()
  const orderId = sp.get('orderId')

  // Otomatis redirect ke halaman instruksi pembayaran setelah 1.5 detik
  useEffect(() => {
    if (orderId) {
      const timer = setTimeout(() => {
        router.replace(`/orders/${orderId}`)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [orderId, router])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Pesanan Berhasil!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Mengarahkan ke halaman instruksi pembayaran...
        </p>
        {/* Loading spinner */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          Mohon tunggu sebentar
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
