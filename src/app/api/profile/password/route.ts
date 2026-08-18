// src/app/api/profile/password/route.ts — Ganti password

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })

  const { currentPassword, newPassword } = await request.json()
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: 'Semua kolom wajib diisi.' }, { status: 400 })
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ message: 'Password baru minimal 6 karakter.' }, { status: 400 })
  }

  // Ambil user dari database
  const user = await prisma.user.findUnique({ where: { id: parseInt(session.user.id) } })
  if (!user) return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 })

  // Verifikasi password lama
  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) return NextResponse.json({ message: 'Password saat ini tidak benar.' }, { status: 400 })

  // Hash password baru
  const hashed = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({
    where: { id: parseInt(session.user.id) },
    data: { password: hashed },
  })

  return NextResponse.json({ message: 'Password berhasil diubah.' })
}
