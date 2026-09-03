import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { whyHard, orchestrationComplexity } from '../../data/content'
import { fadeUp, fadeIn, staggerContainer, staggerItem } from '../../lib/motion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// Named substrings lifted verbatim from whyHard.buyerRoleGap, surfaced as chips so the
// gap between FlytBase (zero named roles) and its competitors (named roles/wins) is seen,
// not just read in the paragraph beneath.
const PERCEPTO_CHIPS = ['Director of operations transformation', 'Power plant manager', 'SVP business transformation']
const SKYDIO_CHIPS = ['Public safety', 'Defense', 'Energy']
const SKYDIO_NAMED_WIN = 'U.S. Air Forces Central selects Skydio Dock to secure U.S. airbases.'

// Section-local scroll thresholds at which each orchestration item unlocks. Tuned to the
// item block's approximate position near the tail of this (deliberately long) section.
const ITEM_REVEAL_THRESHOLDS = [0.58, 0.74, 0.89]

export default function Complexity() {
  const sectionRef = useSectionRef('complexity')
  const rawProgress = useSectionProgress('complexity')
  const prefersReducedMotion = usePrefersReducedMotion()
  // Reduced motion skips the staged unlock entirely, everything is simply present.
  const progress = prefersReducedMotion ? 1 : rawProgress

  const revealedFlags = ITEM_REVEAL_THRESHOLDS.map((threshold) => progress >= threshold)
  const revealedCount = revealedFlags.filter(Boolean).length
  const linkFillPercent = (revealedCount / orchestrationComplexity.items.length) * 100

  return (
    <section id="complexity" ref={sectionRef} className="relative min-h-[170vh] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {whyHard.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {whyHard.heading}
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          {whyHard.intro}
        </motion.p>

        {/* Three category quotes, deliberately misaligned and cross-linked to feel like
            they're pulling apart rather than sitting in tidy agreement. */}
        <motion.p {...fadeUp(0.14)} className="mt-16 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          Three clicks, three different mental models of the same product
        </motion.p>

        <div className="relative mt-8">
          <motion.div {...staggerContainer(0.12)} className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
            {whyHard.categoryDescriptions.map((item, index) => (
              <Fragment key={item.source}>
                <motion.div
                  variants={staggerItem}
                  className={`ease-signature glass-card relative z-0 flex flex-col rounded-2xl p-6 ${
                    index === 0
                      ? 'sm:z-10 sm:-rotate-2 sm:translate-y-3'
                      : index === 1
                        ? 'sm:z-20 sm:rotate-1 sm:-translate-y-3'
                        : 'sm:z-10 sm:rotate-2 sm:translate-y-4'
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.12em] text-violet-300/70">{item.source}</span>
                  <span className="mt-4 flex-1 text-lg font-medium leading-snug text-white">&ldquo;{item.quote}&rdquo;</span>
                </motion.div>
                {index < whyHard.categoryDescriptions.length - 1 && (
                  <div className="flex justify-center sm:hidden" aria-hidden="true">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-rose-300/40 bg-ink text-xs font-semibold text-rose-300">
                      &ne;
                    </span>
                  </div>
                )}
              </Fragment>
            ))}
          </motion.div>
          {/* Faint conflict connectors between the misaligned cards, desktop only. */}
          <div className="pointer-events-none absolute inset-0 z-30 hidden sm:block" aria-hidden="true">
            <span className="absolute left-1/3 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose-300/40 bg-ink text-xs font-semibold text-rose-300">
              &ne;
            </span>
            <span className="absolute left-2/3 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose-300/40 bg-ink text-xs font-semibold text-rose-300">
              &ne;
            </span>
          </div>
        </div>

        <motion.p {...fadeUp(0.1)} className="mt-10 max-w-2xl text-sm leading-relaxed text-violet-100/80 sm:text-base">
          {whyHard.categoryTakeaway}
        </motion.p>

        {/* Buyer-role gap: FlytBase's slot stays visibly empty while its competitors show
            named roles and wins, so the gap is seen, not just read. */}
        <motion.p {...fadeUp(0.1)} className="mt-16 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          Zero named buyer roles, against two competitors that have them
        </motion.p>

        <motion.div {...staggerContainer(0.12)} className="mt-6 grid gap-4 sm:grid-cols-3">
          <motion.div variants={staggerItem} className="ease-signature relative rounded-2xl border border-dashed border-rose-400/30 bg-rose-500/[0.04] p-6">
            <p className="text-sm font-semibold text-rose-200">FlytBase</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[0, 1, 2].map((slot) => (
                <span
                  key={slot}
                  className="rounded-full border border-dashed border-rose-300/30 px-3 py-1 text-xs text-rose-200/40"
                >
                  buyer role
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-violet-100/75">{whyHard.buyerRoleGap.flytbase}</p>
          </motion.div>

          <motion.div variants={staggerItem} className="ease-signature glass-card rounded-2xl p-6">
            <p className="text-sm font-semibold text-violet-100">Percepto</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PERCEPTO_CHIPS.map((chip) => (
                <span key={chip} className="tag-fact rounded-full px-3 py-1 text-xs font-medium">
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-violet-100/75">{whyHard.buyerRoleGap.percepto}</p>
          </motion.div>

          <motion.div variants={staggerItem} className="ease-signature glass-card rounded-2xl p-6">
            <p className="text-sm font-semibold text-violet-100">Skydio</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKYDIO_CHIPS.map((chip) => (
                <span key={chip} className="tag-fact rounded-full px-3 py-1 text-xs font-medium">
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs italic text-violet-300/60">Named win: {SKYDIO_NAMED_WIN}</p>
            <p className="mt-4 text-sm leading-relaxed text-violet-100/75">{whyHard.buyerRoleGap.skydio}</p>
          </motion.div>
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-8 max-w-2xl border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-200/75 sm:text-base">
          {whyHard.buyerRoleGap.implication}
        </motion.p>

        <motion.p {...fadeIn(0.1)} className="mt-10 max-w-2xl text-sm leading-relaxed text-violet-300/60">
          {whyHard.reviewGap}
        </motion.p>

        {/* Orchestration complexity: the deeper you scroll, the more compounding
            failure modes surface, revealed one at a time and visibly linked together. */}
        <motion.p {...fadeUp()} className="mt-24 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          {orchestrationComplexity.eyebrow}
        </motion.p>
        <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          {orchestrationComplexity.heading}
        </motion.h3>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          {orchestrationComplexity.intro}
        </motion.p>

        <p className="mt-8 text-xs uppercase tracking-[0.1em] text-violet-300/50">
          {revealedCount} of {orchestrationComplexity.items.length} compounding factors surfaced, keep scrolling
        </p>

        <div className="relative mt-6">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10 sm:left-[19px]" aria-hidden="true">
            <div
              className="w-full bg-gradient-to-b from-violet-400/80 to-fuchsia-400/60 transition-[height] duration-500 ease-out"
              style={{ height: `${linkFillPercent}%` }}
            />
          </div>

          <div className="space-y-5">
            {orchestrationComplexity.items.map((item, index) => {
              const revealed = revealedFlags[index]
              return (
                <div key={item.title} className="relative pl-10 sm:pl-12">
                  <span
                    className={`ease-signature absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-500 sm:h-10 sm:w-10 ${
                      revealed ? 'border-violet-300/60 bg-violet-500/20 text-white' : 'border-white/10 bg-white/[0.02] text-violet-300/30'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={`ease-signature glass-card rounded-2xl p-6 transition-all duration-500 ${
                      revealed ? 'opacity-100 translate-x-0 blur-0' : 'opacity-40 translate-x-1 blur-[1px]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-violet-100/70">
                      {revealed ? item.description : 'Compounds with the factor above, keep scrolling to surface it.'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <motion.p {...fadeUp(0.1)} className="mt-10 max-w-2xl border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-100/85 sm:text-base">
          {orchestrationComplexity.translation}
        </motion.p>
      </div>
    </section>
  )
}
