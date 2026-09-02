import { motion } from 'framer-motion'
import { challenge } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function Challenge() {
  return (
    <section id="challenge" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {challenge.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {challenge.heading}
        </motion.h2>

        <motion.div {...fadeUp(0.12)} className="ease-signature glass-card mt-9 rounded-3xl p-7 sm:p-9">
          <p className="text-xs uppercase tracking-[0.14em] text-violet-300/70">The brief, as given</p>
          <p className="mt-3 text-base leading-relaxed text-violet-50/90 sm:text-lg">{challenge.prompt}</p>
        </motion.div>

        <motion.p {...fadeUp(0.16)} className="mt-14 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          {challenge.reasoningHeading}
        </motion.p>

        <motion.div {...staggerContainer(0.1)} className="mt-6 grid gap-4 sm:grid-cols-3">
          {challenge.reasoning.map((item, index) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className={`ease-signature rounded-2xl p-6 transition-colors duration-300 ${
                index === 2
                  ? 'border border-violet-300/40 bg-violet-400/10'
                  : 'glass-card'
              }`}
            >
              <p className={`text-sm font-semibold ${index === 2 ? 'text-white' : 'text-violet-100/90'}`}>{item.label}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-violet-100/70">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-10 border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-200/70 sm:text-base">
          {challenge.jobPostingNote}
        </motion.p>
      </div>
    </section>
  )
}
