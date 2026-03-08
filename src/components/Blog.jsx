import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock, User } from 'lucide-react'

const posts = [
  {
    id: 1,
    category: 'Kahve Kültürü',
    title: 'Üçüncü Dalga Kahvenin Yükselişi: Bir Fincanın Ötesinde',
    excerpt:
      'Kahve artık yalnızca bir içecek değil — bir felsefe, bir yaşam biçimi. Dünya genelinde yükselen "üçüncü dalga" hareketi, kahveyi gerçek anlamda sanat formuna taşıdı.',
    author: 'Kurucu',
    date: '12 Şubat 2026',
    readTime: '6 dk',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    category: 'Demleme Rehberi',
    title: 'Pour Over Sanatı: Mükemmel V60 için 7 Altın Kural',
    excerpt:
      'Su sıcaklığından öğütme derecesine, ön ıslatma süresinden dökme ritmine kadar — pour over\'ı bir ritüele dönüştürecek tüm detaylar bu rehberde.',
    author: 'Ayşe Kaya',
    date: '28 Ocak 2026',
    readTime: '9 dk',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Köken & Terroir',
    title: 'Etiyopya\'nın Gizli Bahçesi: Yirgacheffe\'nin Efsanesi',
    excerpt:
      'Kahvenin anavatanı sayılan Etiyopya\'nın dağlık ormanlarında büyüyen Yirgacheffe çekirdekleri, dünya barista şampiyonlarının vazgeçilmezi olmaya devam ediyor.',
    author: 'Can Demir',
    date: '10 Ocak 2026',
    readTime: '7 dk',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&auto=format&fit=crop',
  },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
})

export default function Blog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="blog" ref={ref} className="py-28 md:py-36 bg-espresso-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-espresso-border" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="section-label mb-4"
          >
            Blog & Haberler
          </motion.p>
          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="section-title mb-4"
          >
            Kahve <span className="text-espresso-red italic">Hikayeleri</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="divider-red mx-auto mb-6"
          />
          <motion.p
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="section-subtitle max-w-xl mx-auto"
          >
            Kahve kültürü, demleme teknikleri ve köken hikayeleri üzerine yazılar.
          </motion.p>
        </div>

        {/* Blog grid — featured + 2 side */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured post */}
          {posts
            .filter((p) => p.featured)
            .map((post) => (
              <motion.article
                key={post.id}
                variants={fadeUp(0.2)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="group card-dark overflow-hidden cursor-pointer lg:row-span-2 flex flex-col"
              >
                <div className="relative h-72 lg:h-80 overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-sans font-semibold text-white bg-espresso-red px-3 py-1">
                    {post.category}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl lg:text-3xl text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 mb-4 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-espresso-muted font-sans font-light text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-espresso-border mt-auto">
                    <div className="flex items-center gap-4 text-espresso-muted text-xs font-sans">
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <button className="text-espresso-red text-xs tracking-wider uppercase font-sans font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      Oku <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}

          {/* Side posts */}
          <div className="flex flex-col gap-8">
            {posts
              .filter((p) => !p.featured)
              .map((post, i) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp(0.3 + i * 0.1)}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="group card-dark overflow-hidden cursor-pointer flex"
                >
                  <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-espresso-black/20 group-hover:bg-espresso-black/0 transition-colors duration-500" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="section-label text-[9px] mb-2 block">{post.category}</span>
                      <h3 className="font-serif text-lg text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 leading-snug mb-3">
                        {post.title}
                      </h3>
                      <p className="text-espresso-muted text-xs font-sans leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-espresso-border">
                      <div className="flex items-center gap-3 text-espresso-muted text-[10px] font-sans">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <button className="text-espresso-red text-[10px] tracking-wider uppercase font-sans font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Oku <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.6)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <p className="text-espresso-muted font-sans text-sm italic">
            Yeni yazılar için bültene abone olabilirsiniz. ↓
          </p>
        </motion.div>
      </div>
    </section>
  )
}
