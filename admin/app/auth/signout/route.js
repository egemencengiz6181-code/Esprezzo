import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const redirectUrl = new URL('/login', request.url)
  return NextResponse.redirect(redirectUrl, { status: 302 })
}
