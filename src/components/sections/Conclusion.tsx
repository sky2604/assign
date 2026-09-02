import { motion } from 'framer-motion'
import MagneticButton from '../MagneticButton'
import { conclusion, meta } from '../../data/content'
import { fadeUp } from '../../lib/motion'

interface ConclusionProps {
  onOpenDocument: () => void
}

const rows: { label: string; value: string }[] = [
  { label: 'The problem', value: conclusion.problem },
  { label: 'The insight', value: conclusion.theInsight },
  { label: 'The decision', value: conclusion.theDecision },
  { label: 'Why it matters', value: conclusion.whyItMatters },
  { label: 'What is next', value: conclusion.whatsNext },
]

export default function Conclusion({ onOpenDocument }: ConclusionProps) {
  return (
    <section className="bg-radial-hero relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {conclusion.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
          {conclusion.heading}
        </motion.h2>

        <div className="mx-auto mt-14 max-w-xl space-y-6 text-left">
          {rows.map((row, index) => (
            <motion.div key={row.label} {...fadeUp(0.04 * index)} className="border-b border-white/10 pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-300/70">{row.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/90 sm:text-base">{row.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(0.24)} className="mx-auto mt-12 max-w-lg text-base font-medium leading-relaxed text-white sm:text-lg">
          {conclusion.closingLine}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            onClick={onOpenDocument}
            className="ease-signature inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-300 via-indigo-400 to-fuchsia-400 px-8 py-3.5 text-sm font-semibold text-ink shadow-[0_16px_40px_-10px_rgba(124,58,237,0.75)] transition-transform duration-300 sm:w-auto"
          >
            Read the full detailed document
          </MagneticButton>
        </motion.div>

        <motion.p {...fadeUp(0.34)} className="mt-10 text-xs uppercase tracking-[0.2em] text-violet-300/50">
          {meta.candidate} &middot; {meta.role} &middot; {meta.dateLabel}
        </motion.p>
      </div>
    </section>
  )
}
