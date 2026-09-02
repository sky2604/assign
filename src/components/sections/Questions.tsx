import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { questions } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT_EXPO } from '../../lib/motion'

export default function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-ink-soft relative border-y border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          03, My questions
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Seven things I genuinely don&rsquo;t know yet.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          Each would change my direction. Tap one to see why it matters.
        </motion.p>

        <motion.div {...staggerContainer(0.06)} className="mt-9 space-y-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div key={item.question} variants={staggerItem} className="ease-signature glass-card overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="ease-signature flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03] sm:px-6"
                >
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 text-xs font-semibold text-violet-400/70">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-medium text-violet-50 sm:text-base">{item.question}</span>
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: EASE_OUT_EXPO }}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 text-violet-300/70"
                  >
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-violet-200/75 sm:px-6 sm:pl-14">
                        {item.whyItMatters}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
