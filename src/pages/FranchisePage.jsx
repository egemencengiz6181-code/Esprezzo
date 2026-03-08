import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Package,
  Headphones,
  Award,
  MapPin,
  CheckCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Coffee,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react'
import PageHero from '../components/PageHero'

const IMAGE =
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=85&auto=format&fit=crop'

/* ─── Data ──────────────────────────────────────────────── */

const benefits = [
  {
    icon: Award,
    title: 'Güçlü Marka Değeri',
    desc: '12 yıllık köklü geçmiş, 28 uluslararası ödül ve bilinirliği her geçen gün artan premium bir marka çatısı altında olmanın avantajını yaşayın.',
  },
  {
    icon: Package,
    title: 'Eksiksiz Tedarik Zinciri',
    desc: 'Dünyadan seçkin çekirdekler, ekipman temini, ambalaj ve sarf malzemeleri — tüm tedarik sürecini merkezi olarak yönetiyoruz.',
  },
  {
    icon: Headphones,
    title: '7/24 Operasyonel Destek',
    desc: 'Açılıştan günlük operasyona; eğitim programlarından pazarlama materyallerine kadar her aşamada deneyimli ekibimiz yanınızda.',
  },
  {
    icon: TrendingUp,
    title: 'Kanıtlanmış İş Modeli',
    desc: 'Onlarca başarılı franchisee deneyimiyle olgunlaşmış, riskleri minimize edilmiş ve kârlılığı sınandırılmış bir iş modeline ortak olun.',
  },
  {
    icon: BarChart3,
    title: 'Dijital Yönetim Paneli',
    desc: 'Satış raporları, stok takibi, müşteri analitiği — tüm operasyonunuzu tek ekrandan gerçek zamanlı izleyin.',
  },
  {
    icon: Shield,
    title: 'Bölgesel Koruma',
    desc: 'Her franchisee\'ye özel bölgesel münhasırlık garantisi sunuyoruz. Kendi bölgenizde rakip Esprezzo noktası açılmaz.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Başvuru Formu',
    desc: 'Bu sayfadaki formu eksiksiz doldurun. Başvurunuz iş gününde değiştirme girişimlerine uğramadan doğrudan franchise ekibimize ulaşır.',
  },
  {
    num: '02',
    title: 'Ön Görüşme',
    desc: 'Franchise ekibimiz sizi arar; lokasyon, finansal beklenti ve karşılıklı hedeflerinizi 30 dakikalık bir videо görüşmesiyle ele alırız.',
  },
  {
    num: '03',
    title: 'Fizibilite & Onay',
    desc: 'Önerilen lokasyonu yerinde inceler, pazar analizini birlikte yapar ve yatırım getirisini modelleriz. Uygun görülen başvurular onay sürecine alınır.',
  },
  {
    num: '04',
    title: 'Sözleşme & Eğitim',
    desc: 'Sözleşme imzalanmasının ardından 3 haftalık kapsamlı eğitim programı başlar: barista eğitimi, operasyon yönetimi ve marka yönergeleri.',
  },
  {
    num: '05',
    title: 'Açılış & Büyüme',
    desc: 'Mağazanız açılış gününe hazır hale gelir. Açılış lansmanında yanınızdayız; ilk 6 ay boyunca yoğunlaştırılmış saha desteği sağlarız.',
  },
]

const faqs = [
  {
    q: 'Franchise bedeli ne kadar?',
    a: 'Franchise giriş bedeli 150.000 ₺ olup, buna ek olarak lokasyon büyüklüğüne göre değişen ekipman, tadilat ve işletme sermayesi kalemi yer almaktadır. Toplam yatırım tutarı 500.000 – 900.000 ₺ aralığında değişmektedir.',
  },
  {
    q: 'Kahve sektöründe deneyimim yoksa başvurabilir miyim?',
    a: 'Evet. Motivasyon, girişimcilik ruhu ve lokasyon kalitesi; sektör deneyiminden çok daha belirleyici kriterlerdir. Kapsamlı eğitim programımız sizi sıfırdan hazırlar.',
  },
  {
    q: 'Royalti oranı nedir?',
    a: 'Aylık cironun %5\'i royalti, %2\'si ulusal pazarlama fonuna aktarılır. Buna karşılık tüm merkezi pazarlama materyalleri, dijital kampanyalar ve marka değeri yatırımlarından faydalanırsınız.',
  },
  {
    q: 'Lokasyon seçiminde bana yardım ediliyor mu?',
    a: 'Kesinlikle. Franchisee\'lerimize lokasyon analizi, kira müzakeresi desteği ve tasarım rehberliği sunuyoruz. Kafenizin konumunun stratejik uygunluğunu birlikte değerlendiriyoruz.',
  },
  {
    q: 'Ne kadar sürede açılabilirim?',
    a: 'Başvurudan mağaza açılışına kadar ortalama 90 – 120 gün sürmektedir. Bu süre lokasyonun tadilat durumuna ve izin süreçlerine göre değişebilir.',
  },
]

const investmentItems = [
  { label: 'Franchise Giriş Bedeli', value: '150.000 ₺' },
  { label: 'Ekipman & Teçhizat', value: '180.000 – 280.000 ₺' },
  { label: 'Tadilat & Dekor', value: '120.000 – 350.000 ₺' },
  { label: 'İşletme Sermayesi', value: '50.000 – 120.000 ₺' },
  { label: 'Toplam Tahmini Yatırım', value: '500.000 – 900.000 ₺', highlight: true },
  { label: 'Tahmini Geri Dönüş Süresi', value: '24 – 36 Ay', highlight: true },
]

/* ─── Sub-components ─────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
})

function Section({ children, className = '', dark = false }) {
  return (
    <section className={`py-24 md:py-32 ${dark ? 'bg-espresso-dark' : 'bg-espresso-black'} relative overflow-hidden ${className}`}>
      {children}
    </section>
  )
}

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="border border-espresso-border group"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-serif text-lg text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300">
          {q}
        </span>
        <span className="flex-shrink-0 text-espresso-red">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-espresso-muted font-sans text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Page ──────────────────────────────────────────── */

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  city: '',
  location: '',
  budget: '',
  experience: '',
  motivation: '',
}

export default function FranchisePage() {
  const benefitsRef = useRef(null)
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-80px' })

  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-80px' })

  const investRef = useRef(null)
  const investInView = useInView(investRef, { once: true, margin: '-80px' })

  const [form, setForm] = useState(INITIAL_FORM)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Ad soyad zorunludur.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Geçerli bir e-posta girin.'
    if (!form.phone.trim()) newErrors.phone = 'Telefon numarası zorunludur.'
    if (!form.city.trim()) newErrors.city = 'Şehir zorunludur.'
    if (!form.budget) newErrors.budget = 'Lütfen bir seçenek belirtin.'
    if (!form.motivation.trim()) newErrors.motivation = 'Bu alan zorunludur.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSent(true)
  }

  const inputCls = (field) =>
    `w-full bg-espresso-black border ${
      errors[field] ? 'border-espresso-red-light' : 'border-espresso-border focus:border-espresso-red'
    } text-espresso-ivory placeholder-espresso-muted font-sans text-sm px-5 py-4 outline-none transition-colors duration-300`

  return (
    <>
      <PageHero
        label="İş Birliği Fırsatı"
        title="Franchise"
        subtitle="Esprezzo'yu kendi şehrinize taşıyın. Premium kahve deneyimini birlikte büyütelim."
        image={IMAGE}
        breadcrumb="Franchise"
      />

      {/* ── Intro strip ─────────────────────────────────────── */}
      <div className="bg-espresso-red/10 border-y border-espresso-red/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Coffee, value: '12+', label: 'Yıllık Deneyim' },
            { icon: Users, value: '40+', label: 'Aktif Franchisee' },
            { icon: Zap, value: '%87', label: 'Ortalama Memnuniyet' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon size={22} className="text-espresso-red" />
              <p className="font-serif text-3xl font-bold text-espresso-ivory">{value}</p>
              <p className="text-espresso-muted text-xs tracking-widest uppercase font-sans">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <Section dark>
        <div className="absolute top-0 right-0 w-96 h-96 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16" ref={benefitsRef}>
            <motion.p variants={fadeUp(0)} initial="hidden" animate={benefitsInView ? 'visible' : 'hidden'} className="section-label mb-4">
              Neden Esprezzo?
            </motion.p>
            <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={benefitsInView ? 'visible' : 'hidden'} className="section-title mb-5">
              Markayla gelen <span className="text-espresso-red italic">avantajlar</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={benefitsInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="divider-red mx-auto"
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.09 }}
                className="card-dark p-7 group"
              >
                <div className="w-12 h-12 border border-espresso-border group-hover:border-espresso-red flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={20} className="text-espresso-red" />
                </div>
                <h3 className="font-serif text-xl text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 mb-3">
                  {title}
                </h3>
                <p className="text-espresso-muted text-sm font-sans font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── How it works ─────────────────────────────────────── */}
      <Section>
        <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={stepsRef}>
          <div className="text-center mb-16">
            <motion.p variants={fadeUp(0)} initial="hidden" animate={stepsInView ? 'visible' : 'hidden'} className="section-label mb-4">
              Başvuru Süreci
            </motion.p>
            <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={stepsInView ? 'visible' : 'hidden'} className="section-title mb-5">
              5 adımda <span className="text-espresso-red italic">franchise sahibi</span> olun
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={stepsInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="divider-red mx-auto"
            />
          </div>

          <div className="relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-espresso-border" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {steps.map(({ num, title, desc }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-5">
                    <div className="w-20 h-20 border border-espresso-border group-hover:border-espresso-red bg-espresso-card flex flex-col items-center justify-center transition-colors duration-300 z-10 relative">
                      <span className="font-serif text-2xl font-bold text-espresso-red leading-none">{num}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 mb-2">
                    {title}
                  </h3>
                  <p className="text-espresso-muted text-xs font-sans leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Investment table ─────────────────────────────────── */}
      <Section dark>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-espresso-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12" ref={investRef}>
          <div className="text-center mb-14">
            <motion.p variants={fadeUp(0)} initial="hidden" animate={investInView ? 'visible' : 'hidden'} className="section-label mb-4">
              Yatırım Özeti
            </motion.p>
            <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={investInView ? 'visible' : 'hidden'} className="section-title mb-5">
              Finansal <span className="text-espresso-red italic">tablo</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={investInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="divider-red mx-auto mb-5"
            />
            <motion.p
              variants={fadeUp(0.4)}
              initial="hidden"
              animate={investInView ? 'visible' : 'hidden'}
              className="section-subtitle max-w-lg mx-auto"
            >
              Aşağıdaki rakamlar referans niteliğindedir. Kesin tutarlar lokasyon analizi sonrasında belirlenir.
            </motion.p>
          </div>

          <div className="card-dark overflow-hidden">
            {investmentItems.map(({ label, value, highlight }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`flex items-center justify-between px-8 py-5 border-b border-espresso-border last:border-0 ${
                  highlight ? 'bg-espresso-red/10' : 'hover:bg-espresso-black/40'
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-3">
                  {highlight ? (
                    <CheckCircle size={16} className="text-espresso-red flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 border border-espresso-border flex-shrink-0" />
                  )}
                  <span className={`font-sans text-sm ${highlight ? 'text-espresso-ivory font-semibold' : 'text-espresso-muted'}`}>
                    {label}
                  </span>
                </div>
                <span className={`font-serif text-lg font-semibold ${highlight ? 'text-espresso-red' : 'text-espresso-ivory'}`}>
                  {value}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-espresso-muted text-xs font-sans text-center mt-5 italic"
          >
            * Tüm fiyatlar KDV hariç olup 2026 yılı baz alınarak hazırlanmıştır. Güncel koşullar için başvurun.
          </motion.p>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-label mb-4"
            >
              Sık Sorulan Sorular
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mb-5"
            >
              Merak <span className="text-espresso-red italic">ettikleriniz</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="divider-red mx-auto"
            />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Application Form ─────────────────────────────────── */}
      <Section dark>
        <div className="absolute top-0 right-0 w-96 h-96 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-label mb-4"
            >
              Başvuru Formu
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mb-5"
            >
              Başvurunuzu <span className="text-espresso-red italic">yapın</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="divider-red mx-auto mb-5"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="section-subtitle max-w-md mx-auto"
            >
              Formu eksiksiz doldurun. Franchise ekibimiz 2 iş günü içinde sizinle iletişime geçecektir.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-dark p-8 md:p-12"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                <div className="w-20 h-20 border-2 border-espresso-red flex items-center justify-center">
                  <CheckCircle size={36} className="text-espresso-red" />
                </div>
                <h3 className="font-serif text-3xl text-espresso-ivory">Başvurunuz Alındı!</h3>
                <p className="text-espresso-muted font-sans text-sm max-w-sm leading-relaxed">
                  Franchise ekibimiz en geç 2 iş günü içinde kayıtlı e-posta adresinize dönüş yapacaktır.
                  Bu süreçte <span className="text-espresso-ivory">franchise@esprezzo.com.tr</span> adresine
                  de ulaşabilirsiniz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Row 1 – name + email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                      Ad Soyad <span className="text-espresso-red">*</span>
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Adınız ve soyadınız" className={inputCls('name')} />
                    {errors.name && <p className="text-espresso-red-light text-xs mt-1 font-sans">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                      E-posta <span className="text-espresso-red">*</span>
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ornek@eposta.com" className={inputCls('email')} />
                    {errors.email && <p className="text-espresso-red-light text-xs mt-1 font-sans">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2 – phone + city */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                      Telefon <span className="text-espresso-red">*</span>
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+90 5XX XXX XX XX" className={inputCls('phone')} />
                    {errors.phone && <p className="text-espresso-red-light text-xs mt-1 font-sans">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                      Şehir <span className="text-espresso-red">*</span>
                    </label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Başvurduğunuz şehir" className={inputCls('city')} />
                    {errors.city && <p className="text-espresso-red-light text-xs mt-1 font-sans">{errors.city}</p>}
                  </div>
                </div>

                {/* Row 3 – location */}
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                    Önerilen Lokasyon / Adres
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Varsa düşündüğünüz lokasyon veya semt"
                    className={inputCls('location')}
                  />
                </div>

                {/* Row 4 – budget + experience */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                      Yatırım Bütçesi <span className="text-espresso-red">*</span>
                    </label>
                    <select name="budget" value={form.budget} onChange={handleChange} className={`${inputCls('budget')} appearance-none cursor-pointer`}>
                      <option value="">Seçin</option>
                      <option value="500-700">500.000 – 700.000 ₺</option>
                      <option value="700-900">700.000 – 900.000 ₺</option>
                      <option value="900+">900.000 ₺ ve üzeri</option>
                    </select>
                    {errors.budget && <p className="text-espresso-red-light text-xs mt-1 font-sans">{errors.budget}</p>}
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                      Sektör Deneyimi
                    </label>
                    <select name="experience" value={form.experience} onChange={handleChange} className={`${inputCls('experience')} appearance-none cursor-pointer`}>
                      <option value="">Seçin</option>
                      <option value="none">Yok</option>
                      <option value="food-bev">Yiyecek & İçecek (1-3 yıl)</option>
                      <option value="food-bev-senior">Yiyecek & İçecek (3+ yıl)</option>
                      <option value="coffee">Kahve / Cafe Sektörü</option>
                      <option value="franchise">Franchise Deneyimi Var</option>
                    </select>
                  </div>
                </div>

                {/* Row 5 – motivation */}
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans text-espresso-muted mb-2">
                    Motivasyonunuz & Kısa Tanıtım <span className="text-espresso-red">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={form.motivation}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Neden Esprezzo franchise'ı almak istiyorsunuz? Kendinizi kısaca tanıtın ve hedeflerinizden bahsedin."
                    className={`${inputCls('motivation')} resize-none`}
                  />
                  {errors.motivation && <p className="text-espresso-red-light text-xs mt-1 font-sans">{errors.motivation}</p>}
                </div>

                {/* KVKK */}
                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" id="kvkk" required className="mt-1 accent-espresso-red w-4 h-4 flex-shrink-0 cursor-pointer" />
                  <label htmlFor="kvkk" className="text-espresso-muted text-xs font-sans leading-relaxed cursor-pointer">
                    Kişisel verilerimin Esprezzo tarafından franchise başvuru sürecinin değerlendirilmesi amacıyla işlenmesine{' '}
                    <span className="text-espresso-red hover:underline cursor-pointer">KVKK Aydınlatma Metni</span>{' '}
                    kapsamında onay veriyorum.
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full justify-center mt-2 py-5">
                  <Send size={16} />
                  Franchise Başvurusunu Gönder
                </button>
              </form>
            )}
          </motion.div>

          {/* Direct contact note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 pt-8 border-t border-espresso-border text-espresso-muted text-sm font-sans"
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-espresso-red flex-shrink-0" />
              <span>Doğrudan görüşme için:</span>
            </div>
            <a href="mailto:franchise@esprezzo.com.tr" className="text-espresso-ivory hover:text-espresso-red transition-colors duration-300 font-medium">
              franchise@esprezzo.com.tr
            </a>
            <a href="tel:+902161234568" className="text-espresso-ivory hover:text-espresso-red transition-colors duration-300 font-medium">
              +90 (216) 123 45 68
            </a>
          </motion.div>
        </div>
      </Section>
    </>
  )
}
