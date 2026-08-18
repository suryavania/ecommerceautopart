// src/components/SearchBar.tsx — Search bar standalone

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Props {
  placeholder?: string
  className?: string
  initialValue?: string
}

export default function SearchBar({ placeholder = 'Cari sparepart...', className = '', initialValue = '' }: Props) {
  const router = useRouter()
  const [q, setQ] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) router.push(`/products?q=${encodeURIComponent(q.trim())}`)
    else router.push('/products')
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors bg-white"
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
    </form>
  )
}
