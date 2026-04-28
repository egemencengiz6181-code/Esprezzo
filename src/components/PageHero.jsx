import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ label, title, subtitle, image, breadcrumb, imagePosition = 'object-center' }) {
  return (
    <section className="relative h-72 md:h-96 flex items-end overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={image} alt={title} className={`w-full h-full object-cover ${imagePosition}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-14">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-white/50 text-xs font-sans tracking-widest uppercase mb-4"
        >
          <Link to="/" className="hover:text-espresso-red transition-colors duration-300">
            Ana Sayfa
          </Link>
          <ChevronRight size={12} />
          <span className="text-espresso-red">{breadcrumb}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-label mb-3"
        >
          {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl font-bold text-[#F5F0E8]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 font-sans mt-3 max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="divider-red mt-5"
        />
      </div>
    </section>
  )
}
