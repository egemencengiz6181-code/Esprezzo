import './globals.css'
import { AdminDataProvider } from '@/context/AdminDataContext'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata = {
  title: 'Esprezzo Admin',
  description: 'Esprezzo yönetim paneli',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AdminDataProvider>
          <ToastProvider>{children}</ToastProvider>
        </AdminDataProvider>
      </body>
    </html>
  )
}
