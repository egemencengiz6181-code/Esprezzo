import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const categories = ['Tümü', 'Espresso Bazlılar', 'Filtre Kahveler', 'Soğuk İçecekler', 'Tatlılar']

const products = [
  // Espresso Bazlılar
  {
    id: 1,
    category: 'Espresso Bazlılar',
    name: 'Signature Espresso',
    description: 'Tek kökenli Etiyopya çekirdeği. Çikolatamsı gövde, narenciye finişi.',
    price: '₺95',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&auto=format&fit=crop',
    badge: 'Şef Seçimi',
  },
  {
    id: 2,
    category: 'Espresso Bazlılar',
    name: 'Flat White',
    description: 'Double ristretto + micro-foam süt. Klasiğin ötesinde bir denge.',
    price: '₺110',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Espresso Bazlılar',
    name: 'Cortado Negro',
    description: 'Eşit oranda espresso ve ısıtılmış süt. Yoğun, nüanslı.',
    price: '₺105',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop',
  },
  // Filtre Kahveler
  {
    id: 4,
    category: 'Filtre Kahveler',
    name: 'Pour Over V60',
    description: 'Kolombiya Geisha. Floral notalar, taze çilek ve ıhlamur çiçeği.',
    price: '₺130',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop',
    badge: 'En Çok Satan',
  },
  {
    id: 5,
    category: 'Filtre Kahveler',
    name: 'Chemex Blend',
    description: 'Orta kavrum Brezilya & Ruanda karışımı. Temiz, berrak, doyurucu.',
    price: '₺120',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    category: 'Filtre Kahveler',
    name: 'AeroPress Express',
    description: 'Hızlı demleme, yoğun lezzet. Yolcular için mükemmel.',
    price: '₺115',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop',
  },
  // Soğuk İçecekler
  {
    id: 7,
    category: 'Soğuk İçecekler',
    name: 'Cold Brew Reserve',
    description: '24 saat soğuk demleme. Kadifemsi doku, doğal tatlılık.',
    price: '₺140',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
  },
  {
    id: 8,
    category: 'Soğuk İçecekler',
    name: 'Nitro Espresso',
    description: 'Azot gazlı cold brew. Kremamsı köpük ve kadife dokunuş.',
    price: '₺155',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 9,
    category: 'Soğuk İçecekler',
    name: 'Espresso Tonic',
    description: 'Taze sıkılmış espresso + premium tonik. Zıtlıkların dansı.',
    price: '₺135',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop',
  },
  // Tatlılar
  {
    id: 10,
    category: 'Tatlılar',
    name: 'Kahve Tiramisu',
    description: 'Double espresso ıslatılmış savoiardi, maskarpone krem, bitter kakao.',
    price: '₺180',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop',
    badge: 'Şef Seçimi',
  },
  {
    id: 11,
    category: 'Tatlılar',
    name: 'Dark Chocolate Tart',
    description: '%72 bitter çikolata ganaj, fleur de sel ve bir yudum espresso.',
    price: '₺165',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 12,
    category: 'Tatlılar',
    name: 'Crème Brûlée',
    description: 'Vanilyalı flan, karamelize şeker kabuğu ve espresso serpiştirilmesi.',
    price: '₺170',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop',
  },
]

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-dark overflow-hidden flex flex-col cursor-default"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-espresso-black/0 group-hover:bg-espresso-black/30 transition-colors duration-500" />

        {product.badge && (
          <span className="absolute top-4 left-4 bg-espresso-red text-white text-[10px] tracking-widest uppercase font-sans font-semibold px-3 py-1">
            {product.badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-espresso-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-xl text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300">
            {product.name}
          </h3>
          <span className="font-serif text-espresso-red text-lg font-semibold whitespace-nowrap">
            {product.price}
          </span>
        </div>
        <p className="text-espresso-muted text-sm font-sans font-light leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="mt-5 pt-5 border-t border-espresso-border">
          <button className="text-espresso-muted hover:text-espresso-red text-xs tracking-[0.2em] uppercase font-sans font-medium transition-colors duration-300 flex items-center gap-2 group/btn">
            İncele
            <span className="w-0 group-hover/btn:w-6 h-px bg-espresso-red transition-all duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('Tümü')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'Tümü' ? products : products.filter((p) => p.category === active)

  return (
    <section id="menu" ref={ref} className="py-28 md:py-36 bg-espresso-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-black via-espresso-dark to-espresso-dark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-4"
          >
            Ürün Kataloğu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mb-4"
          >
            Seçkin <span className="text-espresso-red italic">Menümüz</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="divider-red mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-subtitle max-w-xl mx-auto"
          >
            Her içecek, her tatlı — özenle seçilmiş malzemeler ve ustalıkla hazırlanmış tarifler.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300 border ${
                active === cat
                  ? 'bg-espresso-red border-espresso-red text-white'
                  : 'border-espresso-border text-espresso-muted hover:border-espresso-red hover:text-espresso-red'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
