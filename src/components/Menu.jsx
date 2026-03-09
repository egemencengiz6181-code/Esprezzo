import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const products = [
  // ORIGINALS
  // ORIGINALS
  {
    id: 1,
    category: 'Originals',
    name: 'Espresso',
    description: 'Saf, yoğun ve dengeli. Kahvenin özü tek bir yudumda.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'Originals',
    name: 'Espresso Macchiato',
    description: 'Espresso üzerine hafif süt köpüğü. Güçlü ve nüanslı.',
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Originals',
    name: 'Americano',
    description: 'Espresso bazlı sıcak su ile uzatılmış, temiz ve uzun içim.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    category: 'Originals',
    name: 'Café Latte',
    description: 'Espresso ve kadifemsi buharlanmış süt. Yumuşak ve içten.',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    category: 'Originals',
    name: 'Flat White',
    description: 'Double ristretto ve ince süt köpüğü. Kompakt ve güçlü.',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 6,
    category: 'Originals',
    name: 'Cappuccino',
    description: 'Eşit oranda espresso, süt ve köpük. Klasiğin zirvesi.',
    image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 7,
    category: 'Originals',
    name: 'Cortado',
    description: 'Espresso ve eşit miktarda ısıtılmış süt. Sade ve dürüst.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 8,
    category: 'Originals',
    name: 'Turkish Coffee',
    description: 'Geleneksel pişirme, köklü bir kültürün en saf ifadesi.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop',
  },

  // SPECIALTY
  {
    id: 9,
    category: 'Specialty',
    name: 'White Mocha',
    description: 'Beyaz çikolatalı sos, espresso ve köpüklü süt. Tatlı bir lezzet.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 10,
    category: 'Specialty',
    name: 'Caramel Macchiato',
    description: 'Vanilya, espresso ve tatlı karamel sos. Katmanların dansı.',
    image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 11,
    category: 'Specialty',
    name: 'Classical Mocha',
    description: 'Bitter çikolata sosu ile zenginleştirilmiş espresso ve süt.',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b020d982?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 12,
    category: 'Specialty',
    name: 'Irish Mocha',
    description: 'İrlanda usulü baharatlar ve çikolata ile buluşan espresso.',
    image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 13,
    category: 'Specialty',
    name: 'Esprezzo Con Panna',
    description: 'Taze çırpılmış krema ile taçlandırılmış çift espresso.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop',
    badge: 'İmza',
  },

  // 3rd WAVE
  {
    id: 14,
    category: '3rd Wave',
    name: 'Chemex',
    description: 'Temiz ve aydınlık bir demleme. Filtrenin şiiri.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
  },
  {
    id: 15,
    category: '3rd Wave',
    name: 'V60',
    description: 'Tek kökenli çekirdek, hassas döküm, karakterini ortaya koyar.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
  },

  // CHOCOLATE & CLASSICS
  {
    id: 16,
    category: 'Chocolate & Classics',
    name: 'Chai Tea Latte',
    description: 'Baharatlı çay ve kadifemsi sütün ısıtan buluşması.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 17,
    category: 'Chocolate & Classics',
    name: 'Hot Chocolate',
    description: 'Yüksek kakao içerikli gerçek çikolata ile hazırlanan klasik.',
    image: 'https://images.unsplash.com/photo-1542736536-4e2d68cd8f2f?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 18,
    category: 'Chocolate & Classics',
    name: 'Ruby Chocolate',
    description: 'Ruby çikolatanın meyvemsi ve hafif ekşi notaları sıcak bir içimde.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 19,
    category: 'Chocolate & Classics',
    name: 'Strawberry Choco',
    description: 'Çilek püresinin tazeliği çikolatayla buluşuyor.',
    image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 20,
    category: 'Chocolate & Classics',
    name: 'Choco-nut',
    description: 'Fındık ezmesi ve çikolata. Doğanın en iyi kombinasyonu.',
    image: 'https://images.unsplash.com/photo-1481391319555-ed3c57cdc68b?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 21,
    category: 'Chocolate & Classics',
    name: 'Cookie',
    description: 'Kurabiye aroması ve çikolata parçaları ile zengin bir içecek.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 22,
    category: 'Chocolate & Classics',
    name: 'Salep',
    description: 'Geleneksel Anadolu salebi, tarçın serpiştirilmiş ve ısıtıcı.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80&auto=format&fit=crop',
  },

  // ICED TEA & REFRESHERS
  {
    id: 23,
    category: 'Iced Tea & Refreshers',
    name: 'Orange Iced Tea',
    description: 'Portakal dilimleri ile demlenmiş soğuk çay. Ferahlatıcı.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 24,
    category: 'Iced Tea & Refreshers',
    name: 'Strawberry Iced Tea',
    description: 'Taze çilek aroması ile soğuk demleme çay. Yaz ruhunu yansıtır.',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 25,
    category: 'Iced Tea & Refreshers',
    name: 'Peach Iced Tea',
    description: 'Şeftali özüyle buluşan soğuk çay. Hafif ve meyvemsi.',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 26,
    category: 'Iced Tea & Refreshers',
    name: 'Hibiscus',
    description: 'Kırmızı hibiskus çiçeğinden hazırlanan canlı renkli soğuk içecek.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 27,
    category: 'Iced Tea & Refreshers',
    name: 'Yuzu Lime',
    description: 'Japon yuzusu ve misket limonu. Ekşi, taze ve benzersiz.',
    image: 'https://images.unsplash.com/photo-1574101601882-42db1cdf4b12?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 28,
    category: 'Iced Tea & Refreshers',
    name: 'Mango Orange',
    description: 'Tropikal mango ve taze portakalın enerjik buluşması.',
    image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=80&auto=format&fit=crop',
  },

  // FROZEN & SMOOTHIES
  {
    id: 29,
    category: 'Frozen & Smoothies',
    name: 'Forest Dream',
    description: 'Orman meyveleri ve yoğurtla hazırlanan kremsi smoothie.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
  },
  {
    id: 30,
    category: 'Frozen & Smoothies',
    name: 'Mango',
    description: 'Taze mango ve hindistan cevizi sütü ile soğuk, tropik lezzet.',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 31,
    category: 'Frozen & Smoothies',
    name: 'Strawberry',
    description: 'Taze çilek ve vanilyalı yoğurt ile pürüzsüz ve ferah.',
    image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=600&q=80&auto=format&fit=crop',
  },

  // MILKSHAKES
  {
    id: 32,
    category: 'Milkshakes',
    name: 'Ruby Chocolate',
    description: "Ruby çikolatanın üzüm ve çilek notaları dondurmalı shake'te.",
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 33,
    category: 'Milkshakes',
    name: 'Blue Dream',
    description: 'Spirulina ve yaban mersini ile egzotik mavi milkshake.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
  },
  {
    id: 34,
    category: 'Milkshakes',
    name: 'Coco Bongo',
    description: 'Hindistan cevizi ve muz ile tropik ruhlu kremsi shake.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
  },

  // HERBAL TEA
  {
    id: 35,
    category: 'Herbal Tea',
    name: 'Mint Lemon Tea',
    description: 'Taze nane ve limon. Damakta bıraktığı serinlik eşsiz.',
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 36,
    category: 'Herbal Tea',
    name: 'Relax Tea',
    description: 'Papatya, lavanta ve ıhlamur ile huzur veren bir demleme.',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637536?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 37,
    category: 'Herbal Tea',
    name: 'Apple & Cinnamon Tea',
    description: 'Elma ve tarçının sıcacık uyumu. Sonbaharın fincanı.',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 38,
    category: 'Herbal Tea',
    name: 'Green Tea',
    description: 'Saf yeşil çay yaprakları, nazik buharda demleme.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 39,
    category: 'Herbal Tea',
    name: 'Ginger & Lemon Tea',
    description: 'Taze zencefil ve limon. Doğanın en güçlü ikisi bir arada.',
    image: 'https://images.unsplash.com/photo-1467119212729-f3b8761541c0?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 40,
    category: 'Herbal Tea',
    name: 'Detox Tea',
    description: 'Zerdaçal, karabiber ve akasya balı ile arındırıcı içim.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 41,
    category: 'Herbal Tea',
    name: 'Forest Mix Tea',
    description: 'Orman meyveleri ve ıhlamur çiçeğiyle hazırlanan özel harman.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 42,
    category: 'Herbal Tea',
    name: 'Winter Tea',
    description: 'Tarçın, karanfil ve portakal kabuğu. Kışın sıcaklığı.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80&auto=format&fit=crop',
  },

  // EXCLUSIVE
  {
    id: 43,
    category: 'Exclusive',
    name: 'Salted Caramel Latte',
    description: 'Deniz tuzu ve karamelin mükemmel tezadı, kremsi latte üzerinde.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
  },
  {
    id: 44,
    category: 'Exclusive',
    name: 'White Strawberry',
    description: 'Beyaz çikolata ve taze çilek. Zarif, kremsi ve hafif.',
    image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
  },
  {
    id: 45,
    category: 'Exclusive',
    name: 'Choco Orange',
    description: 'Portakalın asitliği ve bitter çikolatanın derinliği bir arada.',
    image: 'https://images.unsplash.com/photo-1481391319555-ed3c57cdc68b?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
  },
  {
    id: 46,
    category: 'Exclusive',
    name: 'Toffee Nut Latte',
    description: 'Toffee şurubu ve fındık aroması ile lüks bir latte deneyimi.',
    image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
  },
  {
    id: 47,
    category: 'Exclusive',
    name: 'Crème Brûlée',
    description: 'Crème brûlée aroması ile karamelize şeker, espresso üzerinde.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
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
