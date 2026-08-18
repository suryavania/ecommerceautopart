// src/app/api/profile/route.ts — Update nama & email user

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })

  const { name, email } = await request.json()
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ message: 'Nama dan email wajib diisi.' }, { status: 400 })
  }

  // Cek apakah email sudah dipakai user lain
  const existing = await prisma.user.findFirst({
    where: { email: email.trim(), NOT: { id: parseInt(session.user.id) } },
  })
  if (existing) return NextResponse.json({ message: 'Email sudah digunakan akun lain.' }, { status: 409 })

  const updated = await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: { name: name.trim(), email: email.trim() },
    select: { id: true, name: true, email: true },
  })

  return NextResponse.json({ message: 'Profil berhasil diperbarui.', user: updated })
}
