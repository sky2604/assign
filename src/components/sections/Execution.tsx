import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { strategy } from '../../data/content'
import { fadeUp, EASE_OUT_EXPO } from '../../lib/motion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'

const STAGE_LABELS = ['Who', 'What', 'When', 'Channel', 'Asset', 'Sales', 'Measurement'] as const

interface FlowStage {
  tag: (typeof STAGE_LABELS)[number]
  label: string
  detail: string
}

// Reframe strategy.ownership's six operational facts as a literal Who -> What -> When -> Channel -> Asset -> Sales -> Measurement flow.
function buildFlow(): FlowStage[] {
  const [creates, usesWhen, triggers, measured, ownsLongTerm, revenue] = strategy.ownership
  return [
    { tag: 'Who', label: creates.label, detail: creates.detail },
    { tag: 'What', label: 'The Message-Gap Map itself', detail: strategy.heading },
    { tag: 'When', label: usesWhen.label, detail: usesWhen.detail },
    { tag: 'Channel', label: triggers.label, detail: triggers.detail },
    { tag: 'Asset', label: ownsLongTerm.label, detail: ownsLongTerm.detail },
    { tag: 'Sales', label: measured.label, detail: measured.detail },
    { tag: 'Measurement', label: revenue.label, detail: revenue.detail },
  ]
}

export default function Execution() {
  const sectionRef = useSectionRef('execution')
  const progress = useSectionProgress('execution')
  const [activeStage, setActiveStage] = useState<number | null>(null)
  const flow = useMemo(buildFlow, [])

  // How far along the pipeline the scroll-driven progress indicator has activated, 0..flow.length
  const activatedCount = Math.min(flow.length, Math.floor(progress * flow.length * 1.35))

  return (
    <section
      id="execution"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          07, Execution
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          Now show it operational.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-300/60 sm:text-base">
          The architecture is the map. This is the pipe it actually runs through, week to week: who touches it, what
          it is, when it gets used, what makes it change, who is accountable for it, and how anyone would know it is
          working. Scroll to activate each stage, or click one to open it.
        </motion.p>

        {/* Scroll-linked pipeline progress rail */}
        <div className="relative mt-16 hidden sm:block">
          <div className="absolute left-0 right-0 top-[27px] h-px bg-white/10" />
          <div
            className="ease-signature absolute left-0 top-[27px] h-px bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-300 transition-[width] duration-300"
            style={{ width: `${(Math.max(activatedCount, activeStage !== null ? activeStage + 1 : 0) / flow.length) * 100}%` }}
          />
          <div className="grid grid-cols-7 gap-2">
            {flow.map((stage, index) => {
              const isActivated = index < activatedCount || activeStage !== null && index <= activeStage
              const isOpen = activeStage === index
              return (
                <button
                  key={stage.tag}
                  type="button"
                  onClick={() => setActiveStage(isOpen ? null : index)}
                  onMouseEnter={() => setActiveStage(index)}
                  className="group flex flex-col items-center text-center focus:outline-none"
                >
                  <span
                    className={`ease-signature relative z-10 flex h-14 w-14 items-center justify-center rounded-full border text-[11px] font-semibold uppercase tracking-[0.06em] transition-all duration-300 ${
                      isOpen
                        ? 'border-fuchsia-300 bg-fuchsia-400/20 text-white shadow-[0_0_24px_-4px_rgba(232,121,249,0.65)]'
                        : isActivated
                          ? 'border-violet-300/70 bg-violet-400/15 text-violet-100'
                          : 'border-white/15 bg-ink-raised text-violet-300/50'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`ease-signature mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                      isActivated ? 'text-violet-200' : 'text-violet-400/40'
                    }`}
                  >
                    {stage.tag}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail panel, desktop: expands beneath the rail for the active stage */}
        <div className="mt-6 hidden min-h-[132px] sm:block">
          {activeStage !== null && (
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="ease-signature glass-card rounded-2xl p-6 sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-fuchsia-300/80">
                {flow[activeStage].tag} &middot; {flow[activeStage].label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-violet-50/90 sm:text-base">{flow[activeStage].detail}</p>
            </motion.div>
          )}
          {activeStage === null && (
            <p className="text-sm italic leading-relaxed text-violet-300/45">Hover or click a stage above to open it.</p>
          )}
        </div>

        {/* Mobile: literal top-to-bottom flow with connectors, always expanded */}
        <div className="relative mt-14 space-y-0 sm:hidden">
          {flow.map((stage, index) => (
            <motion.div key={stage.tag} {...fadeUp(0.04 * index)} className="relative pb-8 pl-10 last:pb-0">
              {index < flow.length - 1 && <span className="absolute left-[15px] top-9 h-full w-px bg-white/10" />}
              <span className="ease-signature absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/60 bg-ink text-[10px] font-semibold text-violet-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-fuchsia-300/80">{stage.tag} &middot; {stage.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{stage.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Distribution: how this actually gets in front of a rep */}
        <motion.div {...fadeUp(0.1)} className="mt-20 border-t border-white/10 pt-12">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">{strategy.distribution.heading}</p>
          <p className="mt-4 text-lg font-medium text-white sm:text-xl">{strategy.distribution.approach}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-violet-100/75 sm:text-base">{strategy.distribution.plan}</p>
          <p className="mt-4 max-w-3xl text-sm italic leading-relaxed text-violet-300/60">{strategy.distribution.standard}</p>
        </motion.div>
      </div>
    </section>
  )
}
