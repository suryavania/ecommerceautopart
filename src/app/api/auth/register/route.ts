import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    if (!name || !email || !password) return NextResponse.json({ message: 'Semua kolom wajib diisi.' }, { status: 400 })
    if (password.length < 6) return NextResponse.json({ message: 'Password minimal 6 karakter.' }, { status: 400 })

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ message: 'Email sudah terdaftar.' }, { status: 409 })

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'CUSTOMER' },
    })
    return NextResponse.json({ message: 'Akun berhasil dibuat.', userId: user.id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}
