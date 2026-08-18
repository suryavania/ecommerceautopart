// src/app/api/checkout/route.ts
// Endpoint khusus untuk testing via Postman dengan format form-data
// Menerima: order (JSON string) + order_detail (JSON string)
// Returns: { success, message, trans_id }

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Harap login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const contentType = request.headers.get('content-type') || ''

    let orderData: any = {}
    let orderItems: any[] = []

    // ── Terima format form-data (seperti di screenshot Postman) ──
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()

      const orderRaw       = formData.get('order')
      const orderDetailRaw = formData.get('order_detail')

      if (!orderRaw || !orderDetailRaw) {
        return NextResponse.json(
          { success: false, message: 'Field "order" dan "order_detail" wajib diisi.' },
          { status: 400 }
        )
      }

      orderData  = JSON.parse(orderRaw.toString())
      orderItems = JSON.parse(orderDetailRaw.toString())
    }
    // ── Terima format JSON biasa ──
    else if (contentType.includes('application/json')) {
      const body = await request.json()
      orderData  = body.order        ?? body
      orderItems = body.order_detail ?? body.items ?? []
    }

    // Validasi data
    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'order_detail tidak boleh kosong.' },
        { status: 400 }
      )
    }

    // Hitung total otomatis dari order_detail
    const totalAmount = orderItems.reduce(
      (sum: number, item: any) => sum + (item.price * item.quantity),
      0
    )

    // Simpan ke database
    const order = await prisma.order.create({
      data: {
        userId:        parseInt(session.user.id),
        totalAmount:   orderData.totalAmount ?? totalAmount,
        paymentMethod: orderData.paymentMethod ?? orderData.payment_method ?? 'Transfer Bank',
        recipientName: orderData.recipientName ?? orderData.nama_penerima   ?? session.user.name ?? '',
        phone:         orderData.phone         ?? orderData.telepon          ?? '',
        address:       orderData.address       ?? orderData.alamat           ?? '',
        city:          orderData.city          ?? orderData.kota             ?? '',
        province:      orderData.province      ?? orderData.provinsi         ?? '',
        postalCode:    orderData.postalCode     ?? orderData.kode_pos         ?? '',
        status:        'PENDING',
        items: {
          create: orderItems.map((item: any) => ({
            productId: item.productId ?? item.product_id,
            quantity:  item.quantity  ?? item.qty,
            price:     item.price     ?? item.harga,
          })),
        },
      },
    })

    return NextResponse.json({
      success:  true,
      message:  'Checkout berhasil',
      trans_id: order.id,
    }, { status: 200 })

  } catch (error: any) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { success: false, message: error.message ?? 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}

// GET — untuk test apakah endpoint aktif (seperti screenshot gambar 1)
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method GET tidak didukung. Gunakan POST.' },
    { status: 405 }
  )
}
