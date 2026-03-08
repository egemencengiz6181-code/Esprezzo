import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    id: 1,
    category: 'Kahve Kültürü',
    title: 'Üçüncü Dalga Kahvenin Yükselişi: Bir Fincanın Ötesinde',
    excerpt: 'Kahve artık yalnızca bir içecek değil — bir felsefe, bir yaşam biçimi. Dünya genelinde yükselen hareket, kahveyi gerçek anlamda sanat formuna taşıdı.',
    readTime: '6 dk',
    date: '12 Şubat 2026',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'Demleme Rehberi',
    title: 'Pour Over Sanatı: Mükemmel V60 için 7 Altın Kural',
    excerpt: 'Su sıcaklığından öğütme derecesine, ön ıslatma süresinden dökme ritmine kadar — pour over\'ı bir ritüele dönüştürecek tüm detaylar.',
    readTime: '9 dk',
    date: '28 Ocak 2026',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Köken & Terroir',
    title: 'Etiyopya\'nın Gizli Bahçesi: Yirgacheffe\'nin Efsanesi',
    excerpt: 'Kahvenin anavatanı sayılan Etiyopya\'nın dağlık ormanlarında büyüyen çekirdekler, dünya barista şampiyonlarının vazgeçilmezi.',
    readTime: '7 dk',
    date: '10 Ocak 2026',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&auto=format&fit=crop',
  },
]

export default function HomeBlogPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-espresso-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-espresso-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-3"
            >
              Blog & Haberler
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="section-title"
            >
              Kahve <span className="text-espresso-red italic">Hikayeleri</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/blog" className="btn-outline group flex items-center gap-2">
              Tüm Yazılar
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group card-dark overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-sans font-semibold text-white bg-espresso-red px-3 py-1">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-lg text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 leading-snug mb-3 flex-1">
                  {post.title}
                </h3>
                <p className="text-espresso-muted text-sm font-sans leading-relaxed mb-5 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-espresso-border">
                  <span className="flex items-center gap-1.5 text-espresso-muted text-xs font-sans">
                    <Clock size={12} />
                    {post.readTime} • {post.date}
                  </span>
                  <Link to="/blog" className="text-espresso-red text-xs tracking-wider uppercase font-sans font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                    Oku <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
