import { motion } from 'framer-motion'
import { insight } from '../../data/content'
import { fadeUp } from '../../lib/motion'

export default function Insight() {
  return (
    <section id="insight" className="bg-radial-hero relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {insight.eyebrow}
        </motion.p>

        <motion.p {...fadeUp(0.08)} className="mx-auto mt-10 max-w-xl text-lg font-medium text-violet-200/70 sm:text-xl">
          {insight.observation}
        </motion.p>

        <motion.div {...fadeUp(0.16)} className="mx-auto mt-6 flex items-center justify-center gap-3 text-violet-400/50">
          <span className="h-px w-10 bg-current" />
          <span className="text-xs uppercase tracking-[0.14em]">most would conclude</span>
          <span className="h-px w-10 bg-current" />
        </motion.div>

        <motion.p {...fadeUp(0.22)} className="mx-auto mt-6 max-w-md text-base text-violet-300/55 line-through decoration-violet-400/30 sm:text-lg">
          {insight.commonConclusion}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mx-auto mt-12 flex items-center justify-center gap-3 text-fuchsia-300/70">
          <span className="h-px w-10 bg-current" />
          <span className="text-xs uppercase tracking-[0.14em]">what I think is actually happening</span>
          <span className="h-px w-10 bg-current" />
        </motion.div>

        <motion.h2
          {...fadeUp(0.36)}
          className="text-gradient-name mx-auto mt-7 max-w-2xl font-semibold"
          style={{ fontSize: 'clamp(1.7rem, 4.4vw, 2.9rem)', lineHeight: 1.18 }}
        >
          {insight.actualInsight}
        </motion.h2>

        <motion.p {...fadeUp(0.46)} className="mx-auto mt-10 max-w-lg border-t border-white/10 pt-8 text-sm leading-relaxed text-violet-100/80 sm:text-base">
          {insight.implication}
        </motion.p>
      </div>
    </section>
  )
}
