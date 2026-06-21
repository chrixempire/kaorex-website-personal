<script setup lang="ts">
const { fadeUp } = useMotionPresets()

const CARD_GAP = 20
const cardWidth = ref(340)
const CARD_STEP = computed(() => cardWidth.value + CARD_GAP)

const features = [
  {
    key: 'chat',
    title: 'Real-Time Chat',
    desc: 'Encrypted messaging for direct negotiation',
    mockup: '/images/features/chat-mockup.png',
  },
  {
    key: 'alerts',
    title: 'Smart Alerts',
    desc: 'Instant notifications for offers and confirmations',
    mockup: '/images/features/alerts-mockup.png',
  },
  {
    key: 'analytics',
    title: 'Trade Analytics',
    desc: 'Track history, rates, and patterns',
    mockup: '/images/features/analytics-mockup.png',
  },
  {
    key: 'devices',
    title: 'Multi-Device',
    desc: 'Seamless sync across all devices',
    mockup: null,
  },
  {
    key: 'proof',
    title: 'Proof Upload',
    desc: 'Document verification and audit trails',
    mockup: null,
  },
  {
    key: 'offers',
    title: 'Offer Management',
    desc: 'Create and manage multiple listings',
    mockup: '/images/features/offers-mockup.png',
  },
] as const

const viewportRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)
const maxScroll = ref(0)
const EDGE_TOLERANCE = 2

const canGoPrev = computed(() => scrollPosition.value > EDGE_TOLERANCE)
const canGoNext = computed(() => scrollPosition.value < maxScroll.value - EDGE_TOLERANCE)

function syncScrollPosition() {
  const viewport = viewportRef.value
  if (!viewport) return
  scrollPosition.value = viewport.scrollLeft
}

function updateMaxScroll() {
  const viewport = viewportRef.value
  if (!viewport) return
  maxScroll.value = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
  syncScrollPosition()
}

function syncCardWidth() {
  cardWidth.value = window.matchMedia('(min-width: 1024px)').matches ? 400 : 340
}

function scrollBy(dir: 1 | -1) {
  const viewport = viewportRef.value
  if (!viewport) return
  if (dir === -1 && !canGoPrev.value) return
  if (dir === 1 && !canGoNext.value) return
  const next = viewport.scrollLeft + dir * CARD_STEP.value
  viewport.scrollTo({
    left: Math.max(0, Math.min(maxScroll.value, next)),
    behavior: 'smooth',
  })
}

let isMouseDragging = false
let dragStartX = 0
let dragStartScroll = 0

function startMouseDrag(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || event.button !== 0) return
  const viewport = viewportRef.value
  if (!viewport) return
  isMouseDragging = true
  dragStartX = event.clientX
  dragStartScroll = viewport.scrollLeft
  viewport.setPointerCapture(event.pointerId)
  viewport.classList.add('is-dragging')
}

function moveMouseDrag(event: PointerEvent) {
  if (!isMouseDragging) return
  const viewport = viewportRef.value
  if (!viewport) return
  event.preventDefault()
  viewport.scrollLeft = dragStartScroll - (event.clientX - dragStartX)
}

function endMouseDrag(event: PointerEvent) {
  if (!isMouseDragging) return
  const viewport = viewportRef.value
  isMouseDragging = false
  viewport?.classList.remove('is-dragging')
  if (viewport?.hasPointerCapture(event.pointerId)) {
    viewport.releasePointerCapture(event.pointerId)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  syncCardWidth()
  nextTick(() => {
    updateMaxScroll()
    const track = trackRef.value
    if (track && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateMaxScroll)
      resizeObserver.observe(track)
    }
  })
  window.addEventListener('resize', updateMaxScroll)
  window.addEventListener('resize', syncCardWidth)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateMaxScroll)
  window.removeEventListener('resize', syncCardWidth)
})
</script>

<template>
  <!-- Figma 3105:405 — pt 58, gap 50, cards, gap 50, nav, pb 58 -->
  <section
    id="features"
    class="section-panel overflow-hidden rounded-[30px] bg-black lg:rounded-[40px]"
  >
    <div class="flex min-h-0 flex-col gap-[50px] pt-10 pb-10 lg:min-h-[824px] lg:pt-[58px] lg:pb-[58px]">
      <div class="mx-auto w-fit max-w-[342px] shrink-0 px-5 text-center lg:max-w-[526px] lg:px-0">
        <h2
          v-motion
          :initial="fadeUp().initial"
          :visible-once="fadeUp().visibleOnce"
          class="text-2xl font-medium leading-8 text-white lg:whitespace-nowrap lg:text-[48px] lg:leading-[60px] lg:[text-wrap:nowrap]"
        >
          Professional trading tools
        </h2>
        <p
          v-motion
          :initial="fadeUp(100).initial"
          :visible-once="fadeUp(100).visibleOnce"
          class="mt-0 text-base font-normal leading-6 tracking-[0.32px] text-subtle lg:whitespace-nowrap lg:text-xl lg:leading-7 lg:tracking-normal lg:[text-wrap:nowrap]"
        >
          Everything you need for secure, efficient FX transactions
        </p>
      </div>

      <div
        ref="viewportRef"
        class="feature-carousel no-scrollbar h-[450px] shrink-0 overflow-x-auto overflow-y-hidden lg:h-[490px]"
        @scroll.passive="syncScrollPosition"
        @pointerdown="startMouseDrag"
        @pointermove="moveMouseDrag"
        @pointerup="endMouseDrag"
        @pointercancel="endMouseDrag"
      >
        <div
          ref="trackRef"
          class="flex w-max gap-5 px-[30px]"
        >
          <article
            v-for="f in features"
            :key="f.key"
            class="relative flex h-[450px] w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] bg-white lg:h-[490px] lg:w-[400px]"
          >
            <div class="px-6 pt-8 lg:px-[30px] lg:pt-10">
              <h3 class="text-lg font-medium leading-7 text-heading lg:text-2xl lg:leading-8">{{ f.title }}</h3>
              <p class="mt-1 max-w-[220px] text-base font-normal leading-6 text-body lg:text-xl lg:leading-7">{{ f.desc }}</p>
            </div>

            <div class="relative mt-auto h-[260px] overflow-hidden rounded-b-[20px] lg:h-[287px]">
              <img
                v-if="f.mockup && f.key !== 'offers'"
                :src="f.mockup"
                alt=""
                aria-hidden="true"
                class="h-full w-full object-cover"
              />
              <div v-else-if="f.key === 'offers'" class="absolute inset-0 overflow-hidden">
                <img
                  :src="f.mockup!"
                  alt=""
                  aria-hidden="true"
                  class="absolute left-px top-[-95px] h-[574px] w-[718px] max-w-none object-cover"
                />
              </div>

              <div
                v-else-if="f.key === 'devices'"
                class="relative h-full overflow-hidden bg-[#f5f8f8]"
              >
                <div
                  class="absolute left-1/2 top-[-217px] h-[484px] w-[300px] -translate-x-1/2 overflow-hidden rounded-[36px] border border-[#d7d7d7] bg-[#fafafa] shadow-[inset_0_0_0_1px_#2d2d2d]"
                >
                  <div class="absolute inset-x-[24%] top-[10px] h-3 rounded-full bg-[#e5e7eb]" />
                  <div
                    class="absolute bottom-5 left-1/2 h-[234px] w-[260px] -translate-x-1/2 overflow-hidden rounded-[24px] bg-white"
                  >
                    <p class="pt-4 text-center text-xs tracking-wide text-sub">Connecting...</p>
                    <p class="text-center text-lg font-medium text-heading">80%</p>
                    <div class="mx-auto mt-3 h-1.5 w-16 overflow-hidden rounded-full bg-subtle">
                      <div class="h-full w-4/5 rounded-full bg-primary" />
                    </div>
                    <div
                      class="absolute bottom-0 left-1/2 h-[140px] w-[78px] -translate-x-1/2 translate-y-1/4"
                    >
                      <div class="h-full w-full rounded-[20px] bg-ink shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-else-if="f.key === 'proof'"
                class="relative h-full"
              >
                <img
                  src="/images/features/alerts-bg.png"
                  alt=""
                  aria-hidden="true"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div class="absolute left-[70px] top-1/2 h-[211px] w-[260px] -translate-y-1/2">
                  <div
                    class="absolute top-[50px] w-full rounded-2xl border border-line-subtle bg-white p-5 shadow-sm"
                  >
                    <p class="text-sm font-medium text-heading">Transaction documents</p>
                    <ul class="mt-2 space-y-1.5 text-base text-body">
                      <li class="flex items-center justify-between gap-6">
                        <span>Original invoice</span>
                        <span class="text-primary">↓</span>
                      </li>
                      <li class="flex items-center justify-between gap-6">
                        <span>Proof of payment (NGN)</span>
                        <span class="text-primary">↓</span>
                      </li>
                      <li class="flex items-center justify-between gap-6">
                        <span>Proof of payment (USD)</span>
                        <span class="text-primary">↓</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="absolute top-0 rounded-[10px] border border-line-subtle bg-white px-5 py-2 text-base font-medium text-heading shadow-sm"
                  >
                    Export
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="relative z-10 flex shrink-0 justify-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          :disabled="!canGoPrev"
          class="cursor-pointer transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          @click="scrollBy(-1)"
        >
          <img src="/images/arrow-left.svg" alt="" class="h-[30px] w-[30px]" />
        </button>
        <button
          type="button"
          aria-label="Next"
          :disabled="!canGoNext"
          class="cursor-pointer transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          @click="scrollBy(1)"
        >
          <img src="/images/arrow-right.svg" alt="" class="h-[30px] w-[30px]" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-carousel {
  cursor: grab;
  overscroll-behavior-inline: contain;
  scroll-padding-inline: 30px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.feature-carousel.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}

.feature-carousel img {
  -webkit-user-drag: none;
}
</style>
