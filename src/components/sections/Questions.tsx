import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { questions } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem, EASE_OUT_EXPO } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'

/** Fixed scatter per node, index-matched to `questions`. Purely presentational offsets, not content. */
const NODE_OFFSETS: { y: number; rotate: number }[] = [
  { y: -14, rotate: -3.5 },
  { y: 18, rotate: 2.5 },
  { y: -22, rotate: 4 },
  { y: 10, rotate: -2.5 },
  { y: -16, rotate: 3 },
  { y: 20, rotate: -4 },
  { y: -8, rotate: 1.5 },
]

export default function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useSectionRef('questions')
  const progress = useSectionProgress('questions')

  // 1 = fully scattered (section just entered), 0 = settled toward order (about to leave, foreshadowing investigation)
  const scatter = prefersReducedMotion ? 0 : 1 - progress
  const settledPercent = Math.round((1 - scatter) * 100)

  return (
    <section
      id="questions"
      ref={sectionRef}
      className="bg-ink-soft/30 relative border-y border-white/5 px-6 py-28 sm:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          03, My questions
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          Seven things I genuinely don&rsquo;t know yet.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          Scattered on purpose, this is what unresolved looks like. Tap a node to open it. Keep scrolling and watch
          the field start to settle, the same drift toward order the investigation ahead makes explicit.
        </motion.p>

        <motion.div
          {...staggerContainer(0.07)}
          className="mt-16 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {questions.map((item, index) => {
            const isOpen = openIndex === index
            const offset = NODE_OFFSETS[index % NODE_OFFSETS.length]
            const translateY = offset.y * scatter
            const rotate = offset.rotate * scatter

            return (
              <div
                key={item.question}
                style={{ transform: `translateY(${translateY}px) rotate(${rotate}deg)` }}
                className="ease-signature transition-transform duration-500"
              >
                <motion.div variants={staggerItem}>
                  <motion.div
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -2 }}
                    animate={{
                      scale: isOpen ? 1.03 : 1,
                      boxShadow: isOpen
                        ? '0 0 0 1px rgba(232,121,249,0.45), 0 24px 60px -20px rgba(167,139,250,0.55)'
                        : '0 0 0 1px rgba(196,181,253,0.14), 0 0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: EASE_OUT_EXPO }}
                    className="glass-card relative overflow-hidden rounded-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="ease-signature flex w-full items-start gap-3 px-5 py-5 text-left transition-colors duration-300 hover:bg-white/[0.03] sm:px-6"
                    >
                      <span className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
                        {!prefersReducedMotion && (
                          <motion.span
                            animate={
                              isOpen
                                ? { scale: [1, 1.8, 1.4], opacity: [0.6, 0, 0.4] }
                                : { scale: 1, opacity: 0 }
                            }
                            transition={{ duration: 1.8, repeat: isOpen ? Infinity : 0, ease: 'easeOut' }}
                            className="absolute inset-0 rounded-full bg-fuchsia-400/50"
                          />
                        )}
                        <span
                          className={`ease-signature relative flex h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                            isOpen ? 'bg-fuchsia-300' : 'bg-violet-400/70'
                          }`}
                        />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-400/60">
                          Node {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-1 block text-sm font-medium text-violet-50 sm:text-base">
                          {item.question}
                        </span>
                      </span>
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
                </motion.div>
              </div>
            )
          })}
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-16 text-xs uppercase tracking-[0.14em] text-violet-400/50">
          {settledPercent}% settled
        </motion.p>
      </div>
    </section>
  )
}
