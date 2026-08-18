// src/app/api/orders/[id]/route.ts — Get & Update status pesanan

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — ambil detail satu order
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })

  const order = await prisma.order.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      items: { include: { product: { select: { name: true, image: true, slug: true } } } },
      user:  { select: { name: true, email: true } },
    },
  })

  if (!order) return NextResponse.json({ message: 'Pesanan tidak ditemukan.' }, { status: 404 })

  // Hanya pemilik order atau admin yang bisa lihat
  if (order.userId !== parseInt(session.user.id) && session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Forbidden.' }, { status: 403 })
  }

  return NextResponse.json(order)
}

// PATCH — update status pesanan
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })

  const { status } = await request.json()
  const VALID = ['PENDING','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED']
  if (!VALID.includes(status)) {
    return NextResponse.json({ message: 'Status tidak valid.' }, { status: 400 })
  }

  // Cek apakah order milik user ini atau dia admin
  const order = await prisma.order.findUnique({ where: { id: parseInt(params.id) } })
  if (!order) return NextResponse.json({ message: 'Pesanan tidak ditemukan.' }, { status: 404 })

  // Customer hanya boleh konfirmasi DELIVERED (pesanan diterima)
  // Admin boleh ubah ke status apapun
  if (session.user.role !== 'ADMIN') {
    if (order.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ message: 'Forbidden.' }, { status: 403 })
    }
    if (status !== 'DELIVERED') {
      return NextResponse.json({ message: 'Kamu hanya bisa konfirmasi penerimaan pesanan.' }, { status: 403 })
    }
    if (order.status !== 'SHIPPED') {
      return NextResponse.json({ message: 'Pesanan belum dalam status dikirim.' }, { status: 400 })
    }
  }

  const updated = await prisma.order.update({
    where: { id: parseInt(params.id) },
    data: {
      status,
      paidAt: status === 'PAID' ? new Date() : undefined,
    },
  })

  return NextResponse.json({ message: 'Status berhasil diperbarui.', order: updated })
}
