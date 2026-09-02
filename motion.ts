export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const EASE_OUT_EXPO_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

export const REVEAL_DURATION = 0.8

export function fadeUp(delay = 0, distance = 28) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: REVEAL_DURATION, delay, ease: EASE_OUT_EXPO },
  }
}

export function fadeIn(delay = 0, duration = REVEAL_DURATION) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration, delay, ease: EASE_OUT_EXPO },
  }
}

export function staggerContainer(staggerDelay = 0.08, initialDelay = 0) {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.2 },
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: staggerDelay, delayChildren: initialDelay },
      },
    },
  }
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: EASE_OUT_EXPO },
  },
}
