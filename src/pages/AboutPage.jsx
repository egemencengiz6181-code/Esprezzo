import PageHero from '../components/PageHero'
import About from '../components/About'

const IMAGE = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1800&q=85&auto=format&fit=crop'

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Biz kimiz?"
        title="Hikayemiz"
        subtitle="Kahveyle başlayan, tutkuyla büyüyen bir yolculuk."
        image={IMAGE}
        breadcrumb="Hakkımızda"
      />
      <About />
    </>
  )
}
