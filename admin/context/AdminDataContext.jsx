'use client'

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

const AdminDataContext = createContext(null)

// ── DB satırı → uygulama şekli dönüştürücüler ──────────────
function mapProduct(row) {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    badge: row.badge,
    stock: row.stock,
    visible: row.visible,
    sort_order: row.sort_order,
  }
}

function mapPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    image: row.image,
    featured: row.featured,
    published: row.published,
    tags: row.tags ?? [],
  }
}

export function AdminDataProvider({ children }) {
  const supabase = useMemo(() => createClient(), [])

  const [products, setProducts] = useState([])
  const [blog, setBlog] = useState([])
  const [content, setContent] = useState({})
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  // ── İlk yükleme ──────────────────────────────────────────
  useEffect(() => {
    async function load() {
      const [
        { data: productsData },
        { data: blogData },
        { data: contentData },
        { data: settingsData },
      ] = await Promise.all([
        supabase.from('products').select('*').order('category').order('sort_order'),
        supabase.from('blog_posts').select('*').order('date', { ascending: false }),
        supabase.from('content').select('*'),
        supabase.from('settings').select('*'),
      ])

      setProducts((productsData ?? []).map(mapProduct))
      setBlog((blogData ?? []).map(mapPost))

      const contentObj = {}
      ;(contentData ?? []).forEach((row) => { contentObj[row.section] = row.data })
      setContent(contentObj)

      const settingsObj = {}
      ;(settingsData ?? []).forEach((row) => { settingsObj[row.section] = row.data })
      setSettings(settingsObj)

      setLoading(false)
    }
    load()
  }, [supabase])

  // ── Ürünler ──────────────────────────────────────────────
  const addProduct = useCallback(async (product) => {
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...product, sort_order: product.sort_order ?? 0 }])
      .select()
      .single()
    if (!error && data) setProducts((prev) => [...prev, mapProduct(data)])
    return { error }
  }, [supabase])

  const updateProduct = useCallback(async (id, updates) => {
    const { error } = await supabase.from('products').update(updates).eq('id', id)
    if (!error) setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
    return { error }
  }, [supabase])

  const deleteProduct = useCallback(async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) setProducts((prev) => prev.filter((p) => p.id !== id))
    return { error }
  }, [supabase])

  // ── Blog ─────────────────────────────────────────────────
  const addPost = useCallback(async (post) => {
    const { readTime, ...rest } = post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...rest, read_time: readTime ?? '' }])
      .select()
      .single()
    if (!error && data) setBlog((prev) => [mapPost(data), ...prev])
    return { error }
  }, [supabase])

  const updatePost = useCallback(async (id, updates) => {
    const dbUpdates = { ...updates }
    if ('readTime' in dbUpdates) {
      dbUpdates.read_time = dbUpdates.readTime
      delete dbUpdates.readTime
    }
    const { error } = await supabase.from('blog_posts').update(dbUpdates).eq('id', id)
    if (!error) setBlog((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
    return { error }
  }, [supabase])

  const deletePost = useCallback(async (id) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (!error) setBlog((prev) => prev.filter((p) => p.id !== id))
    return { error }
  }, [supabase])

  // ── İçerik (yerel state + açık kaydet) ───────────────────
  const updateContent = useCallback((section, key, value) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
  }, [])

  const updateContentArrayItem = useCallback((section, key, idx, value) => {
    setContent((prev) => {
      const arr = [...prev[section][key]]
      arr[idx] = value
      return { ...prev, [section]: { ...prev[section], [key]: arr } }
    })
  }, [])

  const addContentArrayItem = useCallback((section, key) => {
    setContent((prev) => {
      const arr = [...(prev[section][key] || []), '']
      return { ...prev, [section]: { ...prev[section], [key]: arr } }
    })
  }, [])

  const removeContentArrayItem = useCallback((section, key, idx) => {
    setContent((prev) => {
      const arr = prev[section][key].filter((_, i) => i !== idx)
      return { ...prev, [section]: { ...prev[section], [key]: arr } }
    })
  }, [])

  const saveContent = useCallback(async (section) => {
    const { error } = await supabase
      .from('content')
      .upsert({ section, data: content[section] }, { onConflict: 'section' })
    if (error) console.error('[saveContent] Supabase error:', error)
    return { error }
  }, [supabase, content])

  // ── Ayarlar (yerel state + açık kaydet) ──────────────────
  const updateSetting = useCallback((section, key, value) => {
    setSettings((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
  }, [])

  const saveSettings = useCallback(async (section) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ section, data: settings[section] }, { onConflict: 'section' })
    if (error) console.error('[saveSettings] Supabase error:', error)
    return { error }
  }, [supabase, settings])

  return (
    <AdminDataContext.Provider
      value={{
        loading,
        products,
        blog,
        content,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        addPost,
        updatePost,
        deletePost,
        updateContent,
        updateContentArrayItem,
        addContentArrayItem,
        removeContentArrayItem,
        saveContent,
        updateSetting,
        saveSettings,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData, AdminDataProvider içinde kullanılmalıdır.')
  return ctx
}
