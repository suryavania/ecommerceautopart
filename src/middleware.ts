// src/middleware.ts — Proteksi route

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Admin-only routes
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        const protectedRoutes = ['/checkout', '/orders', '/admin', '/profile']
        if (protectedRoutes.some(r => pathname.startsWith(r))) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/admin/:path*', '/profile/:path*'],
}
