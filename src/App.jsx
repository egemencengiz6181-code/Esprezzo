import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import FranchisePage from './pages/FranchisePage'

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('noise-overlay')
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/franchise" element={<FranchisePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}
