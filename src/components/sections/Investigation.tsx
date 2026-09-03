import { useState } from 'react'
import { motion } from 'framer-motion'
import { investigation, knowDontKnow, type SignalItem } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'

type TabKey = 'fact' | 'inference' | 'assumption' | 'hypothesis'

const tabs: { key: TabKey; label: string; tagClass: string; description: string }[] = [
  { key: 'fact', label: 'Fact', tagClass: 'tag-fact', description: 'Independently verifiable, checked against public sources.' },
  { key: 'inference', label: 'Inference', tagClass: 'tag-inference', description: 'Reasoned from the facts above, not directly observed.' },
  { key: 'assumption', label: 'Assumption', tagClass: 'tag-assumption', description: 'Held explicitly, with a stated condition that would overturn it.' },
  { key: 'hypothesis', label: 'Hypothesis', tagClass: 'tag-hypothesis', description: 'The working bet. Held loosely, on purpose, with named counter-evidence.' },
]

const trustPercent: Record<SignalItem['trust'], number> = {
  highest: 100,
  high: 78,
  medium: 56,
  low: 34,
  lowest: 18,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

// Where, across this section's own scroll-through, the signal timeline starts and finishes lighting up.
const SIGNALS_REVEAL_START = 0.32
const SIGNALS_REVEAL_END = 0.88

export default function Investigation() {
  const [active, setActive] = useState<TabKey>('fact')
  const activeTab = tabs.find((t) => t.key === active)!
  const prefersReducedMotion = usePrefersReducedMotion()
  const sectionRef = useSectionRef('investigation')
  const progress = useSectionProgress('investigation')

  const signalCount = investigation.signals.length
  const rawReveal = prefersReducedMotion
    ? signalCount
    : clamp(
        ((progress - SIGNALS_REVEAL_START) / (SIGNALS_REVEAL_END - SIGNALS_REVEAL_START)) * signalCount,
        0,
        signalCount,
      )

  return (
    <section
      id="investigation"
      ref={sectionRef}
      className="bg-ink-soft/30 relative border-y border-white/5 px-6 py-28 sm:py-40"
    >
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {investigation.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {investigation.heading}
        </motion.h2>

        {/* Part one, sorting what's known, from the old know/don't-know ladder */}
        <div className="mt-20 sm:mt-28">
          <motion.p {...fadeUp()} className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400/60">
            First, how I sort what I know
          </motion.p>
          <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-xl font-semibold text-white sm:text-2xl">
            {knowDontKnow.heading}
          </motion.h3>
          <motion.p {...fadeUp(0.1)} className="mt-4 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
            {knowDontKnow.intro}
          </motion.p>

          <div role="tablist" aria-label="Evidence category" className="mt-8 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active === tab.key}
                onClick={() => setActive(tab.key)}
                className={`ease-signature flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
                  active === tab.key ? tab.tagClass : 'glass-card text-violet-200/60 hover:text-violet-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.p key={`${active}-desc`} {...fadeUp(0)} className="mt-4 text-sm text-violet-300/60">
            {activeTab.description}
          </motion.p>

          {active !== 'hypothesis' && active !== 'assumption' && (
            <motion.div key={active} {...staggerContainer(0.06)} className="mt-6 grid gap-3 sm:grid-cols-2">
              {(active === 'fact' ? knowDontKnow.facts : knowDontKnow.inferences).map((item, index) => (
                <motion.div key={index} variants={staggerItem} className="ease-signature glass-card rounded-xl p-5">
                  <p className="text-sm leading-relaxed text-violet-50/85">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {active === 'assumption' && (
            <motion.div key="assumption" {...staggerContainer(0.06)} className="mt-6 space-y-3">
              {knowDontKnow.assumptions.map((item, index) => (
                <motion.div key={index} variants={staggerItem} className="ease-signature glass-card rounded-xl p-5">
                  <p className="text-sm leading-relaxed text-violet-50/85">{item.text}</p>
                  <p className="tag-assumption mt-3 inline-block rounded-lg px-3 py-1.5 text-xs leading-relaxed">
                    Would change my mind if: {item.wouldChangeMind}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {active === 'hypothesis' && (
            <motion.div key="hypothesis" {...fadeUp(0)} className="mt-6">
              <div className="ease-signature glass-card rounded-2xl border-fuchsia-300/25 p-6 sm:p-7">
                <p className="text-base leading-relaxed text-white sm:text-lg">{knowDontKnow.hypothesis.text}</p>
              </div>
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.1em] text-violet-300/70">
                What would disprove it
              </p>
              <div className="mt-3 space-y-2.5">
                {knowDontKnow.hypothesis.counterEvidence.map((item, index) => (
                  <div key={index} className="flex gap-3 rounded-xl bg-white/[0.03] p-4">
                    <span className="mt-0.5 text-xs font-semibold text-fuchsia-300/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm leading-relaxed text-violet-100/75">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Part two, closing the gaps: ranked signal timeline, lights up as you scroll */}
        <div className="mt-24 sm:mt-32">
          <motion.p {...fadeUp()} className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400/60">
            Then, how I&rsquo;d close the gaps
          </motion.p>
          <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-xl font-semibold text-white sm:text-2xl">
            Signal, ranked by how much I&rsquo;d trust it
          </motion.h3>
          <motion.p {...fadeUp(0.1)} className="mt-4 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
            Keep scrolling. Each signal connects and lights up in the order I&rsquo;d actually go pursue it, echoing
            the connections forming behind this text.
          </motion.p>

          <div className="relative mt-10">
            <div className="absolute top-2 bottom-2 left-[13px] w-px bg-white/10" aria-hidden="true" />
            <div
              className="ease-signature absolute top-2 left-[13px] w-px bg-gradient-to-b from-violet-400 via-fuchsia-400 to-violet-400 transition-[height] duration-200"
              style={{ height: `${(rawReveal / signalCount) * 100}%` }}
              aria-hidden="true"
            />
            <div className="space-y-4">
              {investigation.signals.map((signal, index) => {
                const litFraction = clamp(rawReveal - index, 0, 1)
                const isLit = litFraction > 0.05
                return (
                  <div key={signal.rank} className="relative pl-10">
                    <span
                      className="ease-signature absolute top-1 left-0 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300"
                      style={{
                        borderColor: isLit ? 'rgba(232,121,249,0.6)' : 'rgba(196,181,253,0.2)',
                        backgroundColor: isLit ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.03)',
                        color: isLit ? '#f0abfc' : 'rgba(196,181,253,0.4)',
                      }}
                    >
                      {signal.rank}
                    </span>
                    <div
                      className="ease-signature glass-card rounded-xl p-5 transition-opacity duration-500 sm:p-6"
                      style={{ opacity: 0.4 + litFraction * 0.6 }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white sm:text-base">{signal.title}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-violet-100/70">{signal.description}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 sm:w-32 sm:flex-col sm:items-end sm:gap-1.5">
                          <div className="h-1.5 w-full max-w-[110px] overflow-hidden rounded-full bg-white/10 sm:max-w-none">
                            <div
                              className="ease-signature h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-[width] duration-200"
                              style={{ width: `${trustPercent[signal.trust] * litFraction}%` }}
                            />
                          </div>
                          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-violet-300/60">
                            {signal.trust} trust
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {investigation.stagedPlan.map((stage) => (
              <motion.div key={stage.week} {...fadeUp(0.06)} className="ease-signature glass-card rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-300/70">{stage.week}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-violet-50/85">{stage.actions}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part three, the branch point this all resolves to */}
        <motion.div
          {...fadeUp(0.1)}
          className="mt-24 rounded-3xl border border-violet-300/25 bg-violet-400/[0.06] p-7 sm:mt-32 sm:p-9"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-violet-200">
            {investigation.decisiveCut.heading}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Tracks by rep</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{investigation.decisiveCut.byRep}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-300/80">Tracks by vertical</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{investigation.decisiveCut.byVertical}</p>
            </div>
          </div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm italic leading-relaxed text-violet-200/75">
            {investigation.decisiveCut.stance}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
