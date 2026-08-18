// src/components/CategoryGrid.tsx — Grid kategori tanpa emoji, pakai SVG icon

'use client'
import Link from 'next/link'

// Icon SVG inline per kategori — lebih konsisten lintas platform
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  Pengapian: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Pelumas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  Pengereman: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </svg>
  ),
  Kelistrikan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <rect x="2" y="7" width="20" height="11" rx="2" />
      <path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v3M10 12h4" />
    </svg>
  ),
  Filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
  ),
  'Kaki-kaki': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  Eksterior: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16H6l-2-6 3-2h10l3 2-2 6h-1zM6 10l1-3h9l1 3" />
    </svg>
  ),
  Transmisi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
}

const CATEGORIES = [
  { name: 'Pengapian',   color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { name: 'Pelumas',     color: 'bg-blue-50   text-blue-700   border-blue-200'   },
  { name: 'Pengereman',  color: 'bg-red-50    text-red-700    border-red-200'    },
  { name: 'Kelistrikan', color: 'bg-green-50  text-green-700  border-green-200'  },
  { name: 'Filter',      color: 'bg-gray-50   text-gray-700   border-gray-200'   },
  { name: 'Kaki-kaki',   color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Eksterior',   color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Transmisi',   color: 'bg-teal-50   text-teal-700   border-teal-200'   },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
      {CATEGORIES.map(({ name, color }) => (
        <Link
          key={name}
          href={`/products?category=${encodeURIComponent(name)}`}
          className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 ${color} hover:scale-105 active:scale-95 transition-transform text-center`}
        >
          {CATEGORY_ICONS[name]}
          <span className="text-[10px] sm:text-[11px] font-bold leading-tight">{name}</span>
        </Link>
      ))}
    </div>
  )
}
