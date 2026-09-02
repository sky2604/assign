import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsCoarsePointer } from '../hooks/useIsCoarsePointer'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface MagneticButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  target?: string
  rel?: string
}

const MAGNETIC_STRENGTH = 0.35
const MAGNETIC_MAX_PX = 14

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

export default function MagneticButton({ href, onClick, children, className = '', target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const isCoarsePointer = useIsCoarsePointer()
  const prefersReducedMotion = usePrefersReducedMotion()
  const disableMagnet = isCoarsePointer || prefersReducedMotion

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 300, damping: 22, mass: 0.4 })

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (disableMagnet || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = event.clientX - (rect.left + rect.width / 2)
    const relY = event.clientY - (rect.top + rect.height / 2)
    x.set(clamp(relX * MAGNETIC_STRENGTH, -MAGNETIC_MAX_PX, MAGNETIC_MAX_PX))
    y.set(clamp(relY * MAGNETIC_STRENGTH, -MAGNETIC_MAX_PX, MAGNETIC_MAX_PX))
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const sharedProps = {
    ref,
    className,
    style: disableMagnet ? undefined : { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.96 },
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...sharedProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} {...sharedProps}>
      {children}
    </motion.button>
  )
}
