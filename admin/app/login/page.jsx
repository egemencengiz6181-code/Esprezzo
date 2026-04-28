'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Eye, EyeOff, Coffee, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#120c08] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Marka */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-2xl mb-4 shadow-lg shadow-amber-900/40">
            <Coffee className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Esprezzo</h1>
          <p className="text-amber-500/60 text-xs mt-1.5 tracking-[0.2em] uppercase font-medium">
            Admin Panel
          </p>
        </div>

        {/* Kart */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/40 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Giriş Yap</h2>
          <p className="text-gray-400 text-sm mb-6">
            Devam etmek için hesabınıza giriş yapın.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* E-posta */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@esprezzo.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                             bg-gray-50 transition-colors
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                             placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl text-sm
                             bg-gray-50 transition-colors
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                             placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Hata mesajı */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Gönder */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-amber-600 hover:bg-amber-700
                         disabled:opacity-60 disabled:cursor-not-allowed
                         text-white font-semibold rounded-xl transition-colors text-sm
                         focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş yapılıyor...
                </span>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © 2026 Esprezzo. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  )
}
