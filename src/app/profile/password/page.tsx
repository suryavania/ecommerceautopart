// src/app/profile/password/page.tsx — Ganti Password

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [form, setForm]         = useState({ current: '', newPass: '', confirm: '' })
  const [showPw, setShowPw]     = useState({ current: false, newPass: false, confirm: false })
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.newPass.length < 6) {
      setError('Password baru minimal 6 karakter.')
      return
    }
    if (form.newPass !== form.confirm) {
      setError('Konfirmasi password tidak cocok.')
      return
    }
    if (form.current === form.newPass) {
      setError('Password baru tidak boleh sama dengan password lama.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.newPass }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Gagal mengubah password.')
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/profile'), 2000)
      }
    } catch {
      setError('Terjadi kesalahan jaringan.')
    } finally {
      setLoading(false)
    }
  }

  const toggleShow = (field: keyof typeof showPw) => {
    setShowPw(s => ({ ...s, [field]: !s[field] }))
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="text-gray-500 hover:text-red-600 transition-colors">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-black text-gray-900">Ganti Password</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
            <LockClosedIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5" />
            Password berhasil diubah! Mengalihkan...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'current', label: 'Password Saat Ini',   placeholder: 'Masukkan password lama' },
            { key: 'newPass', label: 'Password Baru',        placeholder: 'Min. 6 karakter' },
            { key: 'confirm', label: 'Konfirmasi Password Baru', placeholder: 'Ulangi password baru' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
              <div className="relative">
                <input
                  type={showPw[key as keyof typeof showPw] ? 'text' : 'password'}
                  required
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => toggleShow(key as keyof typeof showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw[key as keyof typeof showPw]
                    ? <EyeSlashIcon className="h-5 w-5" />
                    : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <Link
              href="/profile"
              className="flex-1 text-center border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Menyimpan...' : 'Ubah Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
