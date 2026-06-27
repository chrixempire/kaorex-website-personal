<script setup lang="ts">
type TrailBubble = {
  id: number
  label: string
  color: string
  x: number
  y: number
  dx: number
  dy: number
  rotate: number
}

const levels = [
  { label: '₦', color: '#0d7d61' },
  { label: '$', color: '#065db3' },
  { label: '€', color: '#932ac9' },
  { label: '£', color: '#bd2b80' },
] as const

const bubbles = ref<TrailBubble[]>([])
let nextId = 0
let lastTime = 0
let nextDelay = 42
let lastPoint: { x: number; y: number } | null = null
let enabled = false
const removalTimers = new Set<ReturnType<typeof setTimeout>>()

let motionQuery: MediaQueryList | null = null
let pointerQuery: MediaQueryList | null = null
let widthQuery: MediaQueryList | null = null

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function clearTrail() {
  removalTimers.forEach((timer) => clearTimeout(timer))
  removalTimers.clear()
  bubbles.value = []
}

function syncEnabled() {
  enabled = Boolean(
    motionQuery && !motionQuery.matches && pointerQuery?.matches && widthQuery?.matches,
  )

  if (!enabled) {
    lastTime = 0
    lastPoint = null
    clearTrail()
  }
}

function onPointerMove(event: PointerEvent) {
  if (!enabled || (event.pointerType && event.pointerType !== 'mouse')) return

  const target = event.target
  if (
    target instanceof Element &&
    target.closest('a, button, input, select, textarea, label, [role="button"], [data-level-trail-block]')
  ) {
    return
  }

  const now = performance.now()
  if (now - lastTime < nextDelay) return
  if (lastPoint && Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) < 18) return

  lastTime = now
  nextDelay = random(42, 68)
  lastPoint = { x: event.clientX, y: event.clientY }

  const id = ++nextId
  const level = levels[(id - 1) % levels.length]
  const bubble: TrailBubble = {
    id,
    label: level.label,
    color: level.color,
    x: event.clientX + random(-20, 20),
    y: event.clientY + random(-16, 16),
    dx: random(-18, 18),
    dy: random(-34, -14),
    rotate: random(-14, 14),
  }

  bubbles.value = [...bubbles.value, bubble].slice(-8)

  const timer = setTimeout(() => {
    bubbles.value = bubbles.value.filter((item) => item.id !== id)
    removalTimers.delete(timer)
  }, 920)
  removalTimers.add(timer)
}

function bubbleStyle(bubble: TrailBubble) {
  return {
    '--trail-x': `${bubble.x}px`,
    '--trail-y': `${bubble.y}px`,
    '--trail-dx': `${bubble.dx}px`,
    '--trail-dy': `${bubble.dy}px`,
    '--trail-rotate': `${bubble.rotate}deg`,
    '--trail-color': bubble.color,
  }
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  pointerQuery = window.matchMedia('(pointer: fine)')
  widthQuery = window.matchMedia('(min-width: 1025px)')
  syncEnabled()

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  motionQuery.addEventListener('change', syncEnabled)
  pointerQuery.addEventListener('change', syncEnabled)
  widthQuery.addEventListener('change', syncEnabled)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  motionQuery?.removeEventListener('change', syncEnabled)
  pointerQuery?.removeEventListener('change', syncEnabled)
  widthQuery?.removeEventListener('change', syncEnabled)
  clearTrail()
})
</script>

<template>
  <Teleport to="body">
    <div class="level-trail-layer" aria-hidden="true">
      <span
        v-for="bubble in bubbles"
        :key="bubble.id"
        class="level-trail-bubble"
        :style="bubbleStyle(bubble)"
      >
        {{ bubble.label }}
      </span>
    </div>
  </Teleport>
</template>

<style scoped>
.level-trail-layer {
  position: fixed;
  inset: 0;
  z-index: 40;
  overflow: hidden;
  pointer-events: none;
}

.level-trail-bubble {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 999px;
  background: var(--trail-color);
  color: white;
  font-size: 11px;
  font-weight: 540;
  line-height: 1;
  opacity: 0;
  user-select: none;
  will-change: transform, opacity;
  animation: level-trail-float 920ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes level-trail-float {
  0% {
    opacity: 0;
    transform: translate3d(var(--trail-x), var(--trail-y), 0)
      translate(-50%, -50%) scale(0.72) rotate(0deg);
  }
  14% {
    opacity: 0.94;
  }
  100% {
    opacity: 0;
    transform: translate3d(
        calc(var(--trail-x) + var(--trail-dx)),
        calc(var(--trail-y) + var(--trail-dy)),
        0
      )
      translate(-50%, -50%) scale(1) rotate(var(--trail-rotate));
  }
}

@media (pointer: coarse), (prefers-reduced-motion: reduce), (max-width: 1024px) {
  .level-trail-layer {
    display: none;
  }
}
</style>
