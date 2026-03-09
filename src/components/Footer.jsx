import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react'

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X / Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
]

const quickLinks = [
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Menü', href: '/menu' },
  { label: 'Blog', href: '/blog' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'İletişim', href: '/iletisim' },
  { label: 'Kariyer', href: '#' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer id="footer" ref={ref} className="bg-espresso-dark border-t border-espresso-border">
      {/* Newsletter strip */}
      <div className="bg-espresso-red/10 border-b border-espresso-red/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <p className="font-serif text-2xl md:text-3xl text-espresso-ivory mb-2">
                Kahve dünyasından haberdar ol.
              </p>
              <p className="text-espresso-muted text-sm font-sans">
                Yeni ürünler, özel kampanyalar ve kahve kültürü makaleleri doğrudan gelen kutuna gelsin.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-3 text-espresso-red font-sans font-semibold">
                <Send size={18} />
                Abone oldunuz! Teşekkürler.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="bg-espresso-black border border-espresso-border border-r-0 text-espresso-ivory placeholder-espresso-muted font-sans text-sm px-5 py-4 w-full md:w-72 focus:outline-none focus:border-espresso-red transition-colors duration-300"
                  required
                />
                <button type="submit" className="btn-primary flex-shrink-0 py-4 px-6">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="mb-6">
              <img
                src="/logo/Esprezzo%20logo%20beyaz.png"
                alt="Esprezzo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-espresso-muted text-sm font-sans font-light leading-relaxed mb-8">
              2012'den bu yana kusursuz kahve deneyimi sunuyor, her fincanı özenle hazırlıyoruz.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-espresso-border hover:border-espresso-red flex items-center justify-center text-espresso-muted hover:text-espresso-red transition-all duration-300 group"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase font-sans font-semibold text-espresso-ivory mb-6">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-espresso-muted hover:text-espresso-red text-sm font-sans transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-espresso-red transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase font-sans font-semibold text-espresso-ivory mb-6">
              İletişim
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-espresso-muted text-sm font-sans">
                <MapPin size={16} className="text-espresso-red mt-0.5 flex-shrink-0" />
                <span>Odtü Fizik Bölümü<br />06530 Çankaya/Ankara</span>
              </li>
              <li>
                <a
                  href="tel:+903127500385"
                  className="flex items-center gap-3 text-espresso-muted hover:text-espresso-ivory text-sm font-sans transition-colors duration-300"
                >
                  <Phone size={16} className="text-espresso-red flex-shrink-0" />
                  (0312) 750 03 85
                </a>
              </li>
              <li>
                <a
                  href="mailto:merhaba@esprezzo.com.tr"
                  className="flex items-center gap-3 text-espresso-muted hover:text-espresso-ivory text-sm font-sans transition-colors duration-300"
                >
                  <Mail size={16} className="text-espresso-red flex-shrink-0" />
                  merhaba@esprezzo.com.tr
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase font-sans font-semibold text-espresso-ivory mb-6">
              Çalışma Saatleri
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              {[
                { day: 'Pazartesi – Cuma', hours: '09:30 – 18:00' },
                { day: 'Haftasonu', hours: 'Kapalı' },
              ].map(({ day, hours }) => (
                <li key={day} className="flex justify-between gap-4">
                  <span className="text-espresso-muted">{day}</span>
                  <span className="text-espresso-ivory font-medium">{hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 border border-espresso-red/20 bg-espresso-red/5">
              <p className="text-espresso-red text-xs tracking-wider uppercase font-sans font-semibold mb-1">
                Pazartesi – Cuma
              </p>
              <p className="text-espresso-muted text-xs font-sans">
                Haftasonu kapalıyız. 09:30–18:00 arası hizmetinizdeyiz.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-espresso-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-espresso-muted text-xs font-sans">
            © 2026 Esprezzo. Tüm hakları saklıdır. by{' '}
            <a
              href="https://reneedesignlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-espresso-ivory transition-colors duration-300 underline underline-offset-2"
            >
              Renee Designlab.
            </a>
          </p>
          <div className="flex gap-6">
            {['Gizlilik Politikası', 'Kullanım Koşulları', 'KVKK'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-espresso-muted hover:text-espresso-ivory text-xs font-sans transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
