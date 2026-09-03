import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { hero } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSectionRef } from '../lib/scrollStory'
import { EASE_OUT_EXPO } from '../lib/motion'

interface HeroProps {
  onOpenDocument: () => void
}

export default function Hero({ onOpenDocument }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useSectionRef('hero')

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bg-radial-hero relative z-10 flex min-h-[100svh] w-full flex-col overflow-hidden pt-20"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="glass-card rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-violet-200/85"
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE_OUT_EXPO }}
          className="text-gradient-name mt-7 font-bold tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 6.2vw, 4.6rem)', lineHeight: 1.06 }}
        >
          {hero.headline}
          <br />
          {hero.headlineLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-violet-100/75 sm:text-base"
        >
          {hero.thesis}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton
            onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
            className="ease-signature inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-300 via-indigo-400 to-fuchsia-400 px-7 py-3 text-sm font-semibold text-ink shadow-[0_12px_32px_-10px_rgba(124,58,237,0.7)] transition-transform duration-300"
          >
            {hero.primaryCta}
          </MagneticButton>

          <MagneticButton
            onClick={onOpenDocument}
            className="ease-signature glass-card inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-violet-50 transition-colors duration-300 hover:border-violet-300/40"
          >
            {hero.secondaryCta}
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: EASE_OUT_EXPO }}
        className="relative z-10 mb-8 flex flex-col items-center gap-2 px-6 text-violet-200/60"
      >
        <span className="text-xs lowercase tracking-[0.05em]">a journey through the thinking, not a page about it</span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: EASE_OUT_EXPO }}
        >
          <path d="M8 1V19M8 19L1 12M8 19L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
import { motion } from 'framer-motion'
import HeroObject from './HeroObject'
import MagneticButton from './MagneticButton'
import { hero } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { EASE_OUT_EXPO } from '../lib/motion'

interface HeroProps {
  onOpenDocument: () => void
}

export default function Hero({ onOpenDocument }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section id="hero" className="bg-radial-hero relative flex min-h-[100svh] w-full flex-col overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <HeroObject />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="glass-card rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-violet-200/85"
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE_OUT_EXPO }}
          className="text-gradient-name mt-7 font-bold tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 6.2vw, 4.6rem)', lineHeight: 1.06 }}
        >
          {hero.headline}
          <br />
          {hero.headlineLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-violet-100/75 sm:text-base"
        >
          {hero.thesis}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton
            onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
            className="ease-signature inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-300 via-indigo-400 to-fuchsia-400 px-7 py-3 text-sm font-semibold text-ink shadow-[0_12px_32px_-10px_rgba(124,58,237,0.7)] transition-transform duration-300"
          >
            {hero.primaryCta}
          </MagneticButton>

          <MagneticButton
            onClick={onOpenDocument}
            className="ease-signature glass-card inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-violet-50 transition-colors duration-300 hover:border-violet-300/40"
          >
            {hero.secondaryCta}
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: EASE_OUT_EXPO }}
        className="relative z-10 mb-8 flex flex-col items-center gap-2 px-6 text-violet-200/60"
      >
        <span className="text-xs lowercase tracking-[0.05em]">the diagnosis, the evidence, the decision</span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: EASE_OUT_EXPO }}
        >
          <path d="M8 1V19M8 19L1 12M8 19L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
