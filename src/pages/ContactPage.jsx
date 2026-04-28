import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Instagram, Twitter, Youtube, Facebook } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useData } from '../context/DataContext'

const IMAGE = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1800&q=85&auto=format&fit=crop'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
})

const staticSocials = [
  { icon: Instagram, label: 'Instagram', handle: '@esprezzo.coffee', key: 'instagramUrl' },
  { icon: Twitter, label: 'X / Twitter', handle: '@esprezzo', key: 'twitterUrl' },
  { icon: Youtube, label: 'YouTube', handle: 'Esprezzo TV', key: null },
  { icon: Facebook, label: 'Facebook', handle: 'Esprezzo Coffee', key: 'facebookUrl' },
]

export default function ContactPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const { settings } = useData()
  const sc = settings?.contact ?? {}
  const wh = settings?.workingHours ?? {}

  const contactItems = [
    { icon: MapPin, title: 'Adres', content: sc.address ?? '' },
    { icon: Phone, title: 'Telefon', content: sc.phone ?? '' },
    { icon: Mail, title: 'E-posta', content: sc.email ?? '' },
  ]
  const hours = [
    { day: 'Pazartesi – Cuma', hours: wh.mondayFriday ?? '' },
    { day: 'Cumartesi', hours: wh.saturday ?? '' },
    { day: 'Pazar', hours: wh.sunday ?? '' },
  ].filter((h) => h.hours)

  const socials = staticSocials.map((s) => ({
    ...s,
    href: s.key ? (sc[s.key] ?? '#') : '#',
  }))

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        label="Bize Ulaşın"
        title="İletişim"
        subtitle="Sorularınız, önerileriniz veya iş birliği teklifleriniz için buradayız."
        image={IMAGE}
        breadcrumb="İletişim"
      />

      <section ref={ref} className="py-28 bg-espresso-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-espresso-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left: Info */}
            <div className="space-y-10">
              <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                <p className="section-label mb-3">İletişim Bilgileri</p>
                <h2 className="section-title mb-5">
                  Sizden <span className="text-espresso-red italic">haber</span> almak isteriz
                </h2>
                <div className="divider-red mb-6" />
                <p className="section-subtitle">
                  Bir fincan kahve üzerine sohbet etmek, iş birliği kurmak ya da sadece ürünlerimiz
                  hakkında bilgi almak için bize ulaşabilirsiniz.
                </p>
              </motion.div>

              {/* Contact details */}
              <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-5">
                {contactItems.map(({ icon: Icon, title, content }) => (
                  <div key={title} className="flex items-start gap-4 p-5 card-dark group">
                    <div className="w-10 h-10 border border-espresso-border group-hover:border-espresso-red flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Icon size={18} className="text-espresso-red" />
                    </div>
                    <div>
                      <p className="text-espresso-muted text-xs tracking-widest uppercase font-sans mb-1">{title}</p>
                      <p className="text-espresso-ivory font-sans text-sm whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Hours */}
              <motion.div variants={fadeUp(0.25)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="card-dark p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Clock size={16} className="text-espresso-red" />
                  <p className="text-xs tracking-widest uppercase font-sans text-espresso-ivory font-semibold">Çalışma Saatleri</p>
                </div>
                <div className="space-y-3">
                  {hours.map(({ day, hours: h }) => (
                    <div key={day} className="flex justify-between text-sm font-sans border-b border-espresso-border pb-3 last:border-0 last:pb-0">
                      <span className="text-espresso-muted">{day}</span>
                      <span className="text-espresso-ivory font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeUp(0.35)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                <p className="text-xs tracking-[0.3em] uppercase font-sans font-semibold text-espresso-ivory mb-5">Sosyal Medya</p>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map(({ icon: Icon, label, href, handle }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 p-4 card-dark hover:border-espresso-red border border-espresso-border group transition-all duration-300"
                    >
                      <Icon size={18} className="text-espresso-red flex-shrink-0" />
                      <div>
                        <p className="text-espresso-ivory text-xs font-sans font-medium group-hover:text-espresso-red transition-colors duration-300">{label}</p>
                        <p className="text-espresso-muted text-[10px] font-sans">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <div className="card-dark p-8 md:p-10">
                <h3 className="font-serif text-2xl text-espresso-ivory mb-2">Mesaj Gönderin</h3>
                <p className="text-espresso-muted text-sm font-sans mb-8">24 saat içinde yanıt alacaksınız.</p>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <div className="w-16 h-16 border border-espresso-red flex items-center justify-center">
                      <Send size={24} className="text-espresso-red" />
                    </div>
                    <h4 className="font-serif text-2xl text-espresso-ivory">Teşekkürler!</h4>
                    <p className="text-espresso-muted font-sans text-sm max-w-xs">
                      Mesajınız alındı. En kısa sürede size dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { name: 'name', label: 'Ad Soyad', type: 'text', placeholder: 'Adınız ve soyadınız' },
                      { name: 'email', label: 'E-posta', type: 'email', placeholder: 'ornek@eposta.com' },
                      { name: 'subject', label: 'Konu', type: 'text', placeholder: 'Mesajınızın konusu' },
                    ].map(({ name, label, type, placeholder }) => (
                      <div key={name}>
                        <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          required
                          className="w-full bg-espresso-black border border-espresso-border focus:border-espresso-red text-espresso-ivory placeholder-espresso-muted font-sans text-sm px-5 py-4 outline-none transition-colors duration-300"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                        Mesaj
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Mesajınızı buraya yazın..."
                        required
                        rows={5}
                        className="w-full bg-espresso-black border border-espresso-border focus:border-espresso-red text-espresso-ivory placeholder-espresso-muted font-sans text-sm px-5 py-4 outline-none transition-colors duration-300 resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center mt-2">
                      <Send size={16} />
                      Gönder
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
