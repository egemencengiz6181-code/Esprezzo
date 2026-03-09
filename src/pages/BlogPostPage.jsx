import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'
import PageHero from '../components/PageHero'

function renderBody(body) {
  return body.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return <div key={i} className="h-4" />
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="font-serif text-xl text-espresso-ivory mt-10 mb-4">
          {trimmed.slice(4)}
        </h3>
      )
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="font-serif text-2xl text-espresso-ivory mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      )
    }
    if (trimmed === '---') {
      return <hr key={i} className="border-espresso-border my-8" />
    }
    // inline **bold**
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g)
    const rendered = parts.map((part, j) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={j} className="text-espresso-ivory font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    )
    return (
      <p key={i} className="text-espresso-muted font-sans font-light text-base leading-relaxed">
        {rendered}
      </p>
    )
  })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const index = blogPosts.findIndex((p) => p.slug === slug)
  const post = blogPosts[index]
  const prev = index > 0 ? blogPosts[index - 1] : null
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null

  useEffect(() => {
    if (!post) navigate('/blog', { replace: true })
    window.scrollTo(0, 0)
  }, [slug, post, navigate])

  if (!post) return null

  return (
    <>
      <PageHero
        label={post.category}
        title={post.title}
        subtitle={`${post.author} · ${post.date} · ${post.readTime} okuma`}
        image={post.image}
        breadcrumb="Blog"
      />

      <section className="py-20 bg-espresso-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-5 mb-10 pb-10 border-b border-espresso-border text-espresso-muted text-xs font-sans"
          >
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-espresso-red" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-espresso-red" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-espresso-red" /> {post.readTime} okuma
            </span>
          </motion.div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            {renderBody(post.body)}
          </motion.div>

          {/* Prev / Next navigation */}
          <div className="mt-20 pt-10 border-t border-espresso-border grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="group flex flex-col gap-2 p-5 border border-espresso-border hover:border-espresso-red transition-colors duration-300"
              >
                <span className="flex items-center gap-2 text-espresso-muted text-[10px] tracking-widest uppercase font-sans">
                  <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" />
                  Önceki Yazı
                </span>
                <span className="font-serif text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 text-sm leading-snug">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="group flex flex-col gap-2 p-5 border border-espresso-border hover:border-espresso-red transition-colors duration-300 sm:items-end sm:text-right"
              >
                <span className="flex items-center gap-2 text-espresso-muted text-[10px] tracking-widest uppercase font-sans">
                  Sonraki Yazı
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="font-serif text-espresso-ivory group-hover:text-espresso-red transition-colors duration-300 text-sm leading-snug">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back link */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-espresso-muted hover:text-espresso-red text-xs tracking-widest uppercase font-sans transition-colors duration-300"
            >
              <ArrowLeft size={14} />
              Tüm Yazılara Dön
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
