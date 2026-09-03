import { useState } from 'react'
import { motion } from 'framer-motion'
import { challenge } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** Index of the reasoning option the document actually settles on. */
const CHOSEN_INDEX = 2

export default function Challenge() {
  const sectionRef = useSectionRef('challenge')
  const rawProgress = useSectionProgress('challenge')
  const prefersReducedMotion = usePrefersReducedMotion()
  // Reduced motion gets a hard cut straight to the settled, separated state, no interpolation.
  const progress = prefersReducedMotion ? 1 : rawProgress

  const [activeIndex, setActiveIndex] = useState(CHOSEN_INDEX)

  return (
    <section id="challenge" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {challenge.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {challenge.heading}
        </motion.h2>

        <motion.div {...fadeUp(0.12)} className="ease-signature glass-card mt-9 rounded-3xl p-7 sm:p-9">
          <p className="text-xs uppercase tracking-[0.14em] text-violet-300/70">The brief, as given</p>
          <p className="mt-3 text-base leading-relaxed text-violet-50/90 sm:text-lg">{challenge.prompt}</p>
        </motion.div>

        <motion.p {...fadeUp(0.16)} className="mt-14 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          {challenge.reasoningHeading}
        </motion.p>
        <motion.p {...fadeUp(0.18)} className="mt-1.5 text-xs text-violet-300/50">
          Click each option to see why it stays or goes.
        </motion.p>

        <motion.div {...staggerContainer(0.1)} className="mt-6 grid gap-4 sm:grid-cols-3" role="tablist" aria-label="Candidate problems">
          {challenge.reasoning.map((item, index) => {
            const isChosen = index === CHOSEN_INDEX
            const isActive = index === activeIndex

            // Scroll-tied foreshadowing: the chosen problem lifts clear of the other
            // two the deeper the visitor scrolls, previewing the fragmentation to come.
            const lift = isChosen ? progress * 22 : 0
            const drift = !isChosen ? progress * 10 : 0

            const stateClass = isActive
              ? isChosen
                ? 'border border-violet-300/50 bg-violet-400/10 shadow-[0_18px_50px_-20px_rgba(167,139,250,0.55)]'
                : 'border border-rose-400/30 bg-rose-500/[0.06]'
              : 'glass-card opacity-70 hover:opacity-100'

            return (
              <motion.div key={item.label} variants={staggerItem} className="relative">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  style={{ transform: `translateY(${isChosen ? -lift : drift}px)` }}
                  className={`ease-signature relative w-full rounded-2xl p-6 text-left transition-[background-color,border-color,box-shadow,opacity,transform] duration-300 ${stateClass}`}
                >
                  {isChosen ? (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-violet-500/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                      The pick
                    </span>
                  ) : isActive ? (
                    <span className="absolute -top-2.5 right-4 rounded-full border border-rose-300/40 bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-rose-200">
                      Ruled out
                    </span>
                  ) : null}
                  <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-violet-100/90'}`}>{item.label}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-violet-100/70">{item.description}</p>
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-10 border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-200/70 sm:text-base">
          {challenge.jobPostingNote}
        </motion.p>
      </div>
    </section>
  )
}
