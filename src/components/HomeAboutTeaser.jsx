import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop'

export default function HomeAboutTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
  })

  return (
    <section id="home-content" ref={ref} className="py-28 bg-espresso-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative overflow-hidden"
          >
            <motion.img
              src={IMAGE}
              alt="Esprezzo hikayesi"
              className="w-full h-[480px] object-cover"
              initial={{ scale: 1.08 }}
              animate={inView ? { scale: 1 } : { scale: 1.08 }}
              transition={{ duration: 1.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute -top-4 -left-4 w-28 h-28 border border-espresso-red/30 hidden md:block" />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -right-5 -bottom-5 card-dark p-5 w-40 hidden md:block"
            >
              <p className="font-serif text-3xl font-bold text-espresso-red">2012</p>
              <p className="text-espresso-muted text-[10px] tracking-widest uppercase font-sans mt-1">Kuruluş Yılı</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="space-y-6">
            <motion.p variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label">
              Hikayemiz
            </motion.p>
            <motion.h2 variants={fadeUp(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-title">
              Kahveyle<br /><span className="text-espresso-red italic">başlayan</span> bir tutku
            </motion.h2>
            <motion.div variants={fadeUp(0.25)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="divider-red" />
            <motion.p variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-subtitle">
              Esprezzo, 2012 yılında kahveye olan derin tutkuyla doğdu. İtalyan espresso geleneğini modern
              bir dokunuşla harmanlayarak her fincanı bir sanat eserine dönüştürüyoruz. Dünya'nın en seçkin
              kahve bahçelerinden temin ettiğimiz organik çekirdekler ve uzman barista kadromuz bir arada.
            </motion.p>
            <motion.blockquote
              variants={fadeUp(0.35)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="border-l-2 border-espresso-red pl-6 py-2"
            >
              <p className="font-serif text-xl italic text-espresso-ivory/80">
                "Bir fincan kahve, doğru ellerde dünyayı değiştirebilir."
              </p>
              <cite className="text-espresso-red text-xs tracking-widest uppercase font-sans mt-2 block not-italic">
                — Kurucu
              </cite>
            </motion.blockquote>
            <motion.div variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <Link to="/hakkimizda" className="btn-primary group">
                Hikayemizi Keşfet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
