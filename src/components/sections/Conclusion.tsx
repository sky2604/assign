import { motion } from 'framer-motion'
import MagneticButton from '../MagneticButton'
import { conclusion, meta } from '../../data/content'
import { fadeUp } from '../../lib/motion'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface ConclusionProps {
  onOpenDocument: () => void
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export default function Conclusion({ onOpenDocument }: ConclusionProps) {
  const sectionRef = useSectionRef('conclusion')
  const progress = useSectionProgress('conclusion')
  const prefersReducedMotion = usePrefersReducedMotion()

  // The closing line and CTA "arrive" as the 3D object behind the page finishes
  // recombining into its calm sphere, late in this section, not on first entry.
  const arrival = prefersReducedMotion ? 1 : clamp01((progress - 0.5) / 0.4)

  return (
    <section id="conclusion" ref={sectionRef} className="bg-radial-hero relative px-6 py-32 sm:py-48">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/60">
          {conclusion.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-5 text-3xl font-semibold text-white sm:text-5xl">
          {conclusion.heading}
        </motion.h2>

        {/* A single settling thought: problem, insight, decision, why it matters, what's next.
            Each beat is quieter and more compressed than the last, so attention narrows
            toward the closing line rather than five equal, competing rows. */}
        <div className="mx-auto mt-16 max-w-xl text-left">
          <motion.p {...fadeUp(0.06)} className="text-lg font-medium leading-relaxed text-white sm:text-xl">
            {conclusion.problem}
          </motion.p>

          <motion.p {...fadeUp(0.1)} className="mt-7 text-base leading-relaxed text-violet-100/80 sm:text-lg">
            {conclusion.theInsight}
          </motion.p>

          <motion.p {...fadeUp(0.14)} className="text-gradient-accent mt-7 text-base font-semibold leading-relaxed sm:text-lg">
            {conclusion.theDecision}
          </motion.p>

          <motion.p {...fadeUp(0.18)} className="mt-6 border-l-2 border-violet-400/30 pl-4 text-sm italic leading-relaxed text-violet-200/65 sm:text-base">
            {conclusion.whyItMatters}
          </motion.p>

          <motion.p {...fadeUp(0.22)} className="mt-6 text-xs uppercase tracking-[0.08em] leading-relaxed text-violet-300/45 sm:text-sm">
            {conclusion.whatsNext}
          </motion.p>
        </div>

        {/* The return: closing line and CTA lock into place as the object behind
            them finishes reforming into a coherent sphere, mirroring the hero. */}
        <div
          className="ease-signature mt-20 sm:mt-28"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: arrival,
                  transform: `translateY(${(1 - arrival) * 18}px) scale(${0.98 + arrival * 0.02})`,
                  transition: 'opacity 0.4s linear, transform 0.4s linear',
                }
          }
        >
          <p className="text-gradient-name mx-auto max-w-lg text-xl font-medium leading-relaxed sm:text-2xl">
            {conclusion.closingLine}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              onClick={onOpenDocument}
              className="ease-signature inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-300 via-indigo-400 to-fuchsia-400 px-8 py-3.5 text-sm font-semibold text-ink shadow-[0_16px_40px_-10px_rgba(124,58,237,0.75)] transition-transform duration-300 sm:w-auto"
            >
              Read the full detailed document
            </MagneticButton>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.2em] text-violet-300/50">
            {meta.candidate} &middot; {meta.role} &middot; {meta.dateLabel}
          </p>
        </div>
      </div>
    </section>
  )
}
