import { motion } from 'framer-motion'
import { investigation, type SignalItem } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

const trustWidth: Record<SignalItem['trust'], string> = {
  highest: '100%',
  high: '78%',
  medium: '56%',
  low: '34%',
  lowest: '18%',
}

export default function Investigation() {
  return (
    <section className="bg-ink-soft relative border-y border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {investigation.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {investigation.heading}
        </motion.h2>

        <motion.p {...fadeUp(0.1)} className="mt-10 text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">
          Signal, ranked by how much I&rsquo;d trust it
        </motion.p>

        <motion.div {...staggerContainer(0.08)} className="mt-5 space-y-3">
          {investigation.signals.map((signal) => (
            <motion.div key={signal.rank} variants={staggerItem} className="ease-signature glass-card rounded-xl p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3">
                  <span className="text-gradient-accent text-lg font-semibold">{signal.rank}</span>
                  <div>
                    <p className="text-sm font-semibold text-white sm:text-base">{signal.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-violet-100/70">{signal.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 sm:w-32 sm:flex-col sm:items-end sm:gap-1.5">
                  <div className="h-1.5 w-full max-w-[110px] overflow-hidden rounded-full bg-white/10 sm:max-w-none">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                      style={{ width: trustWidth[signal.trust] }}
                    />
                  </div>
                  <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-violet-300/60">{signal.trust} trust</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {investigation.stagedPlan.map((stage) => (
            <motion.div key={stage.week} {...fadeUp(0.06)} className="ease-signature glass-card rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-300/70">{stage.week}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-violet-50/85">{stage.actions}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.1)} className="mt-14 rounded-3xl border border-violet-300/25 bg-violet-400/[0.06] p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-violet-200">{investigation.decisiveCut.heading}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Tracks by rep</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{investigation.decisiveCut.byRep}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-300/80">Tracks by vertical</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{investigation.decisiveCut.byVertical}</p>
            </div>
          </div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm italic leading-relaxed text-violet-200/75">
            {investigation.decisiveCut.stance}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
