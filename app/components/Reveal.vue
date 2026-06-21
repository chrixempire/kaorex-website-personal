<script setup lang="ts">
/**
 * Masked "rise into view" reveal — reverse-engineered from glossar.app.
 *
 * Words are wrapped in an overflow-hidden clip; the inner word starts at
 * translateY(110%) + opacity 0 and rises to translateY(0) + opacity 1
 * (expo-out easing), staggered word-by-word. Blocks (split="none") rise a few
 * px without a clip — used for button groups.
 *
 * Re-triggers every time the element enters the viewport (scroll up OR down),
 * matching glossar's behaviour. Honours prefers-reduced-motion and is SSR-safe.
 */
interface Props {
  as?: string
  text?: string
  split?: 'words' | 'none'
  delay?: number
  stagger?: number
  duration?: number
  y?: number
  gap?: string
  threshold?: number
  repeat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  text: '',
  split: 'none',
  delay: 0,
  stagger: 55,
  duration: 700,
  y: 16,
  gap: '0.26em',
  threshold: 0.2,
  repeat: true,
})

const root = ref<HTMLElement | null>(null)
const shown = ref(false)
const reduce = ref(false)

const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)' // expo-out, matches glossar

const words = computed(() =>
  props.split === 'words' && props.text ? props.text.split(/\s+/).filter(Boolean) : [],
)

function opacityDuration() {
  return Math.round(props.duration * 0.66) // opacity resolves a touch faster than the rise
}

/** Static clip wrapper around each word. */
function clipStyle(index: number, total: number) {
  return {
    display: 'inline-block',
    overflow: 'hidden',
    verticalAlign: 'top',
    // padding + negative margin gives descenders room without shifting layout
    paddingBottom: '0.14em',
    marginBottom: '-0.14em',
    marginRight: index === total - 1 ? '0' : props.gap,
  }
}

/** Animated inner word. */
function wordStyle(index: number) {
  if (reduce.value) return { display: 'inline-block' }

  const d = props.delay + index * props.stagger
  return {
    display: 'inline-block',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    transition: `transform ${props.duration}ms ${EASE} ${d}ms, opacity ${opacityDuration()}ms ${EASE} ${d}ms`,
    opacity: shown.value ? 1 : 0,
    transform: shown.value ? 'translateY(0)' : 'translateY(110%)',
  }
}

/** Whole-block rise (no clip) for slot content like button groups. */
const blockStyle = computed(() => {
  if (reduce.value) return {}
  return {
    willChange: 'transform, opacity',
    transition: `transform ${props.duration}ms ${EASE} ${props.delay}ms, opacity ${opacityDuration()}ms ${EASE} ${props.delay}ms`,
    opacity: shown.value ? 1 : 0,
    transform: shown.value ? 'translateY(0)' : `translateY(${props.y}px)`,
  }
})

onMounted(() => {
  reduce.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (reduce.value) {
    shown.value = true
    return
  }

  const el = root.value
  if (!el || typeof IntersectionObserver === 'undefined') {
    shown.value = true
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting)
      if (props.repeat) {
        shown.value = visible
      } else if (visible) {
        shown.value = true
        io.disconnect()
      }
    },
    { threshold: props.threshold },
  )
  io.observe(el)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <component :is="as" ref="root" :style="split === 'words' ? undefined : blockStyle">
    <template v-if="split === 'words' && text"
      ><span
        v-for="(w, i) in words"
        :key="i"
        :style="clipStyle(i, words.length)"
        ><span :style="wordStyle(i)">{{ w }}</span></span
      ></template
    >
    <slot v-else />
  </component>
</template>
