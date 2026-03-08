import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

/**
 * ThemeProvider – wraps the app and manages dark / light state globally.
 * Priority: 1) localStorage  2) OS preference  3) dark (default)
 */
export function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('esprezzo-theme')
    if (saved) return saved === 'light'
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: light)').matches
      : false
  })

  useEffect(() => {
    const root = document.documentElement

    // Add transition class so CSS smoothly animates every color property
    root.classList.add('theme-transitioning')

    if (isLight) {
      root.classList.add('light-mode')
      localStorage.setItem('esprezzo-theme', 'light')
    } else {
      root.classList.remove('light-mode')
      localStorage.setItem('esprezzo-theme', 'dark')
    }

    // Remove helper class after the transition finishes (350 ms + buffer)
    const timer = setTimeout(() => root.classList.remove('theme-transitioning'), 400)
    return () => clearTimeout(timer)
  }, [isLight])

  const toggleTheme = () => setIsLight((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/** useTheme — consume theme state anywhere in the tree */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
