'use client'

import { useState } from 'react'
import AdminShell from '@/components/AdminShell'
import Modal from '@/components/Modal'
import { useToast } from '@/components/ToastProvider'
import { useAdminData } from '@/context/AdminDataContext'
import { createClient } from '@/lib/supabase/client'
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  AlertTriangle,
  Bold,
  Italic,
  Underline,
  List,
  Heading1,
  Link2,
  Quote,
  Clock,
  Tag,
  Hash,
  X,
  Search,
  BookOpen,
  FileText,
  Upload,
  Loader2,
} from 'lucide-react'

const BLOG_CATEGORIES = ['Kahve K\u00fclt\u00fcr\u00fc', 'Teknik', 'Barista', 'Haberler', 'Tarif']

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: BLOG_CATEGORIES[0],
  author: 'Admin',
  date: new Date().toISOString().split('T')[0],
  image: '',
  published: true,
  readingTime: '',
  tags: [],
}

function RichTextToolbar() {
  const tools = [
    { icon: Bold, title: 'Kal\u0131n' },
    { icon: Italic, title: '\u0130talik' },
    { icon: Underline, title: 'Alt\u0131 \u00c7izili' },
    { icon: Heading1, title: 'Ba\u015fl\u0131k' },
    { icon: List, title: 'Liste' },
    { icon: Quote, title: 'Al\u0131nt\u0131' },
    { icon: Link2, title: 'Ba\u011flant\u0131' },
  ]
  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50/50">
      {tools.map((tool) => {
        const Icon = tool.icon
        return (
          <button
            key={tool.title}
            type="button"
            title={tool.title}
            className="p-1.5 rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            <Icon size={15} />
          </button>
        )
      })}
    </div>
  )
}

function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const tag = input.trim()
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag])
    }
    setInput('')
  }

  const removeTag = (t) => onChange(tags.filter((x) => x !== t))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 min-h-[42px]">
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 bg-brand-50 text-brand-600 px-2 py-0.5 rounded-md text-xs font-medium">
          <Hash size={10} />
          {tag}
          <button onClick={() => removeTag(tag)} className="hover:text-brand-800 ml-0.5">
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? 'Etiket ekle (Enter ile)' : ''}
        className="flex-1 min-w-[100px] text-sm bg-transparent border-none outline-none"
      />
    </div>
  )
}

export default function BlogPage() {
  const { blog: posts, addPost, updatePost, deletePost, loading } = useAdminData()
  const [modalOpen, setModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editPost, setEditPost] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const toast = useToast()

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      post.title.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      (post.tags || []).some((t) => t.toLowerCase().includes(q))
    )
  })

  const publishedCount = posts.filter((p) => p.published).length
  const draftCount = posts.length - publishedCount

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\u011f\u00fc\u015f\u0131\u00f6\u00e7\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

  const openCreate = () => {
    setEditPost(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    setUploading(true)
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path)
      setForm((prev) => ({ ...prev, image: publicUrl }))
      toast('Görsel yüklendi.', 'success')
    } else {
      toast('Görsel yüklenemedi.', 'error')
    }
    setUploading(false)
  }

  const openEdit = (post) => {
    setEditPost(post)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      date: post.date,
      image: post.image,
      published: post.published,
      readingTime: post.readTime?.replace(' dk', '').trim() || '',
      tags: post.tags || [],
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast('Ba\u015fl\u0131k zorunludur.', 'error')
      return
    }
    const slug = form.slug || generateSlug(form.title)
    const postData = {
      title: form.title,
      slug,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      author: form.author,
      date: form.date,
      image: form.image,
      published: form.published,
      readTime: form.readingTime ? `${form.readingTime} dk` : '',
      tags: form.tags,
    }
    if (editPost) {
      const { error } = await updatePost(editPost.id, postData)
      if (error) { toast('G\u00fcncelleme ba\u015far\u0131s\u0131z.', 'error'); return }
      toast(`"${form.title}" g\u00fcncellendi.`, 'success')
    } else {
      const { error } = await addPost(postData)
      if (error) { toast('Yaz\u0131 eklenemedi.', 'error'); return }
      toast(`"${form.title}" eklendi.`, 'success')
    }
    setModalOpen(false)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    const { error } = await deletePost(deleteTarget.id)
    if (!error) toast(`"${deleteTarget.title}" silindi.`, 'info')
    setDeleteTarget(null)
  }

  const togglePublish = async (post) => {
    const { error } = await updatePost(post.id, { published: !post.published })
    if (!error) {
      toast(
        `"${post.title}" ${post.published ? 'yay\u0131ndan kald\u0131r\u0131ld\u0131' : 'yay\u0131nland\u0131'}.`,
        'success'
      )
    }
  }

  if (loading) return (
    <AdminShell>
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    </AdminShell>
  )

  return (
    <AdminShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Y\u00f6netimi</h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} yaz\u0131 &middot; {publishedCount} yay\u0131nda &middot; {draftCount} taslak
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm"
        >
          <Plus size={18} /> Yeni Yaz\u0131
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Toplam Yaz\u0131', value: posts.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Yay\u0131nda', value: publishedCount, icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Taslak', value: draftCount, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Kategori', value: [...new Set(posts.map((p) => p.category))].length, icon: Tag, color: 'text-purple-600', bg: 'bg-purple-50' },
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

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Yaz\u0131 ba\u015fl\u0131\u011f\u0131, kategori, yazar veya etiket ara..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Blog cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-40 bg-gray-100 relative overflow-hidden">
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={32} className="text-gray-300" />
                </div>
              )}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${
                    post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {post.published ? 'Yay\u0131nda' : 'Taslak'}
                </span>
              </div>
              {post.readTime && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                <span className="text-brand-500 font-semibold">{post.category}</span>
                <span>&middot;</span>
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.author}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">
                      <Hash size={8} /> {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-[10px] text-gray-400 px-1">+{post.tags.length - 3}</span>
                  )}
                </div>
              )}

              <p className="text-[10px] text-gray-300 font-mono truncate mb-3">/{post.slug}</p>

              <div className="flex items-center gap-1 border-t border-gray-100 pt-3">
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  title="D\u00fczenle"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => togglePublish(post)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  title={post.published ? 'Yay\u0131ndan Kald\u0131r' : 'Yay\u0131nla'}
                >
                  {post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button
                  onClick={() => setDeleteTarget(post)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Sil"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">
            <BookOpen size={32} className="mx-auto mb-2 text-gray-200" />
            Hen\u00fcz blog yaz\u0131s\u0131 yok veya arama sonucu bulunamad\u0131.
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editPost ? 'Yaz\u0131y\u0131 D\u00fczenle' : 'Yeni Blog Yaz\u0131s\u0131'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ba\u015fl\u0131k *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                const title = e.target.value
                setForm({
                  ...form,
                  title,
                  slug: !editPost ? generateSlug(title) : form.slug,
                })
              }}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
              placeholder="Yaz\u0131 ba\u015fl\u0131\u011f\u0131"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">SEO Slug (URL Yolu)</label>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 shrink-0">/blog/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50 font-mono text-xs"
                placeholder="otomatik-olusturulur"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Yazar</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                placeholder="Admin"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Yay\u0131n Tarihi</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                <Clock size={12} /> Okuma S\u00fcresi (dakika)
              </label>
              <input
                type="number"
                value={form.readingTime}
                onChange={(e) => setForm({ ...form, readingTime: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                placeholder="5"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Kapak Foto\u011fraf\u0131</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-gray-50/50"
                  placeholder="https://... veya sa\u011fdan y\u00fckle \u2192"
                />
                <label className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors shrink-0 ${
                  uploading ? 'border-gray-200 bg-gray-100 text-gray-400' : 'border-gray-200 bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-300'
                }`}>
                  {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                  {!uploading && 'Y\u00fckle'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              <Tag size={12} /> Etiketler
            </label>
            <TagInput tags={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">\u00d6zet</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none bg-gray-50/50"
              placeholder="K\u0131sa \u00f6zet..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">\u0130\u00e7erik</label>
            <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
              <RichTextToolbar />
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={8}
                className="w-full px-3 py-3 text-sm focus:outline-none resize-none"
                placeholder="Yaz\u0131n\u0131z\u0131 buraya yaz\u0131n..."
              />
            </div>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-gray-700">Yay\u0131nla</span>
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
              {editPost ? 'G\u00fcncelle' : 'Yay\u0131nla'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Yaz\u0131y\u0131 Sil">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <p className="text-gray-700 font-medium mb-1">
            &quot;{deleteTarget?.title}&quot; kal\u0131c\u0131 olarak silinecek.
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
