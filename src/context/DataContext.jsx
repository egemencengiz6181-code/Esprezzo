import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [products, setProducts] = useState([])
  const [blog, setBlog] = useState([])
  const [content, setContent] = useState({})
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [
          { data: productsData, error: productsError },
          { data: blogData, error: blogError },
          { data: contentData, error: contentError },
          { data: settingsData, error: settingsError },
        ] = await Promise.all([
          supabase
            .from('products')
            .select('*')
            .eq('visible', true)
            .order('sort_order', { ascending: true }),
          supabase
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .order('date', { ascending: false }),
          supabase.from('content').select('*'),
          supabase.from('settings').select('*'),
        ])

        if (productsError) throw productsError
        if (blogError) throw blogError
        if (contentError) throw contentError
        if (settingsError) throw settingsError

        setProducts(productsData ?? [])

        // Map read_time (DB) → readTime (app)
        setBlog(
          (blogData ?? []).map((p) => ({
            ...p,
            readTime: p.read_time,
          }))
        )

        // Convert [{section, data}, ...] array → { section: data, ... } object
        const contentMap = {}
        ;(contentData ?? []).forEach(({ section, data }) => {
          contentMap[section] = data
        })
        setContent(contentMap)

        const settingsMap = {}
        ;(settingsData ?? []).forEach(({ section, data }) => {
          settingsMap[section] = data
        })
        setSettings(settingsMap)
      } catch (err) {
        console.error('DataContext: Supabase yükleme hatası', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <DataContext.Provider value={{ products, blog, content, settings, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}
