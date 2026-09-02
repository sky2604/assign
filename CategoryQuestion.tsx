import { motion } from 'framer-motion'
import { categoryQuestion } from '../../data/content'
import { fadeUp } from '../../lib/motion'

export default function CategoryQuestion() {
  return (
    <section className="bg-ink-soft relative border-y border-white/5 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {categoryQuestion.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
          {categoryQuestion.heading}
        </motion.h2>
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
    </section>
  )
}
