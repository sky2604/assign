import type { CSSProperties } from 'react'
import { insight } from '../../data/content'
import { useSectionRef, useSectionProgress } from '../../lib/scrollStory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function remap(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = clamp01((v - inMin) / (inMax - inMin))
  return outMin + (outMax - outMin) * t
}

/**
 * State 05, the single most important beat on the site.
 *
 * This section is a scroll-pinned discovery, not a stack of fade-ups. A tall track
 * (min-h-[240vh]) holds a sticky viewport-height stage; as the user scrolls through
 * that track, useSectionProgress('insight') drives every value below by hand:
 * the reflex answer visibly gets struck through and recedes into a pale, blurred
 * ghost, while the real insight resolves out of blur into sharp, bright focus.
 * Nothing else competes for attention while that happens, on purpose, because the
 * 3D core behind this section is converging into one bright point at the same time.
 * The DOM goes quiet exactly when the canvas goes quiet.
 */
export default function Insight() {
  const sectionRef = useSectionRef('insight')
  const prefersReducedMotion = usePrefersReducedMotion()
  const p = useSectionProgress('insight')

  // Phase map, all in local 0..1 section progress:
  //  0.00-0.16  the problem restated, plainly, nothing else on screen yet
  //  0.18-0.40  the reflex answer draws its own strikethrough as you scroll
  //  0.40-0.74  convergence: the reflex recedes into a dim, blurred ghost while
  //             the real insight resolves into sharp focus, brightening as it lands
  //  0.80-0.97  the implication settles underneath, once the insight has landed
  const introOpacity = remap(p, 0, 0.16, 1, 0)
  const strikeScale = remap(p, 0.18, 0.4, 0, 1)
  const oldOpacity = remap(p, 0.4, 0.64, 1, 0.2)
  const oldScale = remap(p, 0.4, 0.64, 1, 0.84)
  const oldBlur = remap(p, 0.4, 0.64, 0, 5)
  const insightOpacity = remap(p, 0.44, 0.74, 0, 1)
  const insightScale = remap(p, 0.44, 0.74, 0.92, 1)
  const insightBlur = remap(p, 0.44, 0.74, 9, 0)
  const insightBrightness = remap(p, 0.44, 0.74, 0.75, 1.05)
  const glowOpacity = remap(p, 0.44, 0.8, 0, 0.55)
  const implicationOpacity = remap(p, 0.8, 0.97, 0, 1)
  const implicationY = remap(p, 0.8, 0.97, 14, 0)
  const hintOpacity = remap(p, 0, 0.1, 1, 0)
  const labelOldOpacity = remap(p, 0.32, 0.46, 1, 0)
  const labelNewOpacity = remap(p, 0.46, 0.58, 0, 1)

  const introStyle: CSSProperties = prefersReducedMotion ? {} : { opacity: introOpacity }

  const oldStyle: CSSProperties = prefersReducedMotion
    ? { opacity: 0.35 }
    : { opacity: oldOpacity, transform: `scale(${oldScale})`, filter: `blur(${oldBlur}px)` }

  const insightStyle: CSSProperties = prefersReducedMotion
    ? { fontSize: 'clamp(1.7rem, 4.4vw, 2.9rem)', lineHeight: 1.18 }
    : {
        fontSize: 'clamp(1.7rem, 4.4vw, 2.9rem)',
        lineHeight: 1.18,
        opacity: insightOpacity,
        transform: `scale(${insightScale})`,
        filter: `blur(${insightBlur}px) brightness(${insightBrightness})`,
      }

  const implicationStyle: CSSProperties = prefersReducedMotion
    ? {}
    : { opacity: implicationOpacity, transform: `translateY(${implicationY}px)` }

  return (
    <section id="insight" ref={sectionRef} className={`relative ${prefersReducedMotion ? '' : 'min-h-[240vh]'}`}>
      <div
        className={
          prefersReducedMotion
            ? 'relative mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-32 text-center'
            : 'sticky top-0 mx-auto flex h-[100svh] w-full max-w-2xl flex-col items-center justify-center overflow-hidden px-6 text-center'
        }
      >
        {!prefersReducedMotion && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(48% 42% at 50% 50%, transparent 0%, transparent 45%, rgba(11,7,16,0.65) 100%)',
            }}
          />
        )}

        <div className="relative">
          <p style={introStyle} className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/70">
            {insight.eyebrow}
          </p>
          <p style={introStyle} className="mx-auto mt-8 max-w-xl text-base font-medium text-violet-200/70 sm:text-lg">
            {insight.observation}
          </p>
        </div>

        <div className="relative mt-10 h-4 w-full max-w-xs text-xs uppercase tracking-[0.14em] text-violet-400/50">
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: prefersReducedMotion ? 0 : labelOldOpacity }}
          >
            the reflex
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: prefersReducedMotion ? 1 : labelNewOpacity }}
          >
            what is actually true
          </span>
        </div>

        <p style={oldStyle} className="ease-signature relative mx-auto mt-4 inline-block max-w-md text-base text-violet-300/60 sm:text-lg">
          <span className="relative inline">
            {insight.commonConclusion}
            <span
              aria-hidden
              className="absolute left-0 top-1/2 h-px w-full origin-left bg-violet-300/70"
              style={{ transform: `scaleX(${prefersReducedMotion ? 1 : strikeScale})` }}
            />
          </span>
        </p>

        <div className="relative mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/30 blur-3xl"
            style={{ opacity: prefersReducedMotion ? 0.25 : glowOpacity }}
          />
          <h2 style={insightStyle} className="text-gradient-name relative mx-auto max-w-2xl font-semibold">
            {insight.actualInsight}
          </h2>
        </div>

        <p
          style={implicationStyle}
          className="mx-auto mt-10 max-w-lg border-t border-white/10 pt-8 text-sm leading-relaxed text-violet-100/80 sm:text-base"
        >
          {insight.implication}
        </p>

        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center" style={{ opacity: hintOpacity }}>
            <span className="text-[11px] uppercase tracking-[0.14em] text-violet-400/50">keep scrolling</span>
          </div>
        )}
      </div>
    </section>
  )
}
