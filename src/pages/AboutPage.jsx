import PageHero from '../components/PageHero'
import About from '../components/About'

const IMAGE = '/cafe/cafe.jpg'

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Biz kimiz?"
        title="Hikayemiz"
        subtitle="Kahveyle başlayan, tutkuyla büyüyen bir yolculuk."
        image={IMAGE}
        breadcrumb="Hakkımızda"
        imagePosition="object-[75%]"
      />
      <About />
    </>
  )
}
