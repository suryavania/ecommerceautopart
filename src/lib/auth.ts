// src/lib/auth.ts — Konfigurasi NextAuth

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error:  '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if (!passwordMatch) return null

        return {
          id:    String(user.id),
          name:  user.name,
          email: user.email,
          role:  user.role,
        }
      },
    }),
  ],
  callbacks: {
    // Setiap kali JWT di-refresh, ambil data terbaru dari database
    // Ini memastikan nama/email yang baru langsung sinkron di navbar & profil
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id   = user.id
        token.role = (user as any).role
      }

      // Kalau ada update session (dari profile edit), perbarui token
      if (trigger === 'update' && session) {
        token.name  = session.name  ?? token.name
        token.email = session.email ?? token.email
      }

      // Ambil data user terbaru dari DB setiap request (untuk sinkronisasi edit profil)
      if (token.id) {
        const freshUser = await prisma.user.findUnique({
          where:  { id: parseInt(token.id as string) },
          select: { name: true, email: true, role: true },
        })
        if (freshUser) {
          token.name  = freshUser.name
          token.email = freshUser.email
          token.role  = freshUser.role
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id    = token.id as string
        session.user.role  = token.role as string
        session.user.name  = token.name  as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
