/**
 * Linear scroll scrubbing from a section's viewport position. No extra pin
 * height needed — layout stays fixed while cards use sticky inside.
 */
export function useScrollSectionProgress(
  sectionRef: Ref<HTMLElement | null>,
  options: {
    disabled?: Ref<boolean>
    /** Viewport fraction where progress begins (default 0.5) */
    startRatio?: number
    /** Viewport heights of scroll to complete 0→1 (default 0.55) */
    pinRatio?: number
  } = {},
) {
  const progress = ref(0)
  const startRatio = options.startRatio ?? 0.5
  const pinRatio = options.pinRatio ?? 0.55

  function update() {
    if (options.disabled?.value) {
      progress.value = 1
      return
    }

    const el = sectionRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const pinScroll = window.innerHeight * pinRatio
    const start = window.innerHeight * startRatio
    const raw = (start - rect.top) / pinScroll

    progress.value = Math.min(1, Math.max(0, raw))
  }

  let ticking = false
  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      update()
      ticking = false
    })
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', update)
  })

  return { progress, update }
}
