<script setup lang="ts">
const { fadeUp } = useMotionPresets()

const STEP_MS = 8000
const DESKTOP_STEP_PITCH = 44

/** Figma ring mid-line: outer 14.625, inner ~12.426 → stroke 2.2 on r 13.525 */
const RING_CX = 14.625
const RING_CY = 14.625
const RING_RADIUS = 13.525
const RING_STROKE = 2.2
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const steps = [
  { label: 'Create & verify account', screen: '/images/how-it-works/screen-01.png' },
  { label: 'Browse marketplace', screen: '/images/how-it-works/screen-02.png' },
  { label: 'Negotiate terms', screen: '/images/how-it-works/screen-03.png' },
  { label: 'Escrow activation', screen: '/images/how-it-works/screen-04.png' },
  { label: 'Transfer & confirm', screen: '/images/how-it-works/screen-05.png' },
  { label: 'Automated release', screen: '/images/how-it-works/screen-06.png' },
] as const

const screens = steps.map((s) => s.screen)

const active = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function startTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    active.value = (active.value + 1) % steps.length
  }, STEP_MS)
}

function selectStep(index: number) {
  active.value = index
  startTimer()
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <!-- Figma 3105:324 desktop · 3139:1050 mobile -->
  <section id="how-it-works" class="w-full overflow-x-hidden">
    <div
      class="section-panel flex flex-col items-center justify-center gap-[30px] rounded-[30px] bg-ink px-5 py-12 lg:min-h-[1010px] lg:gap-[60px] lg:rounded-[40px] lg:px-6 lg:py-0"
    >
      <div class="flex w-full max-w-[300px] flex-col items-center text-center lg:max-w-[392px]">
        <h2
          v-motion
          :initial="fadeUp().initial"
          :visible-once="fadeUp().visibleOnce"
          class="text-balance text-center text-2xl font-medium leading-8 text-white lg:text-nowrap lg:text-[48px] lg:leading-[60px]"
        >
          How it works
        </h2>
        <p
          v-motion
          :initial="fadeUp(100).initial"
          :visible-once="fadeUp(100).visibleOnce"
          class="mt-0 max-w-[300px] text-balance text-center text-base font-normal leading-6 tracking-[0.32px] text-white lg:max-w-[392px] lg:text-[20px] lg:leading-[28px] lg:tracking-normal"
        >
          Six simple steps from account creation to completed transaction
        </p>
      </div>

      <div
        class="flex w-full max-w-[288px] flex-col items-center gap-[30px] lg:grid lg:w-auto lg:max-w-none lg:grid-cols-[284.391px_288px] lg:items-center lg:gap-[60px]"
      >
        <PhoneFrame :active-index="active" :screens="screens" />

        <!-- Mobile: Figma 3139:1076 — single active step in 77px clip -->
        <div class="w-full max-w-[288px] lg:hidden">
          <button
            type="button"
            class="flex h-[77px] w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden"
            @click="selectStep((active + 1) % steps.length)"
          >
            <span class="relative flex h-[29px] w-[29px] shrink-0 items-center justify-center">
              <svg
                :key="active"
                class="step-progress absolute inset-0 size-full -rotate-90"
                viewBox="0 0 29.25 29.25"
                fill="none"
                aria-hidden="true"
                :style="{
                  '--step-duration': `${STEP_MS}ms`,
                  '--progress-c': `${PROGRESS_CIRCUMFERENCE}`,
                }"
              >
                <circle
                  :cx="RING_CX"
                  :cy="RING_CY"
                  :r="RING_RADIUS"
                  fill="none"
                  stroke="#777777"
                  :stroke-width="RING_STROKE"
                />
                <circle
                  :cx="RING_CX"
                  :cy="RING_CY"
                  :r="RING_RADIUS"
                  fill="none"
                  stroke="white"
                  :stroke-width="RING_STROKE"
                  stroke-linecap="round"
                  class="step-progress__ring"
                />
              </svg>
              <span class="relative text-lg leading-7 text-white">{{ active + 1 }}</span>
            </span>
            <span class="text-xl font-medium leading-7 text-white">
              {{ steps[active].label }}
            </span>
          </button>
        </div>

        <!-- Desktop: full step list -->
        <div class="relative hidden w-full sm:max-w-[288px] lg:block">
          <span
            class="absolute left-0 top-[1.5px] z-10 flex h-[29px] w-[29px] items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
            :style="{ transform: `translate3d(0, ${active * DESKTOP_STEP_PITCH}px, 0)` }"
          >
            <svg
              :key="active"
              class="step-progress absolute inset-0 size-full -rotate-90"
              viewBox="0 0 29.25 29.25"
              fill="none"
              aria-hidden="true"
              :style="{
                '--step-duration': `${STEP_MS}ms`,
                '--progress-c': `${PROGRESS_CIRCUMFERENCE}`,
              }"
            >
              <circle
                :cx="RING_CX"
                :cy="RING_CY"
                :r="RING_RADIUS"
                fill="none"
                stroke="#777777"
                :stroke-width="RING_STROKE"
              />
              <circle
                :cx="RING_CX"
                :cy="RING_CY"
                :r="RING_RADIUS"
                fill="none"
                stroke="white"
                :stroke-width="RING_STROKE"
                stroke-linecap="round"
                class="step-progress__ring"
              />
            </svg>
            <span class="relative text-lg leading-7 text-white">{{ active + 1 }}</span>
          </span>

          <ol class="flex w-full flex-col gap-3">
            <li
              v-for="(step, i) in steps"
              :key="step.label"
              class="flex min-h-8 items-center"
            >
              <button
                type="button"
                class="flex w-full cursor-pointer items-center text-left"
                :aria-current="active === i ? 'step' : undefined"
                @click="selectStep(i)"
              >
                <span
                  class="origin-left whitespace-nowrap text-2xl font-medium leading-8 transition-[color,opacity,translate,scale] duration-400 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
                  :class="active === i ? 'translate-x-[45px] scale-100 text-white opacity-100' : 'translate-x-0 scale-[0.98] text-sub opacity-60'"
                >
                  {{ step.label }}
                </span>
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-progress__ring {
  stroke-dasharray: var(--progress-c);
  stroke-dashoffset: var(--progress-c);
  animation: step-progress-fill var(--step-duration) linear forwards;
}

@keyframes step-progress-fill {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-progress__ring {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
