import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '../Modal'
import { strategy } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

export default function Strategy() {
  const [showMiningRow, setShowMiningRow] = useState(false)

  return (
    <section id="strategy" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {strategy.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {strategy.heading}
        </motion.h2>

        <motion.div {...fadeUp(0.1)} className="ease-signature glass-card mt-8 rounded-3xl p-7 sm:p-9">
          <p className="text-base leading-relaxed text-violet-50/90 sm:text-lg">{strategy.thesis}</p>
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-6 max-w-2xl border-l-2 border-violet-400/40 pl-4 text-sm italic leading-relaxed text-violet-200/75 sm:text-base">
          {strategy.whyNotBattlecardFirst}
        </motion.p>

        <motion.p {...fadeUp(0.1)} className="mt-16 text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">
          Ownership, before I&rsquo;d commit to building it
        </motion.p>

        <motion.div {...staggerContainer(0.06)} className="mt-5 grid gap-3 sm:grid-cols-2">
          {strategy.ownership.map((item) => (
            <motion.div key={item.label} variants={staggerItem} className="ease-signature glass-card rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-50/85">{item.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-16 text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">
          {strategy.miningExample.heading}
        </motion.p>

        <motion.button
          {...fadeUp(0.06)}
          type="button"
          onClick={() => setShowMiningRow(true)}
          className="ease-signature glass-card group mt-5 w-full rounded-2xl p-6 text-left transition-colors duration-300 hover:border-violet-300/40 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="tag-hypothesis inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">Draft row</span>
              <p className="mt-3 text-lg font-semibold text-white">{strategy.miningExample.subheading}</p>
              <p className="mt-2 text-sm leading-relaxed text-violet-100/70">{strategy.miningExample.intro}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0 text-violet-300/60 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 8H15M15 8L9 2M15 8L9 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="ease-signature mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-violet-300 transition-colors duration-300 group-hover:text-white">
            Open the full row
          </p>
        </motion.button>

        <motion.div {...fadeUp(0.1)} className="mt-16 rounded-3xl border border-rose-400/20 bg-rose-500/[0.04] p-7 sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-rose-200">{strategy.killTest.heading}</p>
          <div className="mt-5 space-y-3">
            {strategy.killTest.items.map((item, index) => (
              <div key={index} className="flex gap-3">
                <span className="mt-0.5 text-xs font-semibold text-rose-300/70">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-violet-50/85">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="mt-16">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-violet-300/70">{strategy.distribution.heading}</p>
          <p className="mt-4 text-base font-medium text-white sm:text-lg">{strategy.distribution.approach}</p>
          <p className="mt-3 text-sm leading-relaxed text-violet-100/75 sm:text-base">{strategy.distribution.plan}</p>
          <p className="mt-4 text-sm italic leading-relaxed text-violet-300/60">{strategy.distribution.standard}</p>
        </motion.div>
      </div>

      <Modal
        isOpen={showMiningRow}
        onClose={() => setShowMiningRow(false)}
        titleId="mining-row-title"
        title={strategy.miningExample.subheading}
        panelClassName="sm:max-w-2xl"
      >
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Job-to-be-done, hypothesized</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-50/90">{strategy.miningExample.jobToBeDone}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Likely stakeholders in the room</p>
            <div className="mt-2 space-y-2">
              {strategy.miningExample.stakeholders.map((s) => (
                <div key={s.role} className="rounded-lg bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold text-violet-200">{s.role}</p>
                  <p className="mt-1 text-sm leading-relaxed text-violet-100/75">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Capabilities that actually serve the job</p>
            <ul className="mt-2 space-y-1.5">
              {strategy.miningExample.capabilities.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-violet-50/85">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Proof point, pattern-matched</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/75">{strategy.miningExample.proofPoint}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Economic argument, placeholder</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/75">{strategy.miningExample.economicArgument}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-300/70">Likely objection, status quo</p>
            <p className="mt-2 text-sm leading-relaxed text-violet-100/75">{strategy.miningExample.objection}</p>
          </div>
        </div>
      </Modal>
    </section>
  )
}
