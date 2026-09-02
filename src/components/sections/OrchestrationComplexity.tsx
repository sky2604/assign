import { motion } from 'framer-motion'
import { orchestrationComplexity } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function OrchestrationComplexity() {
  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {orchestrationComplexity.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          {orchestrationComplexity.heading}
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          {orchestrationComplexity.intro}
        </motion.p>

        <motion.div {...staggerContainer(0.1)} className="mt-9 grid gap-4 sm:grid-cols-3">
          {orchestrationComplexity.items.map((item, index) => (
            <motion.div key={item.title} variants={staggerItem} className="ease-signature glass-card relative rounded-2xl p-6">
              <span className="text-gradient-accent text-3xl font-semibold">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-100/70">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-8 max-w-2xl border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-100/85 sm:text-base">
          {orchestrationComplexity.translation}
        </motion.p>
      </div>
    </section>
  )
}
