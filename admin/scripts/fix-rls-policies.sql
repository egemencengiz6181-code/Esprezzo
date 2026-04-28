-- ════════════════════════════════════════
--  RLS POLİTİKA DÜZELTMESİ
--  auth.role() = 'authenticated'  →  auth.uid() IS NOT NULL
--  Supabase Dashboard → SQL Editor → Bu dosyayı yapıştır ve çalıştır
-- ════════════════════════════════════════

-- ── PRODUCTS ─────────────────────────────
DROP POLICY IF EXISTS "Admin full access products" ON public.products;

CREATE POLICY "Admin full access products"
  ON public.products FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── BLOG POSTS ────────────────────────────
DROP POLICY IF EXISTS "Admin read all blog_posts"   ON public.blog_posts;
DROP POLICY IF EXISTS "Admin full access blog_posts" ON public.blog_posts;

CREATE POLICY "Admin full access blog_posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── CONTENT ──────────────────────────────
DROP POLICY IF EXISTS "Admin full access content" ON public.content;

CREATE POLICY "Admin full access content"
  ON public.content FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── SETTINGS ─────────────────────────────
DROP POLICY IF EXISTS "Admin full access settings" ON public.settings;

CREATE POLICY "Admin full access settings"
  ON public.settings FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
