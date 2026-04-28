import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Coffee, Award, Leaf, Clock } from 'lucide-react'
import { useData } from '../context/DataContext'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&auto=format&fit=crop'

const stats = [
  { icon: Coffee, value: '12+', label: 'Yıllık Deneyim' },
  { icon: Award, value: '28', label: 'Uluslararası Ödül' },
  { icon: Leaf, value: '100%', label: 'Organik Çekirdek' },
  { icon: Clock, value: '7/24', label: 'Premium Hizmet' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { content } = useData()
  const about = content?.about ?? {}
  const paragraphs = about.paragraphs ?? [
    'Esprezzo, 2012 yılında kahveye olan derin tutkuyla doğdu. İtalyan espresso geleneğini modern bir dokunuu015fla harmanlayarak, her fincanı bir sanat eserine dönüştürüyoruz.',
    'Dünya’nın en seçkin kahve bahçelerinden temin ettiğimiz organik çekirdekleri, uzman barista kadromuzla işleyerek misafirlerimize eşsiz bir lezzet sunuyoruz. Her detay, her sıcaklık, her tat — bileşimli bir tercih.',
  ]

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 bg-espresso-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-espresso-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={ABOUT_IMAGE}
                alt="Kahve hazırlama sanatı"
                className="w-full h-[550px] object-cover"
                initial={{ scale: 1.1 }}
                animate={inView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-6 -bottom-6 card-dark p-6 w-44 hidden md:block"
            >
              <p className="font-serif text-4xl font-bold text-espresso-red leading-none">2012</p>
              <p className="text-espresso-muted text-xs tracking-widest uppercase font-sans mt-2">Kuruluş Yılı</p>
            </motion.div>

            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border border-espresso-red/30 hidden md:block" />
          </motion.div>

          {/* Text side */}
          <div className="space-y-8">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.1}
              className="section-label"
            >
              Hikayemiz
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.2}
              className="section-title"
            >
              Kahveyle<br />
              <span className="text-espresso-red italic">başlayan</span> bir tutku
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.3}
              className="divider-red"
            />

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.35}
              className="section-subtitle"
            >
              {paragraphs[0]}
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.4}
              className="section-subtitle"
            >
              {paragraphs[1]}
            </motion.p>

            <motion.blockquote
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.45}
              className="border-l-2 border-espresso-red pl-6 py-2"
            >
              <p className="font-serif text-xl italic text-espresso-ivory/80">
                "Bir fincan kahve, doğru ellerde dünyayı değiştirebilir."
              </p>
              <cite className="text-espresso-red text-xs tracking-widest uppercase font-sans mt-2 block not-italic">
                — Kurucu
              </cite>
            </motion.blockquote>

            <Link
              to="/menu"
              className="btn-primary"
            >
              Menüyü Keşfet
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pt-12 border-t border-espresso-border">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.5 + i * 0.1}
              className="text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border border-espresso-border group-hover:border-espresso-red flex items-center justify-center transition-colors duration-300">
                  <Icon size={20} className="text-espresso-red" />
                </div>
              </div>
              <p className="font-serif text-4xl font-bold text-espresso-ivory mb-1">{value}</p>
              <p className="text-espresso-muted text-xs tracking-widest uppercase font-sans">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
