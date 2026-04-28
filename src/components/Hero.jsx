import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { useData } from '../context/DataContext'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1800&q=85&auto=format&fit=crop'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const { content } = useData()
  const hero = content?.hero ?? {}
  const heroTitle = hero.title ?? 'PREMIUM Coffee EXPERIENCE'
  const heroSubtitle = hero.subtitle ?? 'Her yudumda kusursuzluk. Kahvenin ötesinde bir deneyim.'
  const heroButton = hero.buttonText ?? 'Menüyü Keşfet'

  const handleScroll = () =>
    document.querySelector('#home-content')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 scale-110"
      >
        <img
          src={HERO_IMAGE}
          alt="Premium espresso"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-espresso-red/40 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-espresso-border to-transparent hidden lg:block" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="section-label mb-6"
        >
          {heroTitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center mb-6"
        >
          <img
            src="/logo/Esprezzo%20logo%20beyaz.png"
            alt="Esprezzo"
            className="h-24 sm:h-28 md:h-32 lg:h-40 w-auto object-contain"
          />
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="w-24 h-px bg-espresso-red mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-white/70 font-sans font-light text-lg md:text-xl lg:text-2xl tracking-wide mb-12 max-w-xl mx-auto"
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/menu" className="btn-primary group">
            {heroButton}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link to="/hakkimizda" className="btn-outline">
            Hikayemiz
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/90 transition-colors duration-300 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Kaydır</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
