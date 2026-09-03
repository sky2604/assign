import { motion } from 'framer-motion'
import { STORY_STATES, useActiveSection, type StoryState } from '../lib/scrollStory'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const LABELS: Record<StoryState, string> = {
  hero: 'Start',
  challenge: '01 Challenge',
  complexity: '02 Complexity',
  questions: '03 Questions',
  investigation: '04 Investigation',
  insight: '05 Insight',
  strategy: '06 Strategy',
  execution: '07 Execution',
  learning: '08 Learning',
  conclusion: '09 Conclusion',
}

function goTo(id: StoryState, smooth: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

export default function StoryProgressRail() {
  const active = useActiveSection()
  const prefersReducedMotion = usePrefersReducedMotion()
  const activeIndex = STORY_STATES.indexOf(active)

  return (
    <div className="pointer-events-none fixed inset-y-0 right-4 z-30 hidden flex-col items-end justify-center gap-2.5 lg:flex xl:right-8">
      {STORY_STATES.map((id, index) => {
        const isActive = id === active
        const isPast = index < activeIndex
        return (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id, !prefersReducedMotion)}
            className="ease-signature group pointer-events-auto flex items-center gap-2.5 py-0.5"
            aria-label={`Jump to ${LABELS[id]}`}
          >
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 6,
              }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-violet-100"
            >
              {LABELS[id]}
            </motion.span>
            <span
              className={`ease-signature block rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-2.5 w-2.5 bg-gradient-to-br from-violet-300 to-fuchsia-400 shadow-[0_0_12px_rgba(196,181,253,0.8)]'
                  : isPast
                    ? 'h-1.5 w-1.5 bg-violet-300/70'
                    : 'h-1.5 w-1.5 bg-white/20 group-hover:bg-violet-300/50'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
