// src/app/api/chat/route.ts — Ambil riwayat chat & kirim pesan baru

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAutoReply } from '@/lib/autoReply'

// GET — ambil seluruh riwayat chat milik user yang sedang login
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
  }

  const messages = await prisma.chatMessage.findMany({
    where: { userId: parseInt(session.user.id) },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(messages)
}

// POST — kirim pesan baru dari customer, lalu generate auto-reply dari "admin"
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
  }

  const { text } = await request.json()
  if (!text || !text.trim()) {
    return NextResponse.json({ message: 'Pesan tidak boleh kosong.' }, { status: 400 })
  }

  const userId = parseInt(session.user.id)

  // Simpan pesan dari user
  const userMessage = await prisma.chatMessage.create({
    data: { userId, sender: 'USER', text: text.trim() },
  })

  // Generate & simpan auto-reply dari admin
  const replyText = generateAutoReply(text)
  const adminMessage = await prisma.chatMessage.create({
    data: { userId, sender: 'ADMIN', text: replyText },
  })

  return NextResponse.json({ userMessage, adminMessage }, { status: 201 })
}
