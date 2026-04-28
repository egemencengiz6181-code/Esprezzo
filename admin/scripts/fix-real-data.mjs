/**
 * Supabase'deki settings ve content tablolarını
 * sitedeki gerçek verilerle günceller.
 * Kullanım: node admin/scripts/fix-real-data.mjs
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://eppogkvmatyjgjrhkprn.supabase.co'
const SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwcG9na3ZtYXR5amdqcmhrcHJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM4NzMwMiwiZXhwIjoyMDkyOTYzMzAyfQ.q9Tpllg1cyHyg0YAxvXRsrG5oXry_sizj82zLB0-9Dk'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

function check(label, error) {
  if (error) { console.error(`  ✗ ${label}:`, error.message); process.exit(1) }
  console.log(`  ✓ ${label}`)
}

async function run() {
  console.log('\n🔧 Gerçek veriler Supabase\'e yazılıyor...\n')

  // ── settings.contact ──────────────────────────────────────
  const { error: e1 } = await supabase.from('settings').upsert({
    section: 'contact',
    data: {
      email:          'merhaba@esprezzo.com.tr',
      phone:          '(0312) 750 03 85',
      whatsapp:       '+90 (312) 750 03 85',
      address:        'Odtü Fizik Bölümü\n06530 Çankaya/Ankara',
      googleMapsUrl:  'https://maps.google.com/?q=ODTU+Fizik+Bolumu+Ankara',
      instagramUrl:   '#',
      twitterUrl:     '#',
      facebookUrl:    '#',
      tiktokUrl:      '#',
    },
  }, { onConflict: 'section' })
  check('settings.contact güncellendi', e1)

  // ── settings.workingHours ────────────────────────────────
  const { error: e2 } = await supabase.from('settings').upsert({
    section: 'workingHours',
    data: {
      mondayFriday: '09:30 – 18:00',
      saturday:     'Kapalı',
      sunday:       'Kapalı',
      specialNote:  'Haftasonu kapalıyız. 09:30–18:00 arası hizmetinizdeyiz.',
    },
  }, { onConflict: 'section' })
  check('settings.workingHours güncellendi', e2)

  // ── settings.footer ──────────────────────────────────────
  const { error: e3 } = await supabase.from('settings').upsert({
    section: 'footer',
    data: {
      copyrightText:    '© 2026 Esprezzo. Tüm hakları saklıdır.',
      footerDescription:
        'Esprezzo — Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler. Her yudumda bir hikaye.',
      privacyPolicyUrl: '/gizlilik-politikasi',
      termsUrl:         '/kullanim-kosullari',
    },
  }, { onConflict: 'section' })
  check('settings.footer güncellendi', e3)

  // ── content.contact ──────────────────────────────────────
  const { error: e4 } = await supabase.from('content').upsert({
    section: 'contact',
    data: {
      title:    'Bize Ulaşın',
      subtitle: 'Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçin.',
      address:  'Odtü Fizik Bölümü\n06530 Çankaya/Ankara',
      email:    'merhaba@esprezzo.com.tr',
      phone:    '(0312) 750 03 85',
    },
  }, { onConflict: 'section' })
  check('content.contact güncellendi', e4)

  // ── content.about ────────────────────────────────────────
  const { error: e5 } = await supabase.from('content').upsert({
    section: 'about',
    data: {
      label:    'Biz kimiz?',
      title:    'Hikayemiz',
      subtitle: 'Kahveyle başlayan, tutkuyla büyüyen bir yolculuk.',
      paragraphs: [
        'Esprezzo, 2012 yılında kahveye olan derin tutkuyla doğdu. İtalyan espresso geleneğini modern bir dokunuşla harmanlayarak, her fincanı bir sanat eserine dönüştürüyoruz.',
        'Dünya\'nın en seçkin kahve bahçelerinden temin ettiğimiz organik çekirdekleri, uzman barista kadromuzla işleyerek misafirlerimize eşsiz bir lezzet sunuyoruz. Her detay, her sıcaklık, her tat — bilinçli bir tercih.',
        'Özenle seçilmiş tek kökenli çekirdekler, uzman barista ekibimiz ve sıcak atmosferimizle her ziyaretinizi özel kılıyoruz.',
      ],
    },
  }, { onConflict: 'section' })
  check('content.about güncellendi', e5)

  // ── content.hero ─────────────────────────────────────────
  const { error: e6 } = await supabase.from('content').upsert({
    section: 'hero',
    data: {
      title:      'PREMIUM Coffee EXPERIENCE',
      subtitle:   'Her yudumda mükemmellik. Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler.',
      buttonText: 'Menüyü Keşfet',
    },
  }, { onConflict: 'section' })
  check('content.hero güncellendi', e6)

  console.log('\n✅ Tüm gerçek veriler Supabase\'e yazıldı!\n')
}

run().catch((err) => { console.error('❌', err.message); process.exit(1) })
