// src/app/chat/page.tsx — Halaman Chat dengan Admin (tersambung ke database + auto-reply pintar)

'use client'
import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { PaperAirplaneIcon, ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'

interface ChatMessage {
  id: number
  sender: 'USER' | 'ADMIN'
  text: string
  createdAt: string
}

const QUICK_REPLIES = [
  'Apakah produk ini original?',
  'Berapa lama pengiriman?',
  'Bagaimana cara komplain barang?',
  'Apakah bisa COD?',
]

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatAdminPage() {
  const { data: session, status } = useSession()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Ambil riwayat chat saat halaman dibuka
  useEffect(() => {
    if (status !== 'authenticated') { setLoading(false); return }
    fetch('/api/chat')
      .then(res => res.ok ? res.json() : [])
      .then((data: ChatMessage[]) => setMessages(data))
      .finally(() => setLoading(false))
  }, [status])

  // Scroll hanya di dalam kotak chat, bukan seluruh halaman
  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages, sending])

  const [errorMsg, setErrorMsg] = useState('')

  const sendMessage = async (text: string) => {
    if (!text.trim() || sending) return
    setInput('')
    setSending(true)
    setErrorMsg('')

    // Optimistic UI — tampilkan pesan user dulu sebelum respons server
    const tempUserMsg: ChatMessage = {
      id: Date.now(),
      sender: 'USER',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, tempUserMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      })

      if (res.ok) {
        const { userMessage, adminMessage } = await res.json()
        // Ganti pesan sementara dengan data asli dari server + tambahkan balasan admin
        setMessages(prev => [
          ...prev.filter(m => m.id !== tempUserMsg.id),
          userMessage,
          adminMessage,
        ])
      } else {
        const errData = await res.json().catch(() => ({}))
        console.error('Chat API error:', res.status, errData)
        setErrorMsg(`Gagal mengirim pesan (${res.status}): ${errData.message || 'Terjadi kesalahan'}`)
        // Hapus pesan optimistic karena gagal
        setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id))
      }
    } catch (err) {
      console.error('Chat network error:', err)
      setErrorMsg('Gagal terhubung ke server. Cek koneksi atau coba lagi.')
      setMessages(prev => prev.filter(m => m.id !== tempUserMsg.id))
    } finally {
      setSending(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href="/" className="text-gray-500 hover:text-red-600 transition-colors">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-gray-900">Chat dengan Admin</h1>
          <p className="text-xs text-gray-500">Biasanya membalas dalam beberapa menit</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: '500px', maxHeight: '780px' }}>
        {/* Error banner */}
        {errorMsg && (
          <div className="bg-red-50 border-b border-red-100 px-4 py-2 text-xs text-red-600 flex items-center justify-between">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-600 font-bold">✕</button>
          </div>
        )}

        {/* Header admin */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheckIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">CS AutoPart</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Online
            </p>
          </div>
        </div>

        {/* Messages — scroll hanya di dalam box ini, bukan seluruh halaman */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-gray-100 text-gray-800">
                <p className="text-sm leading-relaxed">
                  Halo! Selamat datang di AutoPart 👋 Ada yang bisa kami bantu seputar sparepart mobil Anda?
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sender === 'USER'
                  ? 'bg-red-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'USER' ? 'text-red-100' : 'text-gray-400'}`}>
                  {formatTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick replies — hanya tampil di awal */}
        {messages.length === 0 && session && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
          className="flex items-center gap-2 px-4 py-3 border-t border-gray-100"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={session ? 'Tulis pesan...' : 'Login untuk mengirim pesan...'}
            disabled={!session || sending}
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!session || !input.trim() || sending}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors flex-shrink-0"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>

      {!session && (
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/login?callbackUrl=/chat" className="text-red-600 font-semibold hover:underline">
            Masuk
          </Link>{' '}
          untuk mulai chat dengan admin kami
        </p>
      )}
    </div>
  )
}
