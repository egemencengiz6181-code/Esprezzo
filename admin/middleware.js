import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

/**
 * Tüm admin panel rotalarını korur.
 * - /login sayfası herkese açık
 * - Oturum açık + /login → dashboard'a yönlendir
 * - Oturum kapalı + diğer rotalar → /login'e yönlendir
 */
export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // ÖNEMLI: getUser() session'ı yeniler — bu satırı kaldırmayın
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Giriş sayfasına erişim — zaten oturum açıksa dashboard'a gönder
  if (pathname === '/login') {
    if (user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      return NextResponse.redirect(redirectUrl)
    }
    return supabaseResponse
  }

  // Diğer her rota için oturum zorunlu
  if (!user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Eşleştirme: Tüm rotalar,
     * şunlar HARİÇ: _next/static, _next/image, favicon, resimler
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
