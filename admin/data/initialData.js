// ============================================================
//  ESPREZZO — TEK KAYNAK (Single Source of Truth)
//  Tüm ürünler, bloglar, sayfa içerikleri ve site ayarları
//  burada toplanmıştır. Unicode escape yasaktır; tüm metinler
//  doğrudan UTF-8 olarak yazılmıştır.
// ============================================================

export const initialProducts = [
  // ────────── ORIGINALS ──────────
  {
    id: 1,
    category: 'Originals',
    name: 'Espresso',
    description: 'Saf, yoğun ve dengeli. Kahvenin özü tek bir yudumda.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 2,
    category: 'Originals',
    name: 'Espresso Macchiato',
    description: 'Espresso üzerine hafif süt köpüğü. Güçlü ve nüanslı.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 3,
    category: 'Originals',
    name: 'Americano',
    description: 'Espresso bazlı sıcak su ile uzatılmış, temiz ve uzun içim.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 4,
    category: 'Originals',
    name: 'Café Latte',
    description: 'Espresso ve kadifemsi buharlanmış süt. Yumuşak ve içten.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 5,
    category: 'Originals',
    name: 'Flat White',
    description: 'Double ristretto ve ince süt köpüğü. Kompakt ve güçlü.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 6,
    category: 'Originals',
    name: 'Cappuccino',
    description: 'Eşit oranda espresso, süt ve köpük. Klasiğin zirvesi.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 7,
    category: 'Originals',
    name: 'Cortado',
    description: 'Espresso ve eşit miktarda ısıtılmış süt. Sade ve dürüst.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 8,
    category: 'Originals',
    name: 'Turkish Coffee',
    description: 'Geleneksel pişirme, köklü bir kültürün en saf ifadesi.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── SPECIALTY ──────────
  {
    id: 9,
    category: 'Specialty',
    name: 'White Mocha',
    description: 'Beyaz çikolatalı sos, espresso ve köpüklü süt. Tatlı bir lezzet.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 10,
    category: 'Specialty',
    name: 'Caramel Macchiato',
    description: 'Vanilya, espresso ve tatlı karamel sos. Katmanların dansı.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 11,
    category: 'Specialty',
    name: 'Classical Mocha',
    description: 'Bitter çikolata sosu ile zenginleştirilmiş espresso ve süt.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 12,
    category: 'Specialty',
    name: 'Irish Mocha',
    description: 'İrlanda usulü baharatlar ve çikolata ile buluşan espresso.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 13,
    category: 'Specialty',
    name: 'Esprezzo Con Panna',
    description: 'Taze çırpılmış krema ile taçlandırılmış çift espresso.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop',
    badge: 'İmza',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── 3RD WAVE ──────────
  {
    id: 14,
    category: '3rd Wave',
    name: 'Chemex',
    description: 'Temiz ve aydınlık bir demleme. Filtrenin şiiri.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 15,
    category: '3rd Wave',
    name: 'V60',
    description: 'Tek kökenli çekirdek, hassas döküm, karakterini ortaya koyar.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── CHOCOLATE & CLASSICS ──────────
  {
    id: 16,
    category: 'Chocolate & Classics',
    name: 'Chai Tea Latte',
    description: 'Baharatlı çay ve kadifemsi sütün ısıtan buluşması.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 17,
    category: 'Chocolate & Classics',
    name: 'Hot Chocolate',
    description: 'Yüksek kakao içerikli gerçek çikolata ile hazırlanan klasik.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 18,
    category: 'Chocolate & Classics',
    name: 'Ruby Chocolate',
    description: 'Ruby çikolatanın meyvemsi ve hafif ekşi notaları sıcak bir içimde.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1548628137-bccadbc61a0b?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 19,
    category: 'Chocolate & Classics',
    name: 'Strawberry Choco',
    description: 'Çilek püresinin tazeliği çikolatayla buluşuyor.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 20,
    category: 'Chocolate & Classics',
    name: 'Choco-nut',
    description: 'Fındık ezmesi ve çikolata. Doğanın en iyi kombinasyonu.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1559181567-c3190bec14de?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 21,
    category: 'Chocolate & Classics',
    name: 'Cookie',
    description: 'Kurabiye aroması ve çikolata parçaları ile zengin bir içecek.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 22,
    category: 'Chocolate & Classics',
    name: 'Salep',
    description: 'Geleneksel Anadolu salebi, tarçın serpiştirilmiş ve ısıtıcı.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── ICED TEA & REFRESHERS ──────────
  {
    id: 23,
    category: 'Iced Tea & Refreshers',
    name: 'Orange Iced Tea',
    description: 'Portakal dilimleri ile demlenmiş soğuk çay. Ferahlatıcı.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 24,
    category: 'Iced Tea & Refreshers',
    name: 'Strawberry Iced Tea',
    description: 'Taze çilek aroması ile soğuk demleme çay. Yaz ruhunu yansıtır.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 25,
    category: 'Iced Tea & Refreshers',
    name: 'Peach Iced Tea',
    description: 'Şeftali özüyle buluşan soğuk çay. Hafif ve meyvemsi.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1527761939622-9119f4f5a9ef?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 26,
    category: 'Iced Tea & Refreshers',
    name: 'Hibiscus',
    description: 'Kırmızı hibiskus çiçeğinden hazırlanan canlı renkli soğuk içecek.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 27,
    category: 'Iced Tea & Refreshers',
    name: 'Yuzu Lime',
    description: 'Japon yuzusu ve misket limonu. Ekşi, taze ve benzersiz.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 28,
    category: 'Iced Tea & Refreshers',
    name: 'Mango Orange',
    description: 'Tropikal mango ve taze portakalın enerjik buluşması.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── FROZEN & SMOOTHIES ──────────
  {
    id: 29,
    category: 'Frozen & Smoothies',
    name: 'Forest Dream',
    description: 'Orman meyveleri ve yoğurtla hazırlanan kremsi smoothie.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 30,
    category: 'Frozen & Smoothies',
    name: 'Mango',
    description: 'Taze mango ve hindistan cevizi sütü ile soğuk, tropik lezzet.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1553530979-212dc4803078?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 31,
    category: 'Frozen & Smoothies',
    name: 'Strawberry',
    description: 'Taze çilek ve vanilyalı yoğurt ile pürüzsüz ve ferah.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── MILKSHAKES ──────────
  {
    id: 32,
    category: 'Milkshakes',
    name: 'Ruby Chocolate',
    description: "Ruby çikolatanın üzüm ve çilek notaları dondurmalı shake'te.",
    price: 100,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 33,
    category: 'Milkshakes',
    name: 'Blue Dream',
    description: 'Spirulina ve yaban mersini ile egzotik mavi milkshake.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 34,
    category: 'Milkshakes',
    name: 'Coco Bongo',
    description: 'Hindistan cevizi ve muz ile tropik ruhlu kremsi shake.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80&auto=format&fit=crop',
    badge: 'Yeni',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── HERBAL TEA ──────────
  {
    id: 35,
    category: 'Herbal Tea',
    name: 'Mint Lemon Tea',
    description: 'Taze nane ve limon. Damakta bıraktığı serinlik eşsiz.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 36,
    category: 'Herbal Tea',
    name: 'Relax Tea',
    description: 'Papatya, lavanta ve ıhlamur ile huzur veren bir demleme.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1564890369478-c3b5c5d01d63?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 37,
    category: 'Herbal Tea',
    name: 'Apple & Cinnamon Tea',
    description: 'Elma ve tarçının sıcacık uyumu. Sonbaharın fincanı.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 38,
    category: 'Herbal Tea',
    name: 'Green Tea',
    description: 'Saf yeşil çay yaprakları, nazik buharda demleme.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 39,
    category: 'Herbal Tea',
    name: 'Ginger & Lemon Tea',
    description: 'Taze zencefil ve limon. Doğanın en güçlü ikisi bir arada.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1467119212729-f3b8761541c0?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 40,
    category: 'Herbal Tea',
    name: 'Detox Tea',
    description: 'Zerdaçal, karabiber ve akasya balı ile arındırıcı içim.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 41,
    category: 'Herbal Tea',
    name: 'Forest Mix Tea',
    description: 'Orman meyveleri ve ıhlamur çiçeğiyle hazırlanan özel harman.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 42,
    category: 'Herbal Tea',
    name: 'Winter Tea',
    description: 'Tarçın, karanfil ve portakal kabuğu. Kışın sıcaklığı.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1608198399988-341b712349b5?w=600&q=80&auto=format&fit=crop',
    badge: '',
    stock: 'in-stock',
    visible: true,
  },

  // ────────── EXCLUSIVE ──────────
  {
    id: 43,
    category: 'Exclusive',
    name: 'Salted Caramel Latte',
    description: 'Deniz tuzu ve karamelin mükemmel tezadı, kremsi latte üzerinde.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 44,
    category: 'Exclusive',
    name: 'White Strawberry',
    description: 'Beyaz çikolata ve taze çilek. Zarif, kremsi ve hafif.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 45,
    category: 'Exclusive',
    name: 'Choco Orange',
    description: 'Portakalın asitliği ve bitter çikolatanın derinliği bir arada.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1549046771-d56b07c7c1e5?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 46,
    category: 'Exclusive',
    name: 'Toffee Nut Latte',
    description: 'Toffee şurubu ve fındık aroması ile lüks bir latte deneyimi.',
    price: 105,
    image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
    stock: 'in-stock',
    visible: true,
  },
  {
    id: 47,
    category: 'Exclusive',
    name: 'Crème Brûlée',
    description: 'Crème brûlée aroması ile karamelize şeker, espresso üzerinde.',
    price: 115,
    image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80&auto=format&fit=crop',
    badge: 'Exclusive',
    stock: 'in-stock',
    visible: true,
  },
]

// ────────────────────────────────────────────────────────────
//  BLOG YAZILARI
// ────────────────────────────────────────────────────────────
export const initialBlog = [
  {
    id: 1,
    slug: 'ucuncu-dalga-kahvenin-yukselisi',
    category: 'Kahve Kültürü',
    title: 'Üçüncü Dalga Kahvenin Yükselişi: Bir Fincanın Ötesinde',
    excerpt:
      'Kahve artık yalnızca bir içecek değil — bir felsefe, bir yaşam biçimi. Dünya genelinde yükselen "üçüncü dalga" hareketi, kahveyi gerçek anlamda sanat formuna taşıdı.',
    author: 'Kurucu',
    date: '2026-02-12',
    readTime: '6 dk',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=85&auto=format&fit=crop',
    featured: true,
    published: true,
    tags: ['kahve', 'kültür', '3. dalga'],
    content: `Kahve tarihini üç dalgaya bölmek, onun evrimini anlamanın en güzel yoludur.

**Birinci Dalga:** 20. yüzyılın ortasında dünya genelinde kahvenin evlere girmesiyle başladı. Kurutulmuş granüller, filtreler ve pratiklik — kahve o dönemde sadece bir sabah ritüeliydi. Lezzet ikincil, erişilebilirlik birincildi.

**İkinci Dalga:** Starbucks ve benzeri zincirlerin öncülük ettiği bu dönem, kahveye bir deneyim katmanı ekledi. Espresso bazlı içecekler, şuruplar ve marka atmosferi ön plana çıktı. Ne var ki çekirdeğin kendi hikayesi hâlâ geri plandaydı.

**Üçüncü Dalga**, işte tam burada devreye giriyor.

---

### Çekirdeğin Sesi

Üçüncü dalga, kahveyi şarap gibi ele alır: köken önemlidir, çiftçi önemlidir, rakım önemlidir, hasat günü önemlidir. Etiyopya'nın Yirgacheffe ormanlarından toplanan bir çekirdek ile Kolombiya Huila'nın bulutlu yamaçlarından gelen bir çekirdek, köklü şekilde farklı lezzet profilleri taşır. Bu farkı keşfetmek, üçüncü dalganın özüdür.

Esprezzo olarak biz de bu anlayışla yola çıktık. Her çekirdeği kaynağında takip ediyor, çiftçilerle doğrudan ilişki kuruyor ve her demlemede o çekirdeğin potansiyelini en üst düzeye çıkarmaya çalışıyoruz.

---

### Demleme Bir Bilimdir

Üçüncü dalga barista'sı için demleme değişkenleri — su sıcaklığı, öğütme boyutu, demleme süresi, ön ıslatma — birer sanat malzemesidir. V60, Chemex, AeroPress ya da espresso makinesi; her yöntem, aynı çekirdeği farklı bir dil konuşturur.

Bu yolculukta sizinle olmaktan gurur duyuyoruz. Her fincan, bir hikayenin devamıdır.`,
  },
  {
    id: 2,
    slug: 'pour-over-sanat-v60-altin-kurallari',
    category: 'Demleme Rehberi',
    title: "Pour Over Sanatı: Mükemmel V60 için 7 Altın Kural",
    excerpt:
      "Su sıcaklığından öğütme derecesine, ön ıslatma süresinden dökme ritmine kadar — pour over'ı bir ritüele dönüştürecek tüm detaylar bu rehberde.",
    author: 'Ayşe Kaya',
    date: '2026-01-28',
    readTime: '9 dk',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85&auto=format&fit=crop',
    featured: false,
    published: true,
    tags: ['v60', 'pour over', 'demleme'],
    content: `V60, görünüşte sade bir plastik ya da cam huniden ibarettir. Ancak onu doğru kullandığınızda, elde ettiğiniz fincan sizi şaşırtacaktır. İşte V60 ile mükemmele ulaşmak için 7 altın kural:

---

**1. Çekirdeği Taze Öğütün**

Öğütülmüş kahve, hızla okside olur. Demleme öncesi 30 saniye içinde öğütün. Orta-ince bir ayar, V60 için başlangıç noktanız olsun.

**2. Su Sıcaklığına Dikkat Edin**

92–96°C arası idealdir. Kaynayan suyu 30–45 saniye bekletin. Çok sıcak su acılığı artırır; çok soğuk su ise yetersiz ekstraksiyon yaratır.

**3. Filtreyi Islatın**

Kağıt filtreyi koyduğunuzda önce sıcak su ile ıslatın. Bu, kağıt tadını giderir ve huniyi ısıtır.

**4. Ön Islatma (Bloom) Yapın**

Kahvenin iki katı kadar su ekleyin (örneğin 15 g kahve için ~30 ml su). 30–45 saniye bekleyin. Bu aşama, gazın çıkmasına ve sonraki ekstraksiyonun düzgün gerçekleşmesine olanak tanır.

**5. Döngüsel ve Yavaş Dökün**

Dökmeyi çeperleri de ıslatacak şekilde, dışarıdan içeriye doğru spiraller çizerek yapın. Acele etmeyin.

**6. Toplam Süreyi Takip Edin**

15 g kahve için 250 ml su, yaklaşık 2:30 – 3:00 dakikada tamamlanmalı. Daha kısa = az ekstrakte; daha uzun = aşırı ekstrakte.

**7. Tadın ve Ayarlayın**

Her çekirdek farklıdır. İlk denemeden sonra notlar alın. Öğütmeyi, su sıcaklığını veya dökme ritminizi küçük adımlarla değiştirin.`,
  },
  {
    id: 3,
    slug: 'etiyopya-yirgacheffe-efsanesi',
    category: 'Köken & Terroir',
    title: "Etiyopya'nın Gizli Bahçesi: Yirgacheffe'nin Efsanesi",
    excerpt:
      "Kahvenin anavatanı sayılan Etiyopya'nın dağlık ormanlarında büyüyen Yirgacheffe çekirdekleri, dünya barista şampiyonlarının vazgeçilmezi olmaya devam ediyor.",
    author: 'Can Demir',
    date: '2026-01-10',
    readTime: '7 dk',
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=85&auto=format&fit=crop',
    featured: false,
    published: true,
    tags: ['etiyopya', 'yirgacheffe', 'köken', 'specialty'],
    content: `Yirgacheffe. Etiyopya'nın güney kesiminde, 1700 ila 2200 metre yükseklikte saklı kalan bu küçük bölge, kahve dünyasının kutsal toprakları arasında gösterilir.

---

### Neden Bu Kadar Özel?

Yirgacheffe çekirdeklerini farklı kılan birkaç temel etken vardır:

**Terroir:** Toprak mineralleri, ormanların yarattığı nem dengesi ve güneş açısı, buradaki çekirdeklere kendine özgü bir asidite ve hafiflik kazandırır.

**İşleme Yöntemi:** Hem yıkamalı (washed) hem doğal (natural) yöntemle işlenen Yirgacheffe fasulyeleri, her iki yöntemde de farklı ama eşit derecede etkileyici profiller sunar. Yıkamalı versiyonlar çiçeksi ve narenciye tonlarıyla öne çıkarken, doğal olanlar çilek ve şeftali çağrıştırır.

**Genetik Çeşitlilik:** Etiyopya, arabica kafanın gen havuzunun merkezidir. Yirgacheffe'deki çekirdekler binlerce yıllık vahşi ata çeşitlerini barındırır.

---

### Esprezzo ve Yirgacheffe

Menümüzdeki V60 seçeneğinde zaman zaman özel Yirgacheffe partileriyle çalışıyoruz. Bu çekirdeklerle yapılan bir pour over, sıradan bir sabahı unutulmaz bir deneyime dönüştürebilir.

Bizi ziyaret ettiğinizde barista ekibimize sormanız yeterli; o gün hangi kökenden çalışıldığını size heyecanla anlatacaklardır.`,
  },
]

// ────────────────────────────────────────────────────────────
//  SAYFA İÇERİKLERİ
// ────────────────────────────────────────────────────────────
export const initialContent = {
  hero: {
    title: 'PREMIUM Coffee EXPERIENCE',
    subtitle: 'Her yudumda mükemmellik. Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler.',
    buttonText: 'Menüyü Keşfet',
  },
  about: {
    label: 'Biz kimiz?',
    title: 'Hikayemiz',
    subtitle: 'Kahveyle başlayan, tutkuyla büyüyen bir yolculuk.',
    paragraphs: [
      'Esprezzo, 2024 yılında İstanbul\'da kahve severlerin buluşma noktası olmak amacıyla kuruldu.',
      'Amacımız her fincanda tutarlı kalite sunmak ve kahve kültürünü yaşatmak.',
      'Özenle seçilmiş tek kökenli çekirdekler, uzman barista ekibimiz ve sıcak atmosferimizle her ziyaretinizi özel kılıyoruz.',
    ],
  },
  contact: {
    title: 'Bize Ulaşın',
    subtitle: 'Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçin.',
    address: 'Bağdat Caddesi No:123, Kadıköy, İstanbul',
    email: 'info@esprezzo.com',
    phone: '+90 (212) 000 00 00',
  },
  franchise: {
    label: 'İş Birliği Fırsatı',
    title: 'Franchise Başvurusu',
    subtitle:
      'Formu eksiksiz doldurun. Franchise ekibimiz 2 iş günü içinde sizinle iletişime geçecektir.',
  },
}

// ────────────────────────────────────────────────────────────
//  SİTE AYARLARI
// ────────────────────────────────────────────────────────────
export const initialSettings = {
  general: {
    siteName: 'Esprezzo',
    siteSlogan: 'PREMIUM Coffee EXPERIENCE',
    siteDescription: 'Her yudumda mükemmellik. Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler.',
    logoUrl: '/logo/esprezzo-logo.svg',
    faviconUrl: '/favicon.svg',
  },
  contact: {
    email: 'info@esprezzo.com',
    phone: '+90 (212) 000 00 00',
    whatsapp: '+90 (532) 000 00 00',
    address: 'Bağdat Caddesi No:123, Kadıköy, İstanbul',
    googleMapsUrl: 'https://maps.google.com/?q=Esprezzo+Istanbul',
    instagramUrl: 'https://instagram.com/esprezzo',
    twitterUrl: 'https://twitter.com/esprezzo',
    facebookUrl: 'https://facebook.com/esprezzo',
    tiktokUrl: 'https://tiktok.com/@esprezzo',
  },
  workingHours: {
    mondayFriday: '08:00 – 23:00',
    saturday: '09:00 – 00:00',
    sunday: '09:00 – 22:00',
    specialNote: 'Resmi tatillerde çalışma saatleri değişiklik gösterebilir.',
  },
  footer: {
    copyrightText: '© 2026 Esprezzo. Tüm hakları saklıdır.',
    footerDescription:
      'Esprezzo — Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler. Her yudumda bir hikaye.',
    privacyPolicyUrl: '/gizlilik-politikasi',
    termsUrl: '/kullanim-kosullari',
  },
  seo: {
    metaTitle: 'Esprezzo | Premium Coffee Experience',
    metaDescription:
      'Esprezzo — İstanbul\'un premium kahve deneyimi. Specialty kahveler, el yapımı içecekler ve özel lezzetler.',
    ogImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
  },
  announcement: {
    enabled: true,
    text: 'Yeni sezon menümüz yayında! 🎉',
    linkText: 'Menüyü Keşfet',
    linkUrl: '/menu',
  },
}
