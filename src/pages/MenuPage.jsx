import PageHero from '../components/PageHero'
import Menu from '../components/Menu'

const IMAGE = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1800&q=85&auto=format&fit=crop'

export default function MenuPage() {
  return (
    <>
      <PageHero
        label="Ürün Kataloğu"
        title="Menümüz"
        subtitle="Espresso bazlılardan filtre kahvelere, soğuk içeceklerden tatlılara — tüm seçenekler burada."
        image={IMAGE}
        breadcrumb="Menü"
      />
      <Menu />
    </>
  )
}
