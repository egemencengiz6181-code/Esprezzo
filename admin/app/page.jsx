'use client'

import AdminShell from '@/components/AdminShell'
import {
  Coffee,
  BookOpen,
  Eye,
  AlertTriangle,
  Settings,
  FileText,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import { useAdminData } from '@/context/AdminDataContext'

const shortcuts = [
  { label: 'Ürün Ekle', href: '/products', icon: Coffee, desc: 'Yeni menü ürünü oluştur' },
  { label: 'Blog Yaz', href: '/blog', icon: BookOpen, desc: 'Yeni blog yazısı ekle' },
  { label: 'İçerik Düzenle', href: '/content', icon: FileText, desc: 'Sayfa metinlerini güncelle' },
  { label: 'Site Ayarları', href: '/settings', icon: Settings, desc: 'Genel yapılandırma' },
]

export default function DashboardPage() {
  const { products, blog } = useAdminData()

  const activeProducts = products.filter((p) => p.visible !== false).length
  const hiddenProducts = products.length - activeProducts
  const outOfStock = products.filter((p) => p.stock === 'out-of-stock').length
  const lowStock = products.filter((p) => p.stock === 'low-stock').length
  const publishedBlogs = blog.filter((p) => p.published).length
  const draftBlogs = blog.length - publishedBlogs

  const stats = [
    {
      label: 'Toplam Ürün',
      value: products.length,
      sub: `${activeProducts} aktif`,
      icon: Coffee,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Aktif / Gizli',
      value: `${activeProducts} / ${hiddenProducts}`,
      sub: `${hiddenProducts} gizli ürün`,
      icon: Eye,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Blog Yazıları',
      value: blog.length,
      sub: `${publishedBlogs} yayında, ${draftBlogs} taslak`,
      icon: BookOpen,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Stok Uyarıları',
      value: outOfStock + lowStock,
      sub: `${outOfStock} tükendi, ${lowStock} azaldı`,
      icon: AlertTriangle,
      iconBg: outOfStock > 0 ? 'bg-red-100' : 'bg-gray-100',
      iconColor: outOfStock > 0 ? 'text-red-600' : 'text-gray-500',
    },
  ]

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hoş geldiniz! Sitenizin genel durumu aşağıda.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{s.label}</span>
                <span className={`p-2 rounded-xl ${s.iconBg}`}>
                  <Icon size={18} className={s.iconColor} />
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Hızlı Erişim */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Hızlı Erişim
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {shortcuts.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="p-2.5 bg-amber-50 rounded-xl">
                    <Icon size={20} className="text-amber-600" />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-300 group-hover:text-amber-500 transition-colors"
                  />
                </div>
                <p className="font-semibold text-gray-800 text-sm">{s.label}</p>
                <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Kategoriler */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-800">Kategoriye Göre Ürünler</h2>
            <span className="text-xs text-gray-400">{categories.length} kategori</span>
          </div>
          <div className="space-y-4">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length
              const pct = Math.round((count / products.length) * 100)
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{cat}</span>
                    <span className="text-gray-400 text-xs">{count} ürün</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stok Uyarıları */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={18} className="text-amber-500" />
            <h2 className="font-semibold text-gray-800">Stok Uyarıları</h2>
          </div>
          {outOfStock + lowStock === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Tüm ürünler stokta ✓</p>
          ) : (
            <div className="space-y-3">
              {products
                .filter((p) => p.stock === 'out-of-stock' || p.stock === 'low-stock')
                .map((prod) => (
                  <div key={prod.id} className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{prod.name}</p>
                      <span
                        className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full ${
                          prod.stock === 'out-of-stock'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-amber-100 text-amber-600'
                        }`}
                      >
                        {prod.stock === 'out-of-stock' ? 'Tükendi' : 'Az Stok'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Son Ürünler */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Son Eklenen Ürünler</h2>
          <Link
            href="/products"
            className="text-xs text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1"
          >
            Tümünü Gör <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {products
            .slice(-6)
            .reverse()
            .map((p) => (
              <div key={p.id} className="px-6 py-3 flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {p.price} ₺
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                    p.stock === 'out-of-stock'
                      ? 'bg-red-100 text-red-700'
                      : p.stock === 'low-stock'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {p.stock === 'out-of-stock'
                    ? 'Tükendi'
                    : p.stock === 'low-stock'
                    ? 'Az Stok'
                    : 'Stokta'}
                </span>
              </div>
            ))}
        </div>
      </div>
    </AdminShell>
  )
}
