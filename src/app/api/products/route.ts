import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q        = searchParams.get('q') || undefined
  const category = searchParams.get('category') || undefined

  const products = await prisma.product.findMany({
    where: {
      AND: [
        category ? { category } : {},
        q ? { OR: [{ name: { contains: q } }, { description: { contains: q } }] } : {},
      ],
    },
    orderBy: { id: 'asc' },
  })
  return NextResponse.json(products)
}
