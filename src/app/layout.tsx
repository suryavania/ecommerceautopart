// src/app/layout.tsx — Root Layout

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoPart — Toko Sparepart Mobil Terpercaya',
  description: 'Dapatkan suku cadang mobil berkualitas original dan aftermarket terpercaya dengan harga terbaik. Pengiriman cepat ke seluruh Indonesia.',
  keywords: 'sparepart mobil, onderdil, aki, oli mesin, kampas rem, filter, Semarang',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'AutoPart — Toko Sparepart Mobil Terpercaya',
    description: 'Sparepart mobil original & aftermarket berkualitas dengan harga terbaik.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen" suppressHydrationWarning>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
