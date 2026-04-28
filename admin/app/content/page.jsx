'use client'

import { useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { useToast } from '@/components/ToastProvider'
import { useAdminData } from '@/context/AdminDataContext'
import { Save, ChevronDown, ChevronUp, Home, Users, Phone, Building2, Plus, Trash2 } from 'lucide-react'

const SECTION_CONFIG = [
  {
    key: 'hero',
    label: 'Ana Sayfa Hero',
    icon: Home,
    color: 'text-amber-600 bg-amber-50',
    fields: [
      { key: 'title', label: 'Hero Başlık', type: 'text', placeholder: 'PREMIUM Coffee EXPERIENCE' },
      { key: 'subtitle', label: 'Hero Alt Başlık', type: 'textarea', placeholder: 'Her yudumda mükemmellik...' },
      { key: 'buttonText', label: 'Buton Metni', type: 'text', placeholder: 'Menüyü Keşfet' },
    ],
  },
  {
    key: 'about',
    label: 'Hakkımızda',
    icon: Users,
    color: 'text-blue-600 bg-blue-50',
    fields: [
      { key: 'label', label: 'Etiket', type: 'text', placeholder: 'Biz kimiz?' },
      { key: 'title', label: 'Başlık', type: 'text', placeholder: 'Hikayemiz' },
      { key: 'subtitle', label: 'Alt Başlık', type: 'textarea', placeholder: 'Kahveyle başlayan bir yolculuk...' },
      { key: 'paragraphs', label: 'Paragraflar', type: 'array' },
    ],
  },
  {
    key: 'contact',
    label: 'İletişim',
    icon: Phone,
    color: 'text-emerald-600 bg-emerald-50',
    fields: [
      { key: 'title', label: 'Başlık', type: 'text', placeholder: 'Bize Ulaşın' },
      { key: 'subtitle', label: 'Alt Başlık', type: 'textarea', placeholder: 'Sorularınız için...' },
      { key: 'address', label: 'Adres', type: 'text', placeholder: 'Bağdat Caddesi No:123...' },
      { key: 'email', label: 'E-posta', type: 'text', placeholder: 'info@esprezzo.com' },
      { key: 'phone', label: 'Telefon', type: 'text', placeholder: '+90 (212) 000 00 00' },
    ],
  },
  {
    key: 'franchise',
    label: 'Franchise',
    icon: Building2,
    color: 'text-rose-600 bg-rose-50',
    fields: [
      { key: 'label', label: 'Etiket', type: 'text', placeholder: 'İş Birliği Fırsatı' },
      { key: 'title', label: 'Başlık', type: 'text', placeholder: 'Franchise Başvurusu' },
      { key: 'subtitle', label: 'Alt Başlık', type: 'textarea', placeholder: 'Formu eksiksiz doldurun...' },
    ],
  },
]

export default function ContentPage() {
  const { content, updateContent, updateContentArrayItem, addContentArrayItem, removeContentArrayItem, saveContent } =
    useAdminData()
  const [openSection, setOpenSection] = useState('hero')
  const toast = useToast()

  const toggleSection = (key) => setOpenSection((prev) => (prev === key ? null : key))

  const handleSave = async (sectionKey, label) => {
    const { error } = await saveContent(sectionKey)
    if (error) {
      toast(label + ' kaydedilemedi.', 'error')
    } else {
      toast(label + ' içeriği kaydedildi.', 'success')
    }
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sayfa İçerikleri</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hero, Hakkımızda, İletişim ve Franchise sayfalarındaki metinleri düzenleyin.
        </p>
      </div>

      <div className="space-y-3">
        {SECTION_CONFIG.map((section) => {
          const Icon = section.icon
          const isOpen = openSection === section.key
          const sectionData = content[section.key] || {}

          return (
            <div key={section.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Accordion header */}
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-xl ${section.color}`}>
                    <Icon size={18} />
                  </span>
                  <span className="font-semibold text-gray-800">{section.label}</span>
                </div>
                {isOpen ? (
                  <ChevronUp size={18} className="text-gray-400" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </button>

              {/* Accordion body */}
              {isOpen && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-5 space-y-5">
                    {section.fields.map((field) => {
                      if (field.type === 'array') {
                        const arr = sectionData[field.key] || []
                        return (
                          <div key={field.key}>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                              </label>
                              <button
                                type="button"
                                onClick={() => addContentArrayItem(section.key, field.key)}
                                className="inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-600 font-medium"
                              >
                                <Plus size={13} /> Paragraf Ekle
                              </button>
                            </div>
                            <div className="space-y-2">
                              {arr.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                  <textarea
                                    rows={3}
                                    value={item}
                                    onChange={(e) =>
                                      updateContentArrayItem(section.key, field.key, idx, e.target.value)
                                    }
                                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeContentArrayItem(section.key, field.key, idx)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              ))}
                              {arr.length === 0 && (
                                <p className="text-xs text-gray-400 italic">Henüz paragraf yok.</p>
                              )}
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            {field.label}
                          </label>
                          {field.type === 'textarea' ? (
                            <textarea
                              rows={3}
                              value={sectionData[field.key] || ''}
                              onChange={(e) =>
                                updateContent(section.key, field.key, e.target.value)
                              }
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={sectionData[field.key] || ''}
                              onChange={(e) =>
                                updateContent(section.key, field.key, e.target.value)
                              }
                              placeholder={field.placeholder}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                            />
                          )}
                        </div>
                      )
                    })}

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleSave(section.key, section.label)}
                        className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors"
                      >
                        <Save size={15} /> Kaydet
                      </button>
                    </div>
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
