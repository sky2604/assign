import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '../Modal'
import { strategy, notDoing, causalChain, categoryQuestion } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem, EASE_OUT_EXPO } from '../../lib/motion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = clamp01((v - inMin) / (inMax - inMin))
  return outMin + (outMax - outMin) * t
}

const ARCHITECTURE_STAGES = ['Insight', 'Decision', 'Strategy', 'Action'] as const
const WEAKEST_LINK_INDEX = 2

function ArrowConnector({ opacity = 1 }: { opacity?: number }) {
  return (
    <div className="flex w-8 shrink-0 items-center justify-center text-violet-400/40" style={{ opacity }} aria-hidden>
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <path d="M0 5H18M18 5L13 1M18 5L13 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/**
 * State 06. The insight becomes a strategic architecture: Insight -> Decision ->
 * Strategy -> Action, echoing the layered rings the 3D rig assembles behind this
 * section. Absorbs three formerly-standalone sections (NotDoing, CausalChain,
 * CategoryQuestion) as sequential sub-beats after the core architecture, each with
 * its own visual rhythm so this long section doesn't read as one repeating template.
 */
export default function Strategy() {
  const [showMiningRow, setShowMiningRow] = useState(false)
  const sectionRef = useSectionRef('strategy')
  const prefersReducedMotion = usePrefersReducedMotion()
  const progress = useSectionProgress('strategy')

  return (
    <section id="strategy" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {strategy.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {strategy.heading}
        </motion.h2>

        <motion.div {...fadeUp(0.1)} className="ease-signature glass-card mt-8 rounded-3xl p-7 sm:p-9">
          <p className="text-base leading-relaxed text-violet-50/90 sm:text-lg">{strategy.thesis}</p>
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-6 max-w-2xl border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-200/75 sm:text-base">
          {strategy.whyNotBattlecardFirst}
        </motion.p>

        {/* Insight -> Decision -> Strategy -> Action: the architecture this whole section builds, made literal, echoing the 3D rig's layered rings behind it. */}
        <motion.div {...fadeUp(0.14)} className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Insight, Decision, Strategy, Action">
          {ARCHITECTURE_STAGES.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={
                  label === 'Strategy'
                    ? 'text-gradient-accent text-sm font-semibold uppercase tracking-[0.14em]'
                    : 'text-xs font-semibold uppercase tracking-[0.14em] text-violet-400/40'
                }
              >
                {label}
              </span>
              {i < ARCHITECTURE_STAGES.length - 1 && <span className="text-violet-500/30">&rarr;</span>}
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-16 text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">
          Ownership, before I&rsquo;d commit to building it
        </motion.p>
        <p className="mt-2 max-w-xl text-xs leading-relaxed text-violet-300/50">
          Six connected stages, not six independent facts. Each one depends on the last holding.
        </p>

        <div className="mt-5 flex flex-wrap items-stretch gap-y-4">
          {strategy.ownership.map((item, i) => {
            const arrowOpacity = prefersReducedMotion ? 1 : remap(progress, 0.02 + i * 0.025, 0.07 + i * 0.025, 0, 1)
            return (
              <div key={item.label} className="flex items-stretch">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: EASE_OUT_EXPO }}
                  className="ease-signature glass-card min-w-[210px] max-w-[240px] rounded-xl p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{item.detail}</p>
                </motion.div>
                {i < strategy.ownership.length - 1 && <ArrowConnector opacity={arrowOpacity} />}
              </div>
            )
          })}
        </div>

        <motion.p {...fadeUp(0.1)} className="mt-16 text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">
          {strategy.miningExample.heading}
        </motion.p>

        <motion.button
          {...fadeUp(0.06)}
          type="button"
          onClick={() => setShowMiningRow(true)}
          className="ease-signature glass-card group mt-5 w-full rounded-2xl p-6 text-left transition-colors duration-300 hover:border-violet-300/40 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="tag-hypothesis inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">Draft row</span>
              <p className="mt-3 text-lg font-semibold text-white">{strategy.miningExample.subheading}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-100/70">{strategy.miningExample.intro}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0 text-violet-300/60 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 8H15M15 8L9 2M15 8L9 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="ease-signature mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet-300 transition-colors duration-300 group-hover:text-white">
            Open the full row
          </p>
        </motion.button>

        <motion.div {...fadeUp(0.1)} className="mt-16">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">{strategy.distribution.heading}</p>
          <p className="mt-4 text-base font-medium text-white sm:text-lg">{strategy.distribution.approach}</p>
          <p className="mt-3 text-sm leading-relaxed text-violet-100/75 sm:text-base">{strategy.distribution.plan}</p>
          <p className="mt-4 text-sm italic leading-relaxed text-violet-300/60">{strategy.distribution.standard}</p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-16 rounded-3xl border border-rose-400/20 bg-rose-500/[0.04] p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-rose-200">{strategy.killTest.heading}</p>
          <div className="mt-5 space-y-3">
            {strategy.killTest.items.map((item, index) => (
              <div key={index} className="flex gap-3">
                <span className="mt-0.5 text-xs font-semibold text-rose-300/70">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-violet-50/85">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Guardrails: what I would not do. A full-bleed tonal shift with a hazard-stripe accent, deliberately, since this beat is about drawing a line. */}
      <div className="-mx-6 mt-20 border-y border-white/5 bg-ink-soft px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div
            aria-hidden
            className="h-[3px] w-20 rounded-full opacity-70"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(251,113,133,0.9) 0px, rgba(251,113,133,0.9) 6px, transparent 6px, transparent 12px)',
            }}
          />
          <motion.p {...fadeUp()} className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
            {notDoing.eyebrow}
          </motion.p>
          <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
            {notDoing.heading}
          </motion.h3>

          <motion.div {...staggerContainer(0.1)} className="mt-9 grid gap-4 sm:grid-cols-3">
            {notDoing.items.map((item) => (
              <motion.div key={item.title} variants={staggerItem} className="ease-signature relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-rose-400/70">
                  <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5.5 5.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-violet-100/70">{item.why}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Why this compounds: an animated flow-line, since the copy is literally describing a chain reaction, not a flat list. */}
        <div className="mt-20">
          <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
            {causalChain.eyebrow}
          </motion.p>
          <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
            {causalChain.heading}
          </motion.h3>

          <div className="relative mt-10 pl-8">
            <div className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-white/10" />
            <motion.div
              aria-hidden
              initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 1.6, ease: EASE_OUT_EXPO }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-fuchsia-300 via-violet-300 to-transparent"
            />
            <div className="space-y-7">
              {causalChain.steps.map((step, index) => {
                const isWeakest = index === WEAKEST_LINK_INDEX
                return (
                  <motion.div key={index} {...fadeUp(index * 0.04)} className="relative">
                    <span
                      className={`ease-signature absolute -left-8 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                        isWeakest ? 'border-amber-300 bg-amber-300/80' : 'border-violet-300/60 bg-ink'
                      }`}
                    />
                    <p className={`text-sm leading-relaxed sm:text-base ${isWeakest ? 'text-amber-100' : 'text-violet-50/85'}`}>
                      {step}
                      {isWeakest && (
                        <span className="tag-assumption ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.08em]">
                          weakest link
                        </span>
                      )}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div {...fadeUp(0.1)} className="ease-signature glass-card mt-10 rounded-2xl p-6 sm:p-7">
            <p className="text-sm leading-relaxed text-violet-50/90 sm:text-base">{causalChain.compoundingAsset}</p>
          </motion.div>

          <motion.p {...fadeUp(0.1)} className="mt-6 text-sm italic leading-relaxed text-violet-300/60">
            {causalChain.weakestLink}
          </motion.p>
        </div>

        {/* The honest open edge, deliberately quieter, this is where the strategy admits its own limit. */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
            {categoryQuestion.eyebrow}
          </motion.p>
          <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
            {categoryQuestion.heading}
          </motion.h3>
          <motion.p {...fadeUp(0.1)} className="mt-5 max-w-xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
            {categoryQuestion.body}
          </motion.p>

          <motion.div {...fadeUp(0.16)} className="ease-signature glass-card mt-8 rounded-2xl border-violet-300/25 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">My provisional default</p>
            <p className="mt-3 text-base leading-relaxed text-white sm:text-lg">{categoryQuestion.default}</p>
          </motion.div>

          <motion.p {...fadeUp(0.1)} className="mt-5 text-sm italic leading-relaxed text-violet-300/60">
            {categoryQuestion.caveat}
          </motion.p>
        </div>
      </div>

      <Modal
        isOpen={showMiningRow}
        onClose={() => setShowMiningRow(false)}
        titleId="mining-row-title"
        title={strategy.miningExample.subheading}
        panelClassName="sm:max-w-2xl"
      >
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Job-to-be-done, hypothesized</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-50/90">{strategy.miningExample.jobToBeDone}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Likely stakeholders in the room</p>
            <div className="mt-2 space-y-2">
              {strategy.miningExample.stakeholders.map((s) => (
                <div key={s.role} className="rounded-lg bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold text-violet-200">{s.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-violet-100/75">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Capabilities that actually serve the job</p>
            <ul className="mt-2 space-y-1.5">
              {strategy.miningExample.capabilities.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-violet-50/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Proof point, pattern-matched</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/75">{strategy.miningExample.proofPoint}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Economic argument, placeholder</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/75">{strategy.miningExample.economicArgument}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Likely objection, status quo</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/75">{strategy.miningExample.objection}</p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
