import { motion } from 'framer-motion'
import { whyHard } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function WhyHard() {
  return (
    <section id="thinking" className="bg-ink-soft relative border-y border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {whyHard.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {whyHard.heading}
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          {whyHard.intro}
        </motion.p>

        <motion.p {...fadeUp(0.14)} className="mt-14 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          Three clicks, three different mental models of the same product
        </motion.p>

        <div className="relative mt-6">
          <motion.div {...staggerContainer(0.12)} className="grid gap-4 sm:grid-cols-3">
            {whyHard.categoryDescriptions.map((item) => (
              <motion.div key={item.source} variants={staggerItem} className="ease-signature glass-card flex flex-col rounded-2xl p-6">
                <span className="text-xs uppercase tracking-[0.12em] text-violet-300/70">{item.source}</span>
                <span className="mt-4 flex-1 text-lg font-medium leading-snug text-white">&ldquo;{item.quote}&rdquo;</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p {...fadeUp(0.1)} className="mt-6 max-w-2xl text-sm leading-relaxed text-violet-100/80 sm:text-base">
          {whyHard.categoryTakeaway}
        </motion.p>

        <motion.p {...fadeUp(0.1)} className="mt-16 text-sm font-medium uppercase tracking-[0.12em] text-violet-300/70">
          Zero named buyer roles, compared to two competitors that have them
        </motion.p>

        <motion.div {...staggerContainer(0.12)} className="mt-6 grid gap-4 sm:grid-cols-3">
          <motion.div variants={staggerItem} className="ease-signature rounded-2xl border border-rose-400/25 bg-rose-500/[0.06] p-6">
            <p className="text-sm font-semibold text-rose-200">FlytBase</p>
            <p className="mt-2.5 text-sm leading-relaxed text-violet-100/75">{whyHard.buyerRoleGap.flytbase}</p>
          </motion.div>
          <motion.div variants={staggerItem} className="ease-signature glass-card rounded-2xl p-6">
            <p className="text-sm font-semibold text-violet-100">Percepto</p>
            <p className="mt-2.5 text-sm leading-relaxed text-violet-100/75">{whyHard.buyerRoleGap.percepto}</p>
          </motion.div>
          <motion.div variants={staggerItem} className="ease-signature glass-card rounded-2xl p-6">
            <p className="text-sm font-semibold text-violet-100">Skydio</p>
            <p className="mt-2.5 text-sm leading-relaxed text-violet-100/75">{whyHard.buyerRoleGap.skydio}</p>
          </motion.div>
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-8 max-w-2xl border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-200/75 sm:text-base">
          {whyHard.buyerRoleGap.implication}
        </motion.p>

        <motion.p {...fadeUp(0.1)} className="mt-10 max-w-2xl text-sm leading-relaxed text-violet-300/60">
          {whyHard.reviewGap}
        </motion.p>
      </div>
    </section>
  )
}
