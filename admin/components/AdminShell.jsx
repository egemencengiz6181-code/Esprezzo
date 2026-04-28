'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { ToastProvider } from '@/components/ToastProvider'

export default function AdminShell({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => setCollapsed((p) => !p)

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f8f9fb]">
        <Sidebar collapsed={collapsed} onToggle={toggle} />

        <div
          className={`transition-all duration-300 ${
            collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
          }`}
        >
          <Topbar onMenuToggle={toggle} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  )
}
