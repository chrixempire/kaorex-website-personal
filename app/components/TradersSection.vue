<script setup lang="ts">
const { fadeUp } = useMotionPresets()

const traders = [
  {
    n: 2,
    badge: 'bg-warning',
    title: 'Seller',
    desc: 'I want to sell USD at a profitable exchange rate.',
    note: 'I can also buy when I need to.',
  },
  {
    n: 1,
    badge: 'bg-primary',
    title: 'Buyer',
    desc: 'I want to buy USD at a fair exchange rate',
    note: 'I can also sell later if I choose.',
  },
  {
    n: 3,
    badge: 'bg-purple',
    title: 'Marketer',
    desc: "I'm trading as an individual on behalf of others.",
    note: 'I can also buy when I need to.',
  },
] as const

/** Figma 3139:274 — stacked overlap order: Buyer, Seller, Marketer */
const mobileStack = [
  { ...traders[1], top: 0 },
  { ...traders[0], top: 181 },
  { ...traders[2], top: 362 },
] as const

const SPREAD_X = [0, 258, 516] as const
const STACK_CENTER = SPREAD_X[1]

const stackFan = [
  { x: 0, y: 0, rot: 0, z: 2, scale: 1 },
  { x: 0, y: 0, rot: 0, z: 3, scale: 1 },
  { x: 0, y: 0, rot: 0, z: 1, scale: 1 },
] as const

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

const sectionRef = ref<HTMLElement | null>(null)
const animateCards = ref(false)

const { progress } = useScrollSectionProgress(sectionRef, {
  disabled: computed(() => !animateCards.value),
  pinRatio: 0.55,
})

function cardTransform(index: number) {
  const t = progress.value
  const fan = stackFan[index]
  const x = lerp(STACK_CENTER + fan.x, SPREAD_X[index], t)
  const y = lerp(fan.y, 0, t)
  const rot = lerp(fan.rot, 0, t)
  const scale = lerp(fan.scale, 1, t)

  return {
    transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`,
    zIndex: Math.round(lerp(fan.z, 1, t)),
  }
}

let mq: MediaQueryList | null = null
let motionMq: MediaQueryList | null = null

function syncAnimate() {
  animateCards.value = Boolean(mq?.matches && !motionMq?.matches)
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 1024px)')
  motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncAnimate()
  mq.addEventListener('change', syncAnimate)
  motionMq.addEventListener('change', syncAnimate)
})

onBeforeUnmount(() => {
  mq?.removeEventListener('change', syncAnimate)
  motionMq?.removeEventListener('change', syncAnimate)
})
</script>

<template>
  <section class="relative z-[1]">
  <div
    ref="sectionRef"
    class="flex w-full flex-col items-center rounded-b-[30px] bg-subtle pt-16 pb-16 lg:rounded-b-[40px] lg:pt-[90px] lg:pb-[90px]"
  >
    <img
      v-motion
      :initial="fadeUp().initial"
      :visible-once="fadeUp().visibleOnce"
      src="/images/money-icon.png"
      alt=""
      aria-hidden="true"
      class="mb-6 h-[75.5px] w-[99px] object-contain mix-blend-difference lg:mb-10 lg:h-[151px] lg:w-[198px]"
    />

    <div class="text-center">
      <h2
        v-motion
        :initial="fadeUp(80).initial"
        :visible-once="fadeUp(80).visibleOnce"
        class="text-2xl font-medium leading-8 text-heading lg:text-[48px] lg:leading-[60px]"
      >
        Built for every trader
      </h2>
      <p
        v-motion
        :initial="fadeUp(160).initial"
        :visible-once="fadeUp(160).visibleOnce"
        class="mx-auto mt-0 max-w-[342px] text-base leading-6 tracking-[0.32px] text-body lg:max-w-[430px] lg:text-xl lg:leading-7 lg:tracking-normal"
      >
        Three distinct trading profiles, one platform built to make currency
        exchange simple and efficient.
      </p>
    </div>

    <div
      v-if="animateCards"
      class="relative mx-auto mt-10 h-[250px] w-full max-w-[786px]"
    >
      <div class="sticky top-[28vh] h-[250px]">
        <article
          v-for="(t, i) in traders"
          :key="t.n"
          class="trader-card absolute left-0 top-0 flex h-[250px] w-[270px] flex-col justify-between rounded-[24px] border border-ink-muted bg-ink px-[23px] py-8 will-change-transform"
          :style="cardTransform(i)"
        >
          <span
            :class="t.badge"
            class="flex h-[26px] w-[26px] items-center justify-center rounded-full text-base leading-6 tracking-wide text-white"
          >
            {{ t.n }}
          </span>

          <div>
            <h3 class="text-xl font-medium leading-7 text-white">{{ t.title }}</h3>
            <p class="mt-0 text-base leading-6 tracking-wide text-subtle">{{ t.desc }}</p>
          </div>

          <p class="text-sm leading-5 tracking-[0.42px] text-muted">{{ t.note }}</p>
        </article>
      </div>
    </div>

    <template v-else>
      <!-- Mobile: Figma 3139:274 stacked cards -->
      <div class="relative mx-auto mt-10 h-[553px] w-[240px] lg:hidden">
        <article
          v-for="(t, i) in mobileStack"
          :key="t.n"
          v-motion
          :initial="fadeUp(i * 120 + 200).initial"
          :visible-once="fadeUp(i * 120 + 200).visibleOnce"
          class="absolute left-0 flex h-[190px] w-[240px] flex-col justify-between rounded-2xl border border-ink-muted bg-ink px-5 py-6"
          :style="{ top: `${t.top}px` }"
        >
          <span
            :class="t.badge"
            class="flex h-[22px] w-[22px] items-center justify-center rounded-[30px] text-sm leading-5 text-white"
          >
            {{ t.n }}
          </span>

          <div>
            <h3 class="text-lg font-medium leading-7 text-white">{{ t.title }}</h3>
            <p class="mt-0 max-w-[166px] text-sm leading-5 tracking-[0.42px] text-subtle">{{ t.desc }}</p>
          </div>

          <p class="text-xs leading-4 tracking-[0.24px] text-muted">{{ t.note }}</p>
        </article>
      </div>

      <!-- Desktop static grid (reduced motion / non-lg) -->
      <div class="mt-10 hidden w-full max-w-[786px] gap-[18px] lg:grid lg:grid-cols-3">
        <article
          v-for="(t, i) in traders"
          :key="t.n"
          v-motion
          :initial="fadeUp(i * 120 + 200).initial"
          :visible-once="fadeUp(i * 120 + 200).visibleOnce"
          class="flex h-[250px] flex-col justify-between rounded-[24px] border border-ink-muted bg-ink px-[23px] py-8"
        >
          <span
            :class="t.badge"
            class="flex h-[26px] w-[26px] items-center justify-center rounded-full text-base leading-6 tracking-wide text-white"
          >
            {{ t.n }}
          </span>

          <div>
            <h3 class="text-xl font-medium leading-7 text-white">{{ t.title }}</h3>
            <p class="mt-0 text-base leading-6 tracking-wide text-subtle">{{ t.desc }}</p>
          </div>

          <p class="text-sm leading-5 tracking-[0.42px] text-muted">{{ t.note }}</p>
        </article>
      </div>
    </template>
  </div>
  </section>
</template>

<style scoped>
.trader-card {
  transform-origin: center center;
}
</style>
