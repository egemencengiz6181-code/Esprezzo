import PageHero from '../components/PageHero'
import Blog from '../components/Blog'

const IMAGE = 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1800&q=85&auto=format&fit=crop'

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="İçerik & Haberler"
        title="Kahve Hikayeleri"
        subtitle="Kahve kültürü, demleme teknikleri ve dünyadan köken hikayeleri."
        image={IMAGE}
        breadcrumb="Blog"
      />
      <Blog />
    </>
  )
}
