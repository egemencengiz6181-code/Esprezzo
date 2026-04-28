'use client'

import { useState, useMemo } from 'react'
import AdminShell from '@/components/AdminShell'
import Modal from '@/components/Modal'
import { useToast } from '@/components/ToastProvider'
import { useAdminData } from '@/context/AdminDataContext'
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Filter,
  Image as ImageIcon,
  X,
  AlertTriangle,
  Eye,
  EyeOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  CircleDot,
  CircleOff,
} from 'lucide-react'

const CATEGORIES = [
  'Originals',
  'Specialty',
  '3rd Wave',
  'Chocolate & Classics',
  'Iced Tea & Refreshers',
  'Frozen & Smoothies',
  'Milkshakes',
  'Herbal Tea',
  'Exclusive',
]

const STOCK_OPTIONS = [
  { value: 'in-stock', label: 'Stokta', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'low-stock', label: 'Az Stok', color: 'bg-amber-100 text-amber-700' },
  { value: 'out-of-stock', label: 'T\u00fckendi', color: 'bg-red-100 text-red-700' },
]

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: CATEGORIES[0],
  image: '',
  badge: '',
  stock: 'in-stock',
  visible: true,
}

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, loading } = useAdminData()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('T\u00fcm\u00fc')
  const [filterStock, setFilterStock] = useState('T\u00fcm\u00fc')
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const toast = useToast()

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (filterCat !== 'T\u00fcm\u00fc') list = list.filter((p) => p.category === filterCat)
    if (filterStock !== 'T\u00fcm\u00fc') list = list.filter((p) => p.stock === filterStock)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    if (sortField === 'price') {
      list.sort((a, b) => sortDir === 'asc' ? a.price - b.price : b.price - a.price)
    } else if (sortField === 'name') {
      list.sort((a, b) => sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
    }
    return list
  }, [products, search, filterCat, filterStock, sortField, sortDir])

  const openCreate = () => {
    setEditProduct(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (product) => {
    setEditProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      image: product.image,
      badge: product.badge || '',
      stock: product.stock || 'in-stock',
      visible: product.visible !== false,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) {
      toast('\u00dcr\u00fcn ad\u0131 ve fiyat zorunludur.', 'error')
      return
    }
    if (editProduct) {
      const { error } = await updateProduct(editProduct.id, {
        ...form,
        price: Number(form.price),
      })
      if (error) { toast('G\u00fcncelleme ba\u015far\u0131s\u0131z.', 'error'); return }
      toast(`"${form.name}" ba\u015far\u0131yla g\u00fcncellendi.`, 'success')
    } else {
      const { error } = await addProduct({
        ...form,
        price: Number(form.price),
      })
      if (error) { toast('\u00dcr\u00fcn eklenemedi.', 'error'); return }
      toast(`"${form.name}" ba\u015far\u0131yla eklendi.`, 'success')
    }
    setModalOpen(false)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    const { error } = await deleteProduct(deleteTarget.id)
    if (!error) toast(`"${deleteTarget.name}" silindi.`, 'info')
    setDeleteTarget(null)
  }

  const toggleVisibility = async (product) => {
    const { error } = await updateProduct(product.id, { visible: !product.visible })
    if (!error) {
      toast(
        `"${product.name}" ${product.visible ? 'gizlendi' : 'g\u00f6r\u00fcn\u00fcr yap\u0131ld\u0131'}.`,
        'success'
      )
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown size={13} className="text-gray-300" />
    return sortDir === 'asc' ? <ArrowUp size={13} className="text-brand-500" /> : <ArrowDown size={13} className="text-brand-500" />
  }

  const stockInfo = (s) => STOCK_OPTIONS.find((o) => o.value === s) || STOCK_OPTIONS[0]

  const activeCount = products.filter((p) => p.visible).length
  const outOfStockCount = products.filter((p) => p.stock === 'out-of-stock').length

  if (loading) return (
    <AdminShell>
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    </AdminShell>
  )

  return (
    <AdminShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Men\u00fc Y\u00f6netimi</h1>
          <p className="text-gray-500 text-sm mt-1">
            {products.length} \u00fcr\u00fcn &middot; {activeCount} aktif &middot; {outOfStockCount} t\u00fckendi
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm"
        >
          <Plus size={18} /> Yeni \u00dcr\u00fcn Ekle
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Toplam \u00dcr\u00fcn', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Aktif', value: activeCount, icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Gizli', value: products.length - activeCount, icon: EyeOff, color: 'text-gray-600', bg: 'bg-gray-50' },
          { label: 'T\u00fckenen', value: outOfStockCount, icon: CircleOff, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 flex items-center gap-3`}>
              <Icon size={18} className={s.color} />
              <div>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="\u00dcr\u00fcn ad\u0131, a\u00e7\u0131klama veya kategori ara..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-gray-400" />
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option>T\u00fcm\u00fc</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            <option value="T\u00fcm\u00fc">Stok: T\u00fcm\u00fc</option>
            {STOCK_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider w-14">G\u00f6rsel</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                  <button onClick={() => toggleSort('name')} className="inline-flex items-center gap-1 hover:text-gray-700 transition-colors">
                    \u00dcr\u00fcn <SortIcon field="name" />
                  </button>
                </th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden xl:table-cell">A\u00e7\u0131klama</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden sm:table-cell">Stok</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden sm:table-cell">Durum</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                  <button onClick={() => toggleSort('price')} className="inline-flex items-center gap-1 hover:text-gray-700 transition-colors ml-auto">
                    Fiyat <SortIcon field="price" />
                  </button>
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider w-32">\u0130\u015flemler</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((prod) => {
                const si = stockInfo(prod.stock)
                return (
                  <tr
                    key={prod.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${!prod.visible ? 'opacity-50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 ring-1 ring-gray-200">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={16} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{prod.name}</div>
                      {prod.badge && (
                        <span className="inline-block mt-0.5 text-[10px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                          {prod.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">{prod.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden xl:table-cell max-w-[220px] truncate text-xs">
                      {prod.description}
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide ${si.color}`}>
                        {si.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {prod.visible ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                          <CircleDot size={10} /> G\u00f6r\u00fcn\u00fcr
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400">
                          <CircleOff size={10} /> Gizli
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">\u20ba{prod.price}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          onClick={() => openEdit(prod)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="D\u00fczenle"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => toggleVisibility(prod)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                          title={prod.visible ? 'Gizle' : 'G\u00f6ster'}
                        >
                          {prod.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(prod)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-5 py-16 text-center text-gray-400">
                    <Package size={32} className="mx-auto mb-2 text-gray-200" />
                    Sonu\u00e7 bulunamad\u0131.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>{filtered.length} / {products.length} \u00fcr\u00fcn g\u00f6steriliyor</span>
          {(filterCat !== 'T\u00fcm\u00fc' || filterStock !== 'T\u00fcm\u00fc' || search) && (
            <button
              onClick={() => { setFilterCat('T\u00fcm\u00fc'); setFilterStock('T\u00fcm\u00fc'); setSearch('') }}
              className="text-brand-500 hover:text-brand-600 font-medium"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editProduct ? '\u00dcr\u00fcn\u00fc D\u00fczenle' : 'Yeni \u00dcr\u00fcn Ekle'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">\u00dcr\u00fcn Ad\u0131 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                placeholder="\u00d6r: Classical Mocha"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Fiyat (\u20ba) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                placeholder="90"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">A\u00e7\u0131klama / \u0130\u00e7erik</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none bg-gray-50/50"
              placeholder="\u00dcr\u00fcn\u00fcn detayl\u0131 a\u00e7\u0131klamas\u0131, i\u00e7erik bilgisi, alerjen notlar\u0131..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Stok Durumu</label>
              <select
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
              >
                {STOCK_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Rozet</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                placeholder="Yeni, \u0130mza, Exclusive"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">G\u00f6rsel URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
              placeholder="https://..."
            />
            {form.image && (
              <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden bg-gray-100 ring-1 ring-gray-200">
                <img src={form.image} alt="\u00d6nizleme" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.visible}
              onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-gray-700">Men\u00fcde g\u00f6r\u00fcn\u00fcr</span>
          </label>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              \u0130ptal
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-sm"
            >
              {editProduct ? 'G\u00fcncelle' : '\u00dcr\u00fcn\u00fc Ekle'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="\u00dcr\u00fcn\u00fc Sil">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <p className="text-gray-700 font-medium mb-1">
            &quot;{deleteTarget?.name}&quot; kal\u0131c\u0131 olarak silinecek.
          </p>
          <p className="text-sm text-gray-400 mb-6">Bu i\u015flem geri al\u0131namaz.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Vazge\u00e7
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-2.5 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
            >
              Evet, Sil
            </button>
          </div>
        </div>
      </Modal>
    </AdminShell>
  )
}
