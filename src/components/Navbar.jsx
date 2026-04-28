import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Menü', href: '/menu' },
  { label: 'Blog', href: '/blog' },
  { label: 'FRANCHISE', href: '/franchise' },
  { label: 'İletişim', href: '/iletisim' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (href) => location.pathname === href

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-espresso-black/95 backdrop-blur-md border-b border-espresso-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/logo/Esprezzo%20logo%20beyaz.png"
              alt="Esprezzo"
              className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs tracking-[0.2em] uppercase font-sans font-medium transition-colors duration-300 relative group ${
                  isActive(link.href)
                    ? 'text-espresso-red'
                    : !scrolled && isHome
                    ? 'text-white/75 hover:text-white'
                    : 'text-espresso-muted hover:text-espresso-ivory'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-espresso-red transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link to="/menu" className="btn-primary text-xs py-3 px-6">
              Menüyü İncele
            </Link>

            {/* Theme toggle */}
            <ThemeToggle transparent={!scrolled && isHome} />
          </nav>

          {/* Mobile hamburger + theme toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile theme toggle */}
            <ThemeToggle transparent={!scrolled && isHome} />
            <button
              className={!scrolled && isHome ? 'text-white' : 'text-espresso-ivory'}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-espresso-black/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.href}
                  className={`font-serif text-4xl transition-colors duration-300 ${
                    isActive(link.href)
                      ? 'text-espresso-red'
                      : 'text-espresso-ivory hover:text-espresso-red'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/menu" className="btn-primary mt-4">
                Menüyü İncele
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
