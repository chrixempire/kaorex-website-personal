/**
 * Reusable @vueuse/motion variant builders for consistent scroll animations.
 * Use with `v-motion` + the `visibleOnce` lifecycle, e.g.
 *   <div v-motion :initial="fadeUp().initial" :visible-once="fadeUp().enter" />
 * or simply v-bind the whole preset object.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export function fadeUp(delay = 0, y = 28) {
  return {
    initial: { opacity: 0, y },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: { duration: 600, delay, ease: EASE },
    },
  }
}

export function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    visibleOnce: {
      opacity: 1,
      transition: { duration: 700, delay, ease: EASE },
    },
  }
}

export function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.94 },
    visibleOnce: {
      opacity: 1,
      scale: 1,
      transition: { duration: 600, delay, ease: EASE },
    },
  }
}

export function fadeLeft(delay = 0, x = 32) {
  return {
    initial: { opacity: 0, x },
    visibleOnce: {
      opacity: 1,
      x: 0,
      transition: { duration: 600, delay, ease: EASE },
    },
  }
}

export function useMotionPresets() {
  return { fadeUp, fadeIn, scaleIn, fadeLeft }
}
