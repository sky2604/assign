import { motion } from 'framer-motion'
import { notDoing } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function NotDoing() {
  return (
    <section className="bg-ink-soft relative border-y border-white/5 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {notDoing.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
          {notDoing.heading}
        </motion.h2>

        <motion.div {...staggerContainer(0.1)} className="mt-9 grid gap-4 sm:grid-cols-3">
          {notDoing.items.map((item) => (
            <motion.div key={item.title} variants={staggerItem} className="ease-signature relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-rose-400/70">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5.5 5.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-100/70">{item.why}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
