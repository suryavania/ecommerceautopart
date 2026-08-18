// src/components/Logo.tsx — Logo AutoPart profesional

import Link from 'next/link'

interface Props {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ variant = 'dark', size = 'md' }: Props) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs' },
  }[size]

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'
  const subColor  = variant === 'light' ? 'text-white/60' : 'text-gray-400'

  return (
    <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
      {/* Icon — gear/roda gigi otomotif */}
      <div className={`${sizes.icon} relative flex-shrink-0`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background merah */}
          <rect width="40" height="40" rx="10" fill="#DC2626"/>
          {/* Gear shape */}
          <path d="M20 10.5C14.7 10.5 10.5 14.7 10.5 20C10.5 25.3 14.7 29.5 20 29.5C25.3 29.5 29.5 25.3 29.5 20C29.5 14.7 25.3 10.5 20 10.5Z" fill="white" opacity="0.15"/>
          {/* Huruf A dengan desain bold */}
          <text x="20" y="27" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="20" fill="white">A</text>
          {/* Garis bawah dekoratif */}
          <rect x="10" y="32" width="20" height="2.5" rx="1.25" fill="#FCA5A5"/>
        </svg>
      </div>

      {/* Teks */}
      <div className="flex flex-col leading-none">
        <div className={`${sizes.text} font-black tracking-tight leading-none`}>
          <span className="text-red-600">Auto</span>
          <span className={textColor}>Part</span>
        </div>
        <span className={`${sizes.sub} ${subColor} font-semibold tracking-widest uppercase mt-0.5`}>
          Sparepart Mobil
        </span>
      </div>
    </Link>
  )
}
