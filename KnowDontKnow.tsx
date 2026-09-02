import { useState } from 'react'
import { motion } from 'framer-motion'
import { knowDontKnow } from '../../data/content'
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion'

type TabKey = 'fact' | 'inference' | 'assumption' | 'hypothesis'

const tabs: { key: TabKey; label: string; tagClass: string; description: string }[] = [
  { key: 'fact', label: 'Fact', tagClass: 'tag-fact', description: 'Independently verifiable, checked against public sources.' },
  { key: 'inference', label: 'Inference', tagClass: 'tag-inference', description: 'Reasoned from the facts above, not directly observed.' },
  { key: 'assumption', label: 'Assumption', tagClass: 'tag-assumption', description: 'Held explicitly, with a stated condition that would overturn it.' },
  { key: 'hypothesis', label: 'Hypothesis', tagClass: 'tag-hypothesis', description: 'The working bet. Held loosely, on purpose, with named counter-evidence.' },
]

export default function KnowDontKnow() {
  const [active, setActive] = useState<TabKey>('fact')
  const activeTab = tabs.find((t) => t.key === active)!

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {knowDontKnow.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          {knowDontKnow.heading}
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mt-5 max-w-2xl text-sm leading-relaxed text-violet-200/70 sm:text-base">
          {knowDontKnow.intro}
        </motion.p>

        <div role="tablist" aria-label="Evidence category" className="mt-9 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={`ease-signature flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
                active === tab.key ? tab.tagClass : 'glass-card text-violet-200/60 hover:text-violet-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.p key={`${active}-desc`} {...fadeUp(0)} className="mt-4 text-sm text-violet-300/60">
          {activeTab.description}
        </motion.p>

        {active !== 'hypothesis' && active !== 'assumption' && (
          <motion.div key={active} {...staggerContainer(0.06)} className="mt-6 grid gap-3 sm:grid-cols-2">
            {(active === 'fact' ? knowDontKnow.facts : knowDontKnow.inferences).map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="ease-signature glass-card rounded-xl p-5">
                <p className="text-sm leading-relaxed text-violet-50/85">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {active === 'assumption' && (
          <motion.div key="assumption" {...staggerContainer(0.06)} className="mt-6 space-y-3">
            {knowDontKnow.assumptions.map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="ease-signature glass-card rounded-xl p-5">
                <p className="text-sm leading-relaxed text-violet-50/85">{item.text}</p>
                <p className="tag-assumption mt-3 inline-block rounded-lg px-3 py-1.5 text-xs leading-relaxed">
                  Would change my mind if: {item.wouldChangeMind}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {active === 'hypothesis' && (
          <motion.div key="hypothesis" {...fadeUp(0)} className="mt-6">
            <div className="ease-signature glass-card rounded-2xl border-fuchsia-300/25 p-6 sm:p-7">
              <p className="text-base leading-relaxed text-white sm:text-lg">{knowDontKnow.hypothesis.text}</p>
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.1em] text-violet-300/70">What would disprove it</p>
            <div className="mt-3 space-y-2.5">
              {knowDontKnow.hypothesis.counterEvidence.map((item, index) => (
                <div key={index} className="flex gap-3 rounded-xl bg-white/[0.03] p-4">
                  <span className="mt-0.5 text-xs font-semibold text-fuchsia-300/70">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm leading-relaxed text-violet-100/75">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
