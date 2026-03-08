import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const featured = [
  {
    id: 1,
    name: 'Signature Espresso',
    category: 'Espresso Bazlılar',
    description: 'Tek kökenli Etiyopya çekirdeği. Çikolatamsı gövde, narenciye finişi.',
    price: '₺95',
    badge: 'Şef Seçimi',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Pour Over V60',
    category: 'Filtre Kahveler',
    description: 'Kolombiya Geisha. Floral notalar, taze çilek ve ıhlamur çiçeği.',
    price: '₺130',
    badge: 'En Çok Satan',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Cold Brew Reserve',
    category: 'Soğuk İçecekler',
    description: '24 saat soğuk demleme. Kadifemsi doku, doğal tatlılık.',
    price: '₺140',
    badge: 'Yeni',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop',
  },
]

export default function HomeMenuPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-espresso-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso-dark via-espresso-black to-espresso-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-3"
            >
              Öne Çıkanlar
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="section-title"
            >
              Seçkin <span className="text-espresso-red italic">Menümüz</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/menu" className="btn-outline group flex items-center gap-2">
              Tüm Menüyü Gör
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group card-dark overflow-hidden cursor-default"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-espresso-red text-white text-[10px] tracking-widest uppercase font-sans font-semibold px-3 py-1">
                    {item.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-espresso-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="p-6">
                <p className="text-espresso-red text-[10px] tracking-widest uppercase font-sans mb-2">{item.category}</p>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-xl text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="font-serif text-espresso-red font-semibold whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-espresso-muted text-sm font-sans font-light leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Category quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12 pt-10 border-t border-espresso-border"
        >
          {['Espresso Bazlılar', 'Filtre Kahveler', 'Soğuk İçecekler', 'Tatlılar'].map((cat) => (
            <Link
              key={cat}
              to="/menu"
              className="px-5 py-2.5 border border-espresso-border text-espresso-muted hover:border-espresso-red hover:text-espresso-red text-xs tracking-[0.2em] uppercase font-sans font-medium transition-all duration-300"
            >
              {cat}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
