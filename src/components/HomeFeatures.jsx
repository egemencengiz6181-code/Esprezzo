import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        {/* Steam lines */}
        <motion.path
          d="M28 10 Q31 6 28 2"
          stroke="#C0392B"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
        />
        <motion.path
          d="M40 10 Q43 6 40 2"
          stroke="#C0392B"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
        />
        <motion.path
          d="M52 10 Q55 6 52 2"
          stroke="#C0392B"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
        />
        {/* Cup body */}
        <path
          d="M18 18 L22 60 H58 L62 18 Z"
          stroke="#D4AF6A"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Handle */}
        <path
          d="M62 28 Q76 28 76 40 Q76 52 62 52"
          stroke="#D4AF6A"
          strokeWidth="2"
          fill="none"
        />
        {/* Saucer */}
        <ellipse cx="40" cy="62" rx="26" ry="5" stroke="#D4AF6A" strokeWidth="2" fill="none" />
        {/* Coffee surface */}
        <path d="M22 26 Q40 32 58 26" stroke="#D4AF6A" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
    ),
    title: 'Günün Her Anında',
    desc: 'Her yeni başlayan güne uyanırken ya da sohbeti koyulaştırırken vazgeçilmez bir dost…',
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        {/* Steam */}
        <motion.path
          d="M40 8 Q44 4 40 0"
          stroke="#C0392B"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
        />
        {/* Cezve spout */}
        <path d="M40 12 L48 10 Q58 10 56 20 L52 22" stroke="#D4AF6A" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Cezve body */}
        <path
          d="M20 22 Q18 48 24 58 Q32 68 48 68 Q64 68 58 58 Q62 48 60 22 Z"
          stroke="#D4AF6A"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Handle */}
        <path d="M20 22 L12 18 Q6 18 8 26 Q8 34 18 34 L20 34" stroke="#D4AF6A" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Rim */}
        <path d="M22 22 Q40 16 58 22" stroke="#D4AF6A" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Coffee surface */}
        <path d="M24 32 Q40 38 56 32" stroke="#D4AF6A" strokeWidth="1.2" fill="none" opacity="0.5" />
      </svg>
    ),
    title: 'Keyifli Bir Mola',
    desc: 'Bir fincanı keyifse daha fazlası mutluluk… Ara vermenin en lezzetli hali.',
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        {/* Grinder top hopper */}
        <path d="M28 4 L52 4 L56 22 L24 22 Z" stroke="#D4AF6A" strokeWidth="2" fill="none" strokeLinejoin="round" />
        {/* Grinder lid */}
        <rect x="24" y="1" width="32" height="6" rx="2" stroke="#D4AF6A" strokeWidth="1.8" fill="none" />
        {/* Grinder body */}
        <rect x="20" y="22" width="40" height="36" rx="2" stroke="#D4AF6A" strokeWidth="2" fill="none" />
        {/* Drawer */}
        <rect x="24" y="58" width="32" height="18" rx="1" stroke="#D4AF6A" strokeWidth="2" fill="none" />
        {/* Drawer handle */}
        <path d="M36 66 L44 66" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Crank handle */}
        <path d="M60 30 L70 30 L70 38" stroke="#D4AF6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <motion.circle
          cx="70"
          cy="38"
          r="3"
          stroke="#C0392B"
          strokeWidth="2"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '60px 30px' }}
        />
        {/* Grind lines inside body */}
        <line x1="30" y1="32" x2="30" y2="50" stroke="#D4AF6A" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="30" x2="40" y2="52" stroke="#D4AF6A" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="32" x2="50" y2="50" stroke="#D4AF6A" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    title: 'Evde ve İş Yerinde',
    desc: 'Her zaman taze kalmasını sağlayan vakumlu, hijyenik paketlerde kapınıza geliyor.',
  },
]

export default function HomeFeatures() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative bg-espresso-black overflow-hidden">
      {/* Top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-espresso-red/60 to-transparent" />

      {/* Subtle radial glow center */}
      <div className="absolute inset-0 bg-gradient-radial from-espresso-red/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-espresso-border">
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: i * 0.18,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col items-center text-center px-8 md:px-12 py-10 group"
            >
              {/* Icon container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.18 + 0.2 }}
                className="relative mb-8"
              >
                {/* Glow ring behind icon */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-espresso-red/10 blur-xl"
                />
                {icon}
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.18 + 0.4 }}
                className="w-8 h-px bg-espresso-red mb-6"
              />

              {/* Text */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.18 + 0.5 }}
                className="font-serif text-2xl text-espresso-ivory group-hover:text-espresso-red transition-colors duration-400 mb-3"
              >
                {title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.18 + 0.65 }}
                className="text-espresso-muted font-sans font-light text-sm leading-relaxed"
              >
                {desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-espresso-border" />
    </section>
  )
}
