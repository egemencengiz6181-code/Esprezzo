'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Coffee,
  FileText,
  BookOpen,
  Settings,
  PanelLeftClose,
  PanelLeft,
  LogOut,
} from 'lucide-react'

const navMain = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Menü Yönetimi', icon: Coffee },
  { href: '/content', label: 'Sayfa İçerikleri', icon: FileText },
  { href: '/blog', label: 'Blog Yönetimi', icon: BookOpen },
]

const navSettings = [
  { href: '/settings', label: 'Site Ayarları', icon: Settings },
]

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-gray-100 shrink-0">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shrink-0">
            <Coffee size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="ml-3 font-bold text-gray-900 text-lg tracking-tight">
              Esprezzo
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className={`text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2 ${collapsed ? 'text-center' : 'px-2'}`}>
            {collapsed ? '—' : 'Yönetim'}
          </div>
          {navMain.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className={active ? 'text-brand-500' : 'text-gray-400'} />
                {!collapsed && item.label}
              </Link>
            )
          })}

          <div className={`text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-5 mb-2 ${collapsed ? 'text-center' : 'px-2'}`}>
            {collapsed ? '—' : 'Ayarlar'}
          </div>
          {navSettings.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className={active ? 'text-brand-500' : 'text-gray-400'} />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-gray-100 px-3 py-3 hidden lg:block">
          <button
            onClick={onToggle}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors w-full"
          >
            {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            {!collapsed && 'Daralt'}
          </button>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 px-3 py-3">
          <button
            onClick={handleSignOut}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Çıkış Yap' : undefined}
          >
            <LogOut size={18} />
            {!collapsed && 'Çıkış Yap'}
          </button>
        </div>
      </aside>
    </>
  )
}
