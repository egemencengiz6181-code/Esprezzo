import './globals.css'
import { AdminDataProvider } from '@/context/AdminDataContext'
import { ToastProvider } from '@/components/ToastProvider'
import AuthGuard from '@/components/AuthGuard'

export const metadata = {
  title: 'Esprezzo Admin',
  description: 'Esprezzo yönetim paneli',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AdminDataProvider>
          <ToastProvider>
            <AuthGuard>{children}</AuthGuard>
          </ToastProvider>
        </AdminDataProvider>
      </body>
    </html>
  )
}
