// src/components/TeamAvatar.tsx — Avatar anggota tim dengan fallback ke inisial

'use client'

import { useState } from 'react'
import Image from 'next/image'

type TeamAvatarProps = {
  name: string
  initial: string
  image?: string
}

export default function TeamAvatar({ name, initial, image }: TeamAvatarProps) {
  const [error, setError] = useState(false)

  // Kalau tidak ada path foto, atau fotonya gagal dimuat, tampilkan inisial
  if (!image || error) {
    return (
      <div className="w-20 h-20 rounded-full bg-red-100 ring-2 ring-red-100 flex items-center justify-center mx-auto mb-3">
        <span className="text-red-600 font-black text-lg">{initial}</span>
      </div>
    )
  }

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-red-100 relative mx-auto mb-3">
      <Image
        src={image}
        alt={name}
        fill
        sizes="80px"
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  )
}
