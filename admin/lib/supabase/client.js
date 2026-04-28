import { createBrowserClient } from '@supabase/ssr'

/**
 * Tarayıcı (Client Component) ortamında kullanılan Supabase istemcisi.
 * 'use client' direktifli bileşenlerde çağırın.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
