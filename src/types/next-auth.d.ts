// Extend NextAuth types untuk menambahkan id & role
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id:   string
      role: string
    } & DefaultSession['user']
  }
}
