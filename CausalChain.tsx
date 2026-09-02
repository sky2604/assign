import { motion } from 'framer-motion'
import { causalChain } from '../../data/content'
import { fadeUp } from '../../lib/motion'

const WEAKEST_LINK_INDEX = 2

export default function CausalChain() {
  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.p {...fadeUp()} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
          {causalChain.eyebrow}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mt-3 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
          {causalChain.heading}
        </motion.h2>

        <div className="relative mt-10 pl-8">
          <div className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-white/10" />
          <div className="space-y-7">
            {causalChain.steps.map((step, index) => {
              const isWeakest = index === WEAKEST_LINK_INDEX
              return (
                <motion.div key={index} {...fadeUp(index * 0.04)} className="relative">
                  <span
                    className={`ease-signature absolute -left-8 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                      isWeakest ? 'border-amber-300 bg-amber-300/80' : 'border-violet-300/60 bg-ink'
                    }`}
                  />
                  <p className={`text-sm leading-relaxed sm:text-base ${isWeakest ? 'text-amber-100' : 'text-violet-50/85'}`}>
                    {step}
                    {isWeakest && (
                      <span className="tag-assumption ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.08em]">
                        weakest link
                      </span>
                    )}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div {...fadeUp(0.1)} className="ease-signature glass-card mt-10 rounded-2xl p-6 sm:p-7">
          <p className="text-sm leading-relaxed text-violet-50/90 sm:text-base">{causalChain.compoundingAsset}</p>
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="mt-6 text-sm italic leading-relaxed text-violet-300/60">
          {causalChain.weakestLink}
        </motion.p>
      </div>
    </section>
  )
}
