import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { causalChain, outcomes } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const WEAKEST_LINK_INDEX = 2

interface LoopNode {
  index: number
  left: number
  top: number
}

function buildLoopNodes(count: number): LoopNode[] {
  const nodes: LoopNode[] = []
  const radius = 40
  for (let i = 0; i < count; i++) {
    const angle = (-90 + i * (360 / count)) * (Math.PI / 180)
    nodes.push({
      index: i,
      left: 50 + radius * Math.cos(angle),
      top: 50 + radius * Math.sin(angle),
    })
  }
  return nodes
}

export default function Learning() {
  const sectionRef = useSectionRef('learning')
  const progress = useSectionProgress('learning')
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const nodes = useMemo(() => buildLoopNodes(causalChain.steps.length), [])

  // pathLength=100 trick: dashoffset 100 = fully hidden, 0 = fully drawn.
  const drawProgress = prefersReducedMotion ? 100 : Math.min(100, progress * 130)
  const dashOffset = 100 - drawProgress

  return (
    <section id="learning" ref={sectionRef} className="bg-ink-soft relative overflow-hidden border-y border-white/5 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          08, Learning &middot; {causalChain.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {causalChain.heading}
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-300/60 sm:text-base">
          This isn&rsquo;t a campaign with an end date. Read it clockwise, the last step feeds the first. Hover a
          point on the loop to read what happens there.
        </motion.p>

        {/* Desktop / tablet: circular feedback loop, scroll-drawn */}
        <div className="relative mx-auto mt-16 hidden aspect-square max-w-lg sm:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <marker id="loopArrowHead" markerWidth="7" markerHeight="7" refX="3.2" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" className="fill-fuchsia-300" />
              </marker>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
            <path
              d="M50,10 A40,40 0 1 1 49.99,10"
              fill="none"
              stroke="url(#loopGradient)"
              strokeWidth="0.9"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={dashOffset}
              markerEnd="url(#loopArrowHead)"
              style={{ transition: prefersReducedMotion ? undefined : 'stroke-dashoffset 0.2s linear' }}
            />
            <defs>
              <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="55%" stopColor="#e879f9" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>

          {nodes.map((node) => {
            const isWeakest = node.index === WEAKEST_LINK_INDEX
            const isActive = activeStep === node.index
            return (
              <button
                key={node.index}
                type="button"
                onMouseEnter={() => setActiveStep(node.index)}
                onFocus={() => setActiveStep(node.index)}
                onClick={() => setActiveStep(isActive ? null : node.index)}
                className="ease-signature absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 focus:outline-none"
                style={{
                  left: `${node.left}%`,
                  top: `${node.top}%`,
                  borderColor: isWeakest ? 'rgba(252,211,77,0.7)' : isActive ? 'rgba(232,121,249,0.8)' : 'rgba(196,181,253,0.35)',
                  backgroundColor: isWeakest ? 'rgba(251,191,36,0.14)' : isActive ? 'rgba(232,121,249,0.18)' : 'rgba(11,7,16,0.85)',
                  color: isWeakest ? '#fcd34d' : isActive ? '#ffffff' : '#c4b5fd',
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
                }}
              >
                {String(node.index + 1).padStart(2, '0')}
              </button>
            )
          })}

          <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.02] p-6 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/60">
              {activeStep !== null ? `Step ${String(activeStep + 1).padStart(2, '0')}` : 'A closed loop'}
            </p>
            <p className="mt-2 text-sm leading-snug text-violet-50/90">
              {activeStep !== null ? causalChain.steps[activeStep] : 'Not a one-time campaign. It repeats, and each pass sharpens the last.'}
            </p>
          </div>
        </div>

        {/* Mobile: vertical chain that visibly loops back to the top */}
        <div className="relative mt-14 sm:hidden">
          <div className="space-y-0">
            {causalChain.steps.map((step, index) => {
              const isWeakest = index === WEAKEST_LINK_INDEX
              return (
                <div key={index} className="relative pb-7 pl-9 last:pb-0">
                  {index < causalChain.steps.length - 1 && <span className="absolute left-[13px] top-8 h-full w-px bg-white/10" />}
                  <span
                    className={`ease-signature absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold ${
                      isWeakest ? 'border-amber-300 bg-amber-300/15 text-amber-200' : 'border-violet-300/60 bg-ink text-violet-200'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <p className={`text-sm leading-relaxed ${isWeakest ? 'text-amber-100' : 'text-violet-50/85'}`}>{step}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-2 flex items-center gap-3 pl-9 text-fuchsia-300/70">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 -scale-x-100">
              <path d="M4 4v6a2 2 0 0 0 2 2h14M14 8l6 4-6 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-xs uppercase tracking-[0.1em]">Feeds back into step one</p>
          </div>
        </div>

        {/* Weakest link, distinctly flagged */}
        <motion.div {...fadeUp(0.1)} className="mt-14 rounded-3xl border border-amber-400/25 bg-amber-400/[0.05] p-7 sm:p-9">
          <span className="tag-assumption inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">
            Weakest link
          </span>
          <p className="mt-4 text-sm leading-relaxed text-amber-50/90 sm:text-base">{causalChain.weakestLink}</p>
        </motion.div>

        {/* Compounding asset */}
        <motion.div {...fadeUp(0.1)} className="ease-signature glass-card mt-6 rounded-2xl p-6 sm:p-7">
          <p className="text-sm leading-relaxed text-violet-50/90 sm:text-base">{causalChain.compoundingAsset}</p>
        </motion.div>

        {/* Outcomes: what the loop realistically produces in 90 days */}
        <div className="mt-20 border-t border-white/10 pt-14">
          <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
            {outcomes.eyebrow}
          </motion.p>
          <motion.h3 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            {outcomes.heading}
          </motion.h3>
          <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm font-medium leading-relaxed text-violet-100/85 sm:text-base">
            {outcomes.notPromising}
          </motion.p>

          <motion.div {...staggerContainer(0.08)} className="mt-8 space-y-3">
            {outcomes.ninetyDays.map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="ease-signature glass-card flex gap-4 rounded-xl p-5">
                <span className="text-gradient-accent text-lg font-semibold">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-violet-50/85 sm:text-base">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-violet-300/70">{outcomes.whatWouldSharpen.heading}</p>
            <p className="mt-4 text-base leading-relaxed text-white sm:text-lg">{outcomes.whatWouldSharpen.body}</p>
            <p className="mt-4 text-sm italic leading-relaxed text-violet-300/60">{outcomes.whatWouldSharpen.closing}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
