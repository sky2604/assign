import { motion } from 'framer-motion'
import { outcomes } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function Outcomes() {
  return (
    <section id="execution" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {outcomes.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {outcomes.heading}
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-300/60 sm:text-base">
          {outcomes.notPromising}
        </motion.p>

        <motion.div {...staggerContainer(0.08)} className="mt-9 space-y-3">
          {outcomes.ninetyDays.map((item, index) => (
            <motion.div key={index} variants={staggerItem} className="ease-signature glass-card flex gap-4 rounded-xl p-5">
              <span className="text-gradient-accent text-lg font-semibold">{String(index + 1).padStart(2, '0')}</span>
              <p className="text-sm leading-relaxed text-violet-50/85 sm:text-base">{item}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-violet-300/70">{outcomes.whatWouldSharpen.heading}</p>
          <p className="mt-4 text-base leading-relaxed text-white sm:text-lg">{outcomes.whatWouldSharpen.body}</p>
          <p className="mt-4 text-sm italic leading-relaxed text-violet-300/60">{outcomes.whatWouldSharpen.closing}</p>
        </motion.div>
      </div>
    </section>
  )
}
