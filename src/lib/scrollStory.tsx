import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export const STORY_STATES = [
  'hero',
  'challenge',
  'complexity',
  'questions',
  'investigation',
  'insight',
  'strategy',
  'execution',
  'learning',
  'conclusion',
] as const

export type StoryState = (typeof STORY_STATES)[number]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

interface StoryContextValue {
  registerSection: (id: StoryState, el: HTMLElement | null) => void
  /** Continuous position across the whole journey: state index + local progress (0..STATES.length-1). Mutable ref, read inside r3f useFrame, never causes React re-renders. */
  positionRef: React.MutableRefObject<number>
  /** Per-section local progress 0..1, keyed by state id. Mutable ref. */
  sectionProgressRef: React.MutableRefObject<Partial<Record<StoryState, number>>>
  activeSection: StoryState
  globalProgress: number
}

const StoryContext = createContext<StoryContextValue | null>(null)

export function StoryProvider({ children }: { children: ReactNode }) {
  const sectionsRef = useRef<Map<StoryState, HTMLElement>>(new Map())
  const positionRef = useRef(0)
  const sectionProgressRef = useRef<Partial<Record<StoryState, number>>>({})
  const [activeSection, setActiveSection] = useState<StoryState>('hero')
  const [globalProgress, setGlobalProgress] = useState(0)
  const activeRef = useRef<StoryState>('hero')
  const globalRef = useRef(0)

  const registerSection = useCallback((id: StoryState, el: HTMLElement | null) => {
    if (el) sectionsRef.current.set(id, el)
    else sectionsRef.current.delete(id)
  }, [])

  useEffect(() => {
    let raf = 0
    let lastUiUpdate = 0

    function tick(now: number) {
      const scrollTop = window.scrollY
      const viewportH = window.innerHeight
      const maxScroll = document.documentElement.scrollHeight - viewportH
      globalRef.current = maxScroll > 0 ? clamp(scrollTop / maxScroll, 0, 1) : 0

      let bestScore = -Infinity
      let bestId: StoryState = activeRef.current
      let continuousPosition = 0

      STORY_STATES.forEach((id, index) => {
        const el = sectionsRef.current.get(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const height = rect.height || 1
        // local progress: 0 when section top is at viewport bottom, 1 when section bottom reaches viewport top
        const local = clamp((viewportH - rect.top) / (height + viewportH), 0, 1)
        sectionProgressRef.current[id] = local

        const center = rect.top + height / 2
        const dist = Math.abs(center - viewportH / 2)
        const visible = rect.top < viewportH && rect.bottom > 0
        if (visible && -dist > bestScore) {
          bestScore = -dist
          bestId = id
          const centeredLocal = clamp(1 - (center / viewportH), 0, 1)
          continuousPosition = index + centeredLocal
        }
      })

      positionRef.current = clamp(continuousPosition, 0, STORY_STATES.length - 1)

      if (bestId !== activeRef.current) {
        activeRef.current = bestId
        setActiveSection(bestId)
      }

      if (now - lastUiUpdate > 80) {
        lastUiUpdate = now
        setGlobalProgress(globalRef.current)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const value: StoryContextValue = {
    registerSection,
    positionRef,
    sectionProgressRef,
    activeSection,
    globalProgress,
  }

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}

function useStoryContext() {
  const ctx = useContext(StoryContext)
  if (!ctx) throw new Error('useStoryContext must be used within StoryProvider')
  return ctx
}

export function useSectionRef(id: StoryState) {
  const { registerSection } = useStoryContext()
  return useCallback((el: HTMLElement | null) => registerSection(id, el), [registerSection, id])
}

/** Throttled 0..1 local progress for a given section, for DOM-level reactive UI. Re-renders at most ~30fps and only meaningfully changed values. */
export function useSectionProgress(id: StoryState) {
  const { sectionProgressRef } = useStoryContext()
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    let last = -1
    function loop() {
      const v = sectionProgressRef.current[id] ?? 0
      if (Math.abs(v - last) > 0.0015) {
        last = v
        setValue(v)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [id, sectionProgressRef])
  return value
}

export function useActiveSection() {
  return useStoryContext().activeSection
}

export function useGlobalProgress() {
  return useStoryContext().globalProgress
}

/** For r3f components only: read inside useFrame, never triggers React re-renders. */
export function usePositionRef() {
  return useStoryContext().positionRef
}
