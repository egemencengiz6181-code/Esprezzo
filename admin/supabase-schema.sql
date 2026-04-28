-- ============================================================
--  ESPREZZO — SUPABASE DATABASE SCHEMA + SEED
--  Supabase Dashboard → SQL Editor → New Query → Çalıştır
-- ============================================================

-- ────────── UUID EKLENTİSİ ──────────
create extension if not exists "uuid-ossp";

-- ════════════════════════════════════════
--  TABLO TANIMLARI
-- ════════════════════════════════════════

-- ── PRODUCTS ──────────────────────────────────────────────
create table if not exists public.products (
  id          uuid        primary key default uuid_generate_v4(),
  category    text        not null,
  name        text        not null,
  description text        not null default '',
  price       numeric(10,2) not null default 0,
  image       text        not null default '',
  badge       text        not null default '',
  stock       text        not null default 'in-stock',
  visible     boolean     not null default true,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint products_stock_check
    check (stock in ('in-stock', 'low-stock', 'out-of-stock'))
);

-- ── BLOG POSTS ────────────────────────────────────────────
create table if not exists public.blog_posts (
  id          uuid    primary key default uuid_generate_v4(),
  slug        text    unique not null,
  category    text    not null default '',
  title       text    not null,
  excerpt     text    not null default '',
  content     text    not null default '',
  author      text    not null default 'Admin',
  date        date    not null default current_date,
  read_time   text    not null default '',
  image       text    not null default '',
  featured    boolean not null default false,
  published   boolean not null default true,
  tags        text[]  not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── CONTENT (Sayfa metin bölümleri — JSONB) ───────────────
create table if not exists public.content (
  section     text    primary key,
  data        jsonb   not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- ── SETTINGS (Site ayarları — JSONB) ─────────────────────
create table if not exists public.settings (
  section     text    primary key,
  data        jsonb   not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);


-- ════════════════════════════════════════
--  OTOMATİK updated_at TETİKLEYİCİSİ
-- ════════════════════════════════════════

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger trg_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

create trigger trg_content_updated_at
  before update on public.content
  for each row execute function public.set_updated_at();

create trigger trg_settings_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();


-- ════════════════════════════════════════
--  ROW LEVEL SECURITY (RLS)
-- ════════════════════════════════════════

alter table public.products   enable row level security;
alter table public.blog_posts enable row level security;
alter table public.content    enable row level security;
alter table public.settings   enable row level security;

-- Herkese açık okuma (ana site için)
create policy "Public read products"
  on public.products for select using (true);

create policy "Public read blog_posts"
  on public.blog_posts for select using (published = true);

create policy "Admin read all blog_posts"
  on public.blog_posts for select
  using (auth.role() = 'authenticated');

create policy "Public read content"
  on public.content for select using (true);

create policy "Public read settings"
  on public.settings for select using (true);

-- Sadece oturum açmış kullanıcılar (admin) yazabilir
create policy "Admin full access products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access blog_posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access content"
  on public.content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access settings"
  on public.settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- ════════════════════════════════════════
--  STORAGE POLİTİKALARI (blog-images bucket)
--  Storage → New Bucket → "blog-images" → Public: ON
--  Ardından aşağıdaki politikaları çalıştır:
-- ════════════════════════════════════════

create policy "Public read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

create policy "Authenticated upload blog images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Authenticated update blog images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "Authenticated delete blog images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');


-- ════════════════════════════════════════
--  SEED: İÇERİK (content)
-- ════════════════════════════════════════

insert into public.content (section, data) values
(
  'hero',
  '{"title":"PREMIUM Coffee EXPERIENCE","subtitle":"Her yudumda mükemmellik. Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler.","buttonText":"Menüyü Keşfet"}'::jsonb
),
(
  'about',
  '{"label":"Biz kimiz?","title":"Hikayemiz","subtitle":"Kahveyle başlayan, tutkuyla büyüyen bir yolculuk.","paragraphs":["Esprezzo, 2024 yılında İstanbul''da kahve severlerin buluşma noktası olmak amacıyla kuruldu.","Amacımız her fincanda tutarlı kalite sunmak ve kahve kültürünü yaşatmak.","Özenle seçilmiş tek kökenli çekirdekler, uzman barista ekibimiz ve sıcak atmosferimizle her ziyaretinizi özel kılıyoruz."]}'::jsonb
),
(
  'contact',
  '{"title":"Bize Ulaşın","subtitle":"Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçin.","address":"Bağdat Caddesi No:123, Kadıköy, İstanbul","email":"info@esprezzo.com","phone":"+90 (212) 000 00 00"}'::jsonb
),
(
  'franchise',
  '{"label":"İş Birliği Fırsatı","title":"Franchise Başvurusu","subtitle":"Formu eksiksiz doldurun. Franchise ekibimiz 2 iş günü içinde sizinle iletişime geçecektir."}'::jsonb
)
on conflict (section) do nothing;


-- ════════════════════════════════════════
--  SEED: AYARLAR (settings)
-- ════════════════════════════════════════

insert into public.settings (section, data) values
(
  'general',
  '{"siteName":"Esprezzo","siteSlogan":"PREMIUM Coffee EXPERIENCE","siteDescription":"Her yudumda mükemmellik. Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler.","logoUrl":"/logo/esprezzo-logo.svg","faviconUrl":"/favicon.svg"}'::jsonb
),
(
  'contact',
  '{"email":"info@esprezzo.com","phone":"+90 (212) 000 00 00","whatsapp":"+90 (532) 000 00 00","address":"Bağdat Caddesi No:123, Kadıköy, İstanbul","googleMapsUrl":"https://maps.google.com/?q=Esprezzo+Istanbul","instagramUrl":"https://instagram.com/esprezzo","twitterUrl":"https://twitter.com/esprezzo","facebookUrl":"https://facebook.com/esprezzo","tiktokUrl":"https://tiktok.com/@esprezzo"}'::jsonb
),
(
  'workingHours',
  '{"mondayFriday":"08:00 – 23:00","saturday":"09:00 – 00:00","sunday":"09:00 – 22:00","specialNote":"Resmi tatillerde çalışma saatleri değişiklik gösterebilir."}'::jsonb
),
(
  'footer',
  '{"copyrightText":"© 2026 Esprezzo. Tüm hakları saklıdır.","footerDescription":"Esprezzo — Özenle seçilmiş çekirdekler, tutkuyla hazırlanmış lezzetler. Her yudumda bir hikaye.","privacyPolicyUrl":"/gizlilik-politikasi","termsUrl":"/kullanim-kosullari"}'::jsonb
),
(
  'seo',
  '{"metaTitle":"Esprezzo | Premium Coffee Experience","metaDescription":"Esprezzo — İstanbul''un premium kahve deneyimi. Specialty kahveler, el yapımı içecekler ve özel lezzetler.","ogImage":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"}'::jsonb
),
(
  'announcement',
  '{"enabled":true,"text":"Yeni sezon menümüz yayında! 🎉","linkText":"Menüyü Keşfet","linkUrl":"/menu"}'::jsonb
)
on conflict (section) do nothing;


-- ════════════════════════════════════════
--  SEED: ÜRÜNLER (products)
-- ════════════════════════════════════════

insert into public.products (category, name, description, price, image, badge, stock, visible, sort_order) values
-- Originals
('Originals','Espresso','Saf, yoğun ve dengeli. Kahvenin özü tek bir yudumda.',65,'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&auto=format&fit=crop','','in-stock',true,10),
('Originals','Espresso Macchiato','Espresso üzerine hafif süt köpüğü. Güçlü ve nüanslı.',70,'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&q=80&auto=format&fit=crop','','in-stock',true,20),
('Originals','Americano','Espresso bazlı sıcak su ile uzatılmış, temiz ve uzun içim.',70,'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&q=80&auto=format&fit=crop','','in-stock',true,30),
('Originals','Café Latte','Espresso ve kadifemsi buharlanmış süt. Yumuşak ve içten.',80,'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80&auto=format&fit=crop','','in-stock',true,40),
('Originals','Flat White','Double ristretto ve ince süt köpüğü. Kompakt ve güçlü.',85,'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?w=600&q=80&auto=format&fit=crop','','in-stock',true,50),
('Originals','Cappuccino','Eşit oranda espresso, süt ve köpük. Klasiğin zirvesi.',80,'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=600&q=80&auto=format&fit=crop','','in-stock',true,60),
('Originals','Cortado','Espresso ve eşit miktarda ısıtılmış süt. Sade ve dürüst.',75,'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop','','in-stock',true,70),
('Originals','Turkish Coffee','Geleneksel pişirme, köklü bir kültürün en saf ifadesi.',60,'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80&auto=format&fit=crop','','in-stock',true,80),
-- Specialty
('Specialty','White Mocha','Beyaz çikolatalı sos, espresso ve köpüklü süt. Tatlı bir lezzet.',95,'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop','','in-stock',true,10),
('Specialty','Caramel Macchiato','Vanilya, espresso ve tatlı karamel sos. Katmanların dansı.',95,'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop','','in-stock',true,20),
('Specialty','Classical Mocha','Bitter çikolata sosu ile zenginleştirilmiş espresso ve süt.',90,'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80&auto=format&fit=crop','','in-stock',true,30),
('Specialty','Irish Mocha','İrlanda usulü baharatlar ve çikolata ile buluşan espresso.',95,'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=600&q=80&auto=format&fit=crop','','in-stock',true,40),
('Specialty','Esprezzo Con Panna','Taze çırpılmış krema ile taçlandırılmış çift espresso.',85,'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop','İmza','in-stock',true,50),
-- 3rd Wave
('3rd Wave','Chemex','Temiz ve aydınlık bir demleme. Filtrenin şiiri.',100,'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80&auto=format&fit=crop','Yeni','in-stock',true,10),
('3rd Wave','V60','Tek kökenli çekirdek, hassas döküm, karakterini ortaya koyar.',100,'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop','Yeni','in-stock',true,20),
-- Chocolate & Classics
('Chocolate & Classics','Chai Tea Latte','Baharatlı çay ve kadifemsi sütün ısıtan buluşması.',85,'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80&auto=format&fit=crop','','in-stock',true,10),
('Chocolate & Classics','Hot Chocolate','Yüksek kakao içerikli gerçek çikolata ile hazırlanan klasik.',80,'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&q=80&auto=format&fit=crop','','in-stock',true,20),
('Chocolate & Classics','Ruby Chocolate','Ruby çikolatanın meyvemsi ve hafif ekşi notaları sıcak bir içimde.',95,'https://images.unsplash.com/photo-1548628137-bccadbc61a0b?w=600&q=80&auto=format&fit=crop','','in-stock',true,30),
('Chocolate & Classics','Strawberry Choco','Çilek püresinin tazeliği çikolatayla buluşuyor.',90,'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&q=80&auto=format&fit=crop','','in-stock',true,40),
('Chocolate & Classics','Choco-nut','Fındık ezmesi ve çikolata. Doğanın en iyi kombinasyonu.',90,'https://images.unsplash.com/photo-1559181567-c3190bec14de?w=600&q=80&auto=format&fit=crop','','in-stock',true,50),
('Chocolate & Classics','Cookie','Kurabiye aroması ve çikolata parçaları ile zengin bir içecek.',85,'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop','','in-stock',true,60),
('Chocolate & Classics','Salep','Geleneksel Anadolu salebi, tarçın serpiştirilmiş ve ısıtıcı.',75,'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=600&q=80&auto=format&fit=crop','','in-stock',true,70),
-- Iced Tea & Refreshers
('Iced Tea & Refreshers','Orange Iced Tea','Portakal dilimleri ile demlenmiş soğuk çay. Ferahlatıcı.',70,'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80&auto=format&fit=crop','','in-stock',true,10),
('Iced Tea & Refreshers','Strawberry Iced Tea','Taze çilek aroması ile soğuk demleme çay. Yaz ruhunu yansıtır.',70,'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80&auto=format&fit=crop','','in-stock',true,20),
('Iced Tea & Refreshers','Peach Iced Tea','Şeftali özüyle buluşan soğuk çay. Hafif ve meyvemsi.',70,'https://images.unsplash.com/photo-1527761939622-9119f4f5a9ef?w=600&q=80&auto=format&fit=crop','','in-stock',true,30),
('Iced Tea & Refreshers','Hibiscus','Kırmızı hibiskus çiçeğinden hazırlanan canlı renkli soğuk içecek.',75,'https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?w=600&q=80&auto=format&fit=crop','','in-stock',true,40),
('Iced Tea & Refreshers','Yuzu Lime','Japon yuzusu ve misket limonu. Ekşi, taze ve benzersiz.',80,'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80&auto=format&fit=crop','','in-stock',true,50),
('Iced Tea & Refreshers','Mango Orange','Tropikal mango ve taze portakalın enerjik buluşması.',75,'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80&auto=format&fit=crop','','in-stock',true,60),
-- Frozen & Smoothies
('Frozen & Smoothies','Forest Dream','Orman meyveleri ve yoğurtla hazırlanan kremsi smoothie.',90,'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80&auto=format&fit=crop','Yeni','in-stock',true,10),
('Frozen & Smoothies','Mango','Taze mango ve hindistan cevizi sütü ile soğuk, tropik lezzet.',85,'https://images.unsplash.com/photo-1553530979-212dc4803078?w=600&q=80&auto=format&fit=crop','','in-stock',true,20),
('Frozen & Smoothies','Strawberry','Taze çilek ve vanilyalı yoğurt ile pürüzsüz ve ferah.',85,'https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&q=80&auto=format&fit=crop','','in-stock',true,30),
-- Milkshakes
('Milkshakes','Ruby Chocolate','Ruby çikolatanın üzüm ve çilek notaları dondurmalı shake''te.',100,'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&q=80&auto=format&fit=crop','','in-stock',true,10),
('Milkshakes','Blue Dream','Spirulina ve yaban mersini ile egzotik mavi milkshake.',100,'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&q=80&auto=format&fit=crop','Yeni','in-stock',true,20),
('Milkshakes','Coco Bongo','Hindistan cevizi ve muz ile tropik ruhlu kremsi shake.',95,'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80&auto=format&fit=crop','Yeni','in-stock',true,30),
-- Herbal Tea
('Herbal Tea','Mint Lemon Tea','Taze nane ve limon. Damakta bıraktığı serinlik eşsiz.',60,'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=600&q=80&auto=format&fit=crop','','in-stock',true,10),
('Herbal Tea','Relax Tea','Papatya, lavanta ve ıhlamur ile huzur veren bir demleme.',60,'https://images.unsplash.com/photo-1564890369478-c3b5c5d01d63?w=600&q=80&auto=format&fit=crop','','in-stock',true,20),
('Herbal Tea','Apple & Cinnamon Tea','Elma ve tarçının sıcacık uyumu. Sonbaharın fincanı.',60,'https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?w=600&q=80&auto=format&fit=crop','','in-stock',true,30),
('Herbal Tea','Green Tea','Saf yeşil çay yaprakları, nazik buharda demleme.',55,'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop','','in-stock',true,40),
('Herbal Tea','Ginger & Lemon Tea','Taze zencefil ve limon. Doğanın en güçlü ikisi bir arada.',60,'https://images.unsplash.com/photo-1467119212729-f3b8761541c0?w=600&q=80&auto=format&fit=crop','','in-stock',true,50),
('Herbal Tea','Detox Tea','Zerdaçal, karabiber ve akasya balı ile arındırıcı içim.',65,'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=600&q=80&auto=format&fit=crop','','in-stock',true,60),
('Herbal Tea','Forest Mix Tea','Orman meyveleri ve ıhlamur çiçeğiyle hazırlanan özel harman.',65,'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop','','in-stock',true,70),
('Herbal Tea','Winter Tea','Tarçın, karanfil ve portakal kabuğu. Kışın sıcaklığı.',65,'https://images.unsplash.com/photo-1608198399988-341b712349b5?w=600&q=80&auto=format&fit=crop','','in-stock',true,80),
-- Exclusive
('Exclusive','Salted Caramel Latte','Deniz tuzu ve karamelin mükemmel tezadı, kremsi latte üzerinde.',110,'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop','Exclusive','in-stock',true,10),
('Exclusive','White Strawberry','Beyaz çikolata ve taze çilek. Zarif, kremsi ve hafif.',110,'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop','Exclusive','in-stock',true,20),
('Exclusive','Choco Orange','Portakalın asitliği ve bitter çikolatanın derinliği bir arada.',110,'https://images.unsplash.com/photo-1549046771-d56b07c7c1e5?w=600&q=80&auto=format&fit=crop','Exclusive','in-stock',true,30),
('Exclusive','Toffee Nut Latte','Toffee şurubu ve fındık aroması ile lüks bir latte deneyimi.',105,'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600&q=80&auto=format&fit=crop','Exclusive','in-stock',true,40),
('Exclusive','Crème Brûlée','Crème brûlée aroması ile karamelize şeker, espresso üzerinde.',115,'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&q=80&auto=format&fit=crop','Exclusive','in-stock',true,50);


-- ════════════════════════════════════════
--  SEED: BLOG YAZILARI
-- ════════════════════════════════════════

insert into public.blog_posts (slug, category, title, excerpt, content, author, date, read_time, image, featured, published, tags) values
(
  'ucuncu-dalga-kahvenin-yukselisi',
  'Kahve Kültürü',
  'Üçüncü Dalga Kahvenin Yükselişi: Bir Fincanın Ötesinde',
  'Kahve artık yalnızca bir içecek değil — bir felsefe, bir yaşam biçimi. Dünya genelinde yükselen "üçüncü dalga" hareketi, kahveyi gerçek anlamda sanat formuna taşıdı.',
  $$Kahve tarihini üç dalgaya bölmek, onun evrimini anlamanın en güzel yoludur.

**Birinci Dalga:** 20. yüzyılın ortasında dünya genelinde kahvenin evlere girmesiyle başladı. Kurutulmuş granüller, filtreler ve pratiklik — kahve o dönemde sadece bir sabah ritüeliydi.

**İkinci Dalga:** Starbucks ve benzeri zincirlerin öncülük ettiği bu dönem, kahveye bir deneyim katmanı ekledi. Espresso bazlı içecekler, şuruplar ve marka atmosferi ön plana çıktı.

**Üçüncü Dalga**, işte tam burada devreye giriyor.

---

### Çekirdeğin Sesi

Üçüncü dalga, kahveyi şarap gibi ele alır: köken önemlidir, çiftçi önemlidir, rakım önemlidir, hasat günü önemlidir.

Esprezzo olarak biz de bu anlayışla yola çıktık. Her çekirdeği kaynağında takip ediyor, çiftçilerle doğrudan ilişki kuruyor ve her demlemede o çekirdeğin potansiyelini en üst düzeye çıkarmaya çalışıyoruz.$$,
  'Kurucu',
  '2026-02-12',
  '6 dk',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=85&auto=format&fit=crop',
  true,
  true,
  array['kahve', 'kültür', '3. dalga']
),
(
  'pour-over-sanat-v60-altin-kurallari',
  'Demleme Rehberi',
  'Pour Over Sanatı: Mükemmel V60 için 7 Altın Kural',
  'Su sıcaklığından öğütme derecesine, ön ıslatma süresinden dökme ritmine kadar — pour over''ı bir ritüele dönüştürecek tüm detaylar bu rehberde.',
  $$V60, görünüşte sade bir plastik ya da cam huniden ibarettir. Ancak onu doğru kullandığınızda, elde ettiğiniz fincan sizi şaşırtacaktır.

**1. Çekirdeği Taze Öğütün** — Öğütülmüş kahve hızla okside olur. Demleme öncesi 30 saniye içinde öğütün.

**2. Su Sıcaklığına Dikkat Edin** — 92–96°C arası idealdir.

**3. Filtreyi Islatın** — Kağıt filtreyi koyduğunuzda önce sıcak su ile ıslatın.

**4. Ön Islatma (Bloom) Yapın** — Kahvenin iki katı kadar su ekleyin, 30–45 saniye bekleyin.

**5. Döngüsel ve Yavaş Dökün** — Dökmeyi spiraller çizerek yapın.

**6. Toplam Süreyi Takip Edin** — 15 g kahve için 250 ml su, 2:30–3:00 dakikada tamamlanmalı.

**7. Tadın ve Ayarlayın** — Her çekirdek farklıdır. Notlar alın.$$,
  'Ayşe Kaya',
  '2026-01-28',
  '9 dk',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85&auto=format&fit=crop',
  false,
  true,
  array['v60', 'pour over', 'demleme']
),
(
  'etiyopya-yirgacheffe-efsanesi',
  'Köken & Terroir',
  'Etiyopya''nın Gizli Bahçesi: Yirgacheffe''nin Efsanesi',
  'Kahvenin anavatanı sayılan Etiyopya''nın dağlık ormanlarında büyüyen Yirgacheffe çekirdekleri, dünya barista şampiyonlarının vazgeçilmezi olmaya devam ediyor.',
  $$Yirgacheffe. Etiyopya'nın güney kesiminde, 1700 ila 2200 metre yükseklikte saklı kalan bu küçük bölge, kahve dünyasının kutsal toprakları arasında gösterilir.

### Neden Bu Kadar Özel?

**Terroir:** Toprak mineralleri, ormanların yarattığı nem dengesi ve güneş açısı, buradaki çekirdeklere kendine özgü bir asidite ve hafiflik kazandırır.

**İşleme Yöntemi:** Hem yıkamalı (washed) hem doğal (natural) yöntemle işlenen Yirgacheffe fasulyeleri her iki yöntemde de etkileyici profiller sunar.

**Genetik Çeşitlilik:** Etiyopya, arabica kafanın gen havuzunun merkezidir.

### Esprezzo ve Yirgacheffe

Menümüzdeki V60 seçeneğinde zaman zaman özel Yirgacheffe partileriyle çalışıyoruz.$$,
  'Can Demir',
  '2026-01-10',
  '7 dk',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=85&auto=format&fit=crop',
  false,
  true,
  array['etiyopya', 'yirgacheffe', 'köken', 'specialty']
)
on conflict (slug) do nothing;
