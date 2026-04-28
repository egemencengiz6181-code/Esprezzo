/**
 * ESPREZZO — Supabase Migration Script
 * Tüm tabloları temizler ve orijinal statik veriyi Supabase'e aktarır.
 *
 * Kullanım:
 *   node --env-file=admin/.env.local admin/scripts/migrate.mjs
 *
 * Gerekli env değişkenleri (admin/.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import {
  initialProducts,
  initialBlog,
  initialContent,
  initialSettings,
} from '../data/initialData.js'

// ─── Supabase bağlantısı (service role — RLS bypass) ─────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('\n✗ Eksik env değişkenleri!')
  console.error('  admin/.env.local dosyasında NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlı olmalı.')
  console.error('  Çalıştırın: node --env-file=admin/.env.local admin/scripts/migrate.mjs\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// ─── Yardımcı ─────────────────────────────────────────────────────────────────
function check(label, error) {
  if (error) {
    console.error(`  ✗ ${label}:`, error.message)
    process.exit(1)
  }
  console.log(`  ✓ ${label}`)
}

// ─── Ana fonksiyon ────────────────────────────────────────────────────────────
async function migrate() {
  console.log('\n🚀 Esprezzo Migration başlıyor...\n')

  // ── 1. Tabloları temizle ──────────────────────────────────────────────────
  console.log('🗑  Tablolar temizleniyor...')

  const { error: ep } = await supabase.from('products').delete().not('id', 'is', null)
  check('products temizlendi', ep)

  const { error: eb } = await supabase.from('blog_posts').delete().not('id', 'is', null)
  check('blog_posts temizlendi', eb)

  const { error: ec } = await supabase.from('content').delete().not('section', 'is', null)
  check('content temizlendi', ec)

  const { error: es } = await supabase.from('settings').delete().not('section', 'is', null)
  check('settings temizlendi', es)

  // ── 2. Products ───────────────────────────────────────────────────────────
  console.log('\n📦 Ürünler yükleniyor...')

  const productsPayload = initialProducts.map((p, index) => ({
    category:   p.category,
    name:       p.name,
    description: p.description,
    price:      Number(p.price),
    image:      p.image ?? '',
    badge:      p.badge ?? '',
    stock:      p.stock ?? 'in-stock',
    visible:    p.visible !== false,
    sort_order: (index + 1) * 10,
  }))

  const { error: insertProducts } = await supabase.from('products').insert(productsPayload)
  check(`${productsPayload.length} ürün eklendi`, insertProducts)

  // ── 3. Blog Posts ─────────────────────────────────────────────────────────
  console.log('\n📝 Blog yazıları yükleniyor...')

  const blogPayload = initialBlog.map((p) => ({
    slug:      p.slug,
    category:  p.category ?? '',
    title:     p.title,
    excerpt:   p.excerpt ?? '',
    content:   p.content ?? p.body ?? '',
    author:    p.author ?? 'Admin',
    date:      p.date,
    read_time: p.readTime ?? p.read_time ?? '',
    image:     p.image ?? '',
    featured:  p.featured ?? false,
    published: p.published !== false,
    tags:      p.tags ?? [],
  }))

  const { error: insertBlog } = await supabase.from('blog_posts').insert(blogPayload)
  check(`${blogPayload.length} blog yazısı eklendi`, insertBlog)

  // ── 4. Content (Sayfa metinleri) ──────────────────────────────────────────
  console.log('\n📄 Sayfa içerikleri yükleniyor...')

  const contentPayload = Object.entries(initialContent).map(([section, data]) => ({
    section,
    data,
  }))

  const { error: insertContent } = await supabase.from('content').insert(contentPayload)
  check(`${contentPayload.length} içerik bölümü eklendi`, insertContent)

  // ── 5. Settings ───────────────────────────────────────────────────────────
  console.log('\n⚙️  Site ayarları yükleniyor...')

  const settingsPayload = Object.entries(initialSettings).map(([section, data]) => ({
    section,
    data,
  }))

  const { error: insertSettings } = await supabase.from('settings').insert(settingsPayload)
  check(`${settingsPayload.length} ayar bölümü eklendi`, insertSettings)

  // ── Özet ──────────────────────────────────────────────────────────────────
  console.log('\n✅ Migration tamamlandı!\n')
  console.log(`   Ürünler   : ${productsPayload.length}`)
  console.log(`   Blog      : ${blogPayload.length}`)
  console.log(`   İçerik    : ${contentPayload.length} bölüm`)
  console.log(`   Ayarlar   : ${settingsPayload.length} bölüm`)
  console.log('\n')
}

migrate().catch((err) => {
  console.error('\n❌ Migration başarısız:', err.message)
  process.exit(1)
})
