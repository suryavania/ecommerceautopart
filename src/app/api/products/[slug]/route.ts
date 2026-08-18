import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } })
  if (!product) return NextResponse.json({ message: 'Produk tidak ditemukan.' }, { status: 404 })
  return NextResponse.json(product)
}
