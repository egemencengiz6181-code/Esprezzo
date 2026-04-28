import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useData } from '../context/DataContext'

const categories = [
  'Tümü',
  'Originals',
  'Specialty',
  '3rd Wave',
  'Chocolate & Classics',
  'Iced Tea & Refreshers',
  'Frozen & Smoothies',
  'Milkshakes',
  'Herbal Tea',
  'Exclusive',
]
function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-dark overflow-hidden flex flex-col cursor-default"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-espresso-black/0 group-hover:bg-espresso-black/20 transition-colors duration-500" />

        {product.badge && (
          <span className="absolute top-4 left-4 bg-espresso-red text-white text-[10px] tracking-widest uppercase font-sans font-semibold px-3 py-1">
            {product.badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-px bg-espresso-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 mb-2">
          {product.name}
        </h3>
        <p className="text-espresso-muted text-sm font-sans font-light leading-relaxed flex-1">
          {product.description}
        </p>
        {product.price && (
          <p className="mt-3 text-espresso-red font-sans font-semibold text-sm tracking-wide">
            {product.price} ₺
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const { products } = useData()
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
            Her içecek, her yuduma — özenle seçilmiş malzemeler ve ustalıkla hazırlanmış tarifler.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-[11px] tracking-[0.18em] uppercase font-sans font-medium transition-all duration-300 border ${
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
