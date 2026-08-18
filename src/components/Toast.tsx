// src/components/Toast.tsx — Notifikasi pop-up

'use client'
import { useEffect, useState } from 'react'
import { CheckCircleIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300) }, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  const config = {
    success: { bg: 'bg-green-600', Icon: CheckCircleIcon },
    error:   { bg: 'bg-red-600',   Icon: ExclamationCircleIcon },
    info:    { bg: 'bg-blue-600',  Icon: CheckCircleIcon },
  }[type]

  return (
    <div className={`fixed bottom-6 right-6 z-[999] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`${config.bg} text-white flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl max-w-sm`}>
        <config.Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-semibold">{message}</p>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} className="ml-2 opacity-70 hover:opacity-100">
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
