import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 })
    }
    const contentType = request.headers.get('content-type') || ''
    let orderData: any = {}
    let orderItems: any[] = []
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      orderData  = JSON.parse(formData.get('order')!.toString())
      orderItems = JSON.parse(formData.get('order_detail')!.toString())
    } else {
      const body = await request.json()
      orderData  = body.order ?? body
      orderItems = body.order_detail ?? body.items ?? []
    }
    const totalAmount = orderItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const order = await prisma.order.create({
      data: {
        userId: parseInt(session.user.id),
        totalAmount: orderData.totalAmount ?? totalAmount,
        paymentMethod: orderData.paymentMethod ?? 'Transfer Bank',
        recipientName: orderData.recipientName ?? '',
        phone: orderData.phone ?? '',
        address: orderData.address ?? '',
        city: orderData.city ?? '',
        province: orderData.province ?? '',
        postalCode: orderData.postalCode ?? '',
        status: 'PENDING',
        items: { create: orderItems.map((item: any) => ({ productId: item.productId ?? item.product_id, quantity: item.quantity ?? item.qty, price: item.price ?? item.harga })) },
      },
    })
    return NextResponse.json({ success: true, message: 'Checkout berhasil', trans_id: order.id }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message ?? 'Terjadi kesalahan.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: 'Gunakan POST.' }, { status: 405 })
}
