'use client'

import { useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useToast } from '@/components/ToastProvider'
import {
  Save,
  ChevronDown,
  ChevronUp,
  Globe,
  Phone,
  Clock,
  FileText,
  Search as SearchIcon,
  Megaphone,
  Instagram,
  Twitter,
  Facebook,
  MapPin,
  Mail,
  Smartphone,
  Link2,
  Image as ImageIcon,
  Type,
  AlignLeft,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

import { useAdminData } from '@/context/AdminDataContext'

const SECTION_CONFIG = [
  {
    key: 'general',
    label: 'Genel Ayarlar',
    description: 'Site adı, slogan, açıklama ve logo ayarları',
    icon: Globe,
    color: 'text-blue-600 bg-blue-50',
    fields: [
      { key: 'siteName', label: 'Site Adı', type: 'text', placeholder: 'Esprezzo', icon: Type },
      { key: 'siteSlogan', label: 'Site Sloganı', type: 'text', placeholder: 'PREMIUM Coffee EXPERIENCE', icon: AlignLeft },
      { key: 'siteDescription', label: 'Site Açıklaması', type: 'textarea', placeholder: 'Sitenizin genel açıklaması...', icon: AlignLeft },
      { key: 'logoUrl', label: 'Logo URL', type: 'text', placeholder: '/logo/esprezzo-logo.svg', icon: ImageIcon },
      { key: 'faviconUrl', label: 'Favicon URL', type: 'text', placeholder: '/favicon.svg', icon: ImageIcon },
    ],
  },
  {
    key: 'contact',
    label: 'İletişim Bilgileri',
    description: 'E-posta, telefon, adres ve sosyal medya bağlantıları',
    icon: Phone,
    color: 'text-emerald-600 bg-emerald-50',
    fields: [
      { key: 'email', label: 'E-posta Adresi', type: 'email', placeholder: 'info@esprezzo.com', icon: Mail },
      { key: 'phone', label: 'Telefon Numarası', type: 'tel', placeholder: '+90 (212) 000 00 00', icon: Phone },
      { key: 'whatsapp', label: 'WhatsApp Numarası', type: 'tel', placeholder: '+90 (532) 000 00 00', icon: Smartphone },
      { key: 'address', label: 'Adres', type: 'textarea', placeholder: 'Bağdat Caddesi No:123, Kadıköy, İstanbul', icon: MapPin },
      { key: 'googleMapsUrl', label: 'Google Maps URL', type: 'url', placeholder: 'https://maps.google.com/...', icon: MapPin },
      { key: 'instagramUrl', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/esprezzo', icon: Instagram },
      { key: 'twitterUrl', label: 'Twitter / X URL', type: 'url', placeholder: 'https://twitter.com/esprezzo', icon: Twitter },
      { key: 'facebookUrl', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/esprezzo', icon: Facebook },
      { key: 'tiktokUrl', label: 'TikTok URL', type: 'url', placeholder: 'https://tiktok.com/@esprezzo', icon: Link2 },
    ],
  },
  {
    key: 'workingHours',
    label: 'Çalışma Saatleri',
    description: 'Haftalık çalışma saatleri ve özel notlar',
    icon: Clock,
    color: 'text-amber-600 bg-amber-50',
    fields: [
      { key: 'mondayFriday', label: 'Pazartesi – Cuma', type: 'text', placeholder: '08:00 – 23:00', icon: Clock },
      { key: 'saturday', label: 'Cumartesi', type: 'text', placeholder: '09:00 – 00:00', icon: Clock },
      { key: 'sunday', label: 'Pazar', type: 'text', placeholder: '09:00 – 22:00', icon: Clock },
      { key: 'specialNote', label: 'Özel Not', type: 'textarea', placeholder: 'Resmi tatillerde çalışma saatleri değişiklik gösterebilir.', icon: AlignLeft },
    ],
  },
  {
    key: 'footer',
    label: 'Footer Ayarları',
    description: 'Alt bilgi metinleri ve yasal bağlantılar',
    icon: FileText,
    color: 'text-purple-600 bg-purple-50',
    fields: [
      { key: 'copyrightText', label: 'Telif Hakkı Metni', type: 'text', placeholder: '© 2026 Esprezzo. Tüm hakları saklıdır.', icon: Type },
      { key: 'footerDescription', label: 'Footer Açıklama Metni', type: 'textarea', placeholder: 'Esprezzo — Özenle seçilmiş çekirdekler...', icon: AlignLeft },
      { key: 'privacyPolicyUrl', label: 'Gizlilik Politikası URL', type: 'text', placeholder: '/gizlilik-politikasi', icon: Link2 },
      { key: 'termsUrl', label: 'Kullanım Koşulları URL', type: 'text', placeholder: '/kullanim-kosullari', icon: Link2 },
    ],
  },
  {
    key: 'seo',
    label: 'SEO Ayarları',
    description: 'Meta başlık, açıklama ve Open Graph görseli',
    icon: SearchIcon,
    color: 'text-indigo-600 bg-indigo-50',
    fields: [
      { key: 'metaTitle', label: 'Meta Başlık (Title Tag)', type: 'text', placeholder: 'Esprezzo | Premium Coffee Experience', icon: Type },
      { key: 'metaDescription', label: 'Meta Açıklama (Description)', type: 'textarea', placeholder: 'Esprezzo — İstanbul\'un premium kahve deneyimi...', icon: AlignLeft },
      { key: 'ogImage', label: 'Open Graph Görseli URL', type: 'url', placeholder: 'https://...', icon: ImageIcon },
    ],
  },
  {
    key: 'announcement',
    label: 'Duyuru Bandı',
    description: 'Sitenin üstünde görünen duyuru alanı',
    icon: Megaphone,
    color: 'text-rose-600 bg-rose-50',
    fields: [
      { key: 'enabled', label: 'Duyuru Bandı Aktif', type: 'toggle', icon: ToggleLeft },
      { key: 'text', label: 'Duyuru Metni', type: 'text', placeholder: 'Yeni sezon menümüz yayında!', icon: Type },
      { key: 'linkText', label: 'Bağlantı Metni', type: 'text', placeholder: 'Menüyü Keşfet', icon: Link2 },
      { key: 'linkUrl', label: 'Bağlantı URL', type: 'text', placeholder: '/menu', icon: Link2 },
    ],
  },
]

export default function SettingsPage() {
  const { settings, updateSetting, saveSettings } = useAdminData()
  const [openSections, setOpenSections] = useState(['general'])
  const toast = useToast()

  const toggleSection = (key) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const update = (section, key, value) => {
    updateSetting(section, key, value)
  }

  const handleSave = async (sectionKey, sectionLabel) => {
    const { error } = await saveSettings(sectionKey)
    if (error) {
      toast(`"${sectionLabel}" kaydedilemedi.`, 'error')
    } else {
      toast(`"${sectionLabel}" ayarlar\u0131 kaydedildi.`, 'success')
    }
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Ayarları</h1>
        <p className="text-gray-500 text-sm mt-1">
          Sitenizin genel yapılandırmasını buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="space-y-3 max-w-4xl">
        {SECTION_CONFIG.map((section) => {
          const isOpen = openSections.includes(section.key)
          const Icon = section.icon
          return (
            <div key={section.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${section.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-gray-900 block">{section.label}</span>
                    <span className="text-xs text-gray-400">{section.description}</span>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
                  {section.fields.map((field) => {
                    const FieldIcon = field.icon
                    const value = settings[section.key]?.[field.key] ?? ''

                    if (field.type === 'toggle') {
                      return (
                        <div key={field.key} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FieldIcon size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">{field.label}</span>
                          </div>
                          <button
                            onClick={() => update(section.key, field.key, !value)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              value ? 'bg-brand-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                                value ? 'left-6' : 'left-1'
                              }`}
                            />
                          </button>
                        </div>
                      )
                    }

                    if (field.type === 'textarea') {
                      return (
                        <div key={field.key}>
                          <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                            <FieldIcon size={13} className="text-gray-400" />
                            {field.label}
                          </label>
                          <textarea
                            value={value}
                            onChange={(e) => update(section.key, field.key, e.target.value)}
                            rows={3}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none bg-gray-50/50"
                          />
                        </div>
                      )
                    }

                    return (
                      <div key={field.key}>
                        <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                          <FieldIcon size={13} className="text-gray-400" />
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={value}
                          onChange={(e) => update(section.key, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                        />
                      </div>
                    )
                  })}

                  <div className="flex justify-end pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleSave(section.key, section.label)}
                      className="inline-flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm"
                    >
                      <Save size={16} /> Kaydet
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </AdminShell>
  )
}
