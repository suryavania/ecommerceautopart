import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })

  try {
    const body = await request.json()
    const { items, totalAmount, paymentMethod, recipientName, phone, address, city, province, postalCode } = body

    if (!items?.length) return NextResponse.json({ message: 'Tidak ada item pesanan.' }, { status: 400 })

    const order = await prisma.order.create({
      data: {
        userId:        parseInt(session.user.id),
        totalAmount,
        paymentMethod,
        recipientName, phone, address, city, province, postalCode,
        status:        'PENDING',
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity:  i.quantity,
            price:     i.price,
          })),
        },
      },
    })
    return NextResponse.json({ message: 'Pesanan berhasil dibuat.', orderId: order.id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}
