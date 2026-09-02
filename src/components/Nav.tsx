import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { nav } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface NavProps {
  onOpenDocument: () => void
}

export default function Nav({ onOpenDocument }: NavProps) {
  const [activeId, setActiveId] = useState<string>(nav[0]?.id ?? '')
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const mostVisible = visible.reduce((best, entry) =>
          entry.intersectionRatio > best.intersectionRatio ? entry : best,
        )
        setActiveId(mostVisible.target.id)
      },
      { threshold: [0.15, 0.3, 0.5], rootMargin: '-20% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function goToSection(id: string) {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className={`ease-signature fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => goToSection('hero')}
          className="text-left text-xs font-medium uppercase tracking-[0.16em] text-violet-100/80 transition-colors duration-300 hover:text-white"
        >
          Sky Sinha
          <span className="hidden text-violet-300/50 sm:inline"> &middot; FlytBase PMM case study</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className={`ease-signature rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${
                activeId === item.id ? 'bg-white/10 text-white' : 'text-violet-200/60 hover:text-violet-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenDocument}
          className="ease-signature glass-card flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-violet-100 transition-colors duration-300 hover:border-violet-300/40 hover:text-white"
        >
          Read detailed document
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.header>
  )
}
