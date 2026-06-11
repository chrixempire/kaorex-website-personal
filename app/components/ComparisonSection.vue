<script setup lang="ts">
/**
 * "A better way to exchange currency" — Figma 3105:665 (desktop), 3139:314 (mobile).
 * Panel pins on scroll; white card content steps through states on scroll up/down.
 */
const states = [
  {
    eyebrow: 'Escrow Protection',
    icon: '/images/exchange/01-escrow.png',
    heading: 'Every transaction secured by multi-signature escrow.',
    sub: 'Funds released only after both parties confirm.',
  },
  {
    eyebrow: 'Market-Driven Rates',
    icon: '/images/exchange/02-rates.png',
    heading: 'Real-time pricing set by users.',
    sub: 'Browse offers, compare rates, and choose the best deal for your volume.',
  },
  {
    eyebrow: 'Verified Community',
    icon: '/images/exchange/03-verified.png',
    heading: 'All users undergo KYC verification.',
    sub: 'Trade with confidence in a trusted, invite-only marketplace.',
  },
  {
    eyebrow: 'Instant Settlement',
    icon: '/images/exchange/04-settlement.png',
    heading: 'Automated escrow release after confirmation.',
    sub: 'Complete transactions in minutes, not days.',
  },
  {
    eyebrow: 'Full Transparency',
    icon: '/images/exchange/05-transparency.png',
    heading: 'Complete audit trails for every trade.',
    sub: 'Real-time monitoring and comprehensive transaction history.',
  },
  {
    eyebrow: 'Bank-Grade Security',
    icon: '/images/exchange/06-security.png',
    heading: 'End-to-end encryption, secure communication, and fraud detection.',
    sub: 'To protect every exchange.',
  },
] as const

const sectionRef = ref<HTMLElement | null>(null)
const pinRef = ref<HTMLElement | null>(null)
const animated = ref(false)
const activeIndex = ref(0)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ctx: any = null

onMounted(async () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  animated.value = true
  await nextTick()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const section = sectionRef.value
  const pinEl = pinRef.value
  if (!section || !pinEl) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.comparison-state', pinEl)
    const N = cards.length

    gsap.set(cards, { autoAlpha: 0, y: 16, transformOrigin: '50% 50%' })
    gsap.set(cards[0], { autoAlpha: 1, y: 0 })

    let current = 0
    const show = (i: number) => {
      activeIndex.value = i
      if (i === current) return
      current = i
      cards.forEach((card, idx) => {
        gsap.to(card, {
          autoAlpha: idx === i ? 1 : 0,
          y: idx === i ? 0 : 16,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    const stepDistance = () => {
      const mobile = window.matchMedia('(max-width: 1023px)').matches
      return Math.max(window.innerHeight * (mobile ? 0.45 : 0.55), mobile ? 300 : 380)
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => '+=' + N * stepDistance(),
      pin: pinEl,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.max(0, Math.min(N - 1, Math.floor(self.progress * N - 1e-6)))
        show(i)
      },
    })

    ScrollTrigger.refresh()
  }, section)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="comparison" ref="sectionRef" class="w-full">
    <div class="section-panel">
      <!-- Scroll-pinned panel — desktop + mobile -->
      <div
        v-if="animated"
        ref="pinRef"
        class="relative flex h-[578px] flex-col overflow-hidden rounded-[30px] px-5 pt-[50px] pb-6 lg:h-[900px] lg:rounded-[40px] lg:px-[68px] lg:pt-[62px] lg:pb-[30px]"
      >
        <img
          src="/images/comparison-teal-bg.jpg"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div class="relative z-10 mx-auto w-full max-w-[350px] shrink-0 text-center lg:max-w-[502px]">
          <h2 class="text-2xl font-medium leading-8 text-white lg:text-[clamp(2rem,5vw,3rem)] lg:leading-[60px]">
            A Better way to exchange currency
          </h2>
          <p class="mt-0 text-base font-normal leading-6 tracking-[0.32px] text-canvas lg:text-xl lg:leading-7 lg:tracking-normal">
            Traditional FX markets are fragmented, opaque, and risky. FX P2P
            provides the secure infrastructure Nigeria needs.
          </p>
        </div>

        <div class="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-end gap-2">
          <div
            class="relative h-[322px] w-full max-w-[338px] overflow-hidden rounded-[24px] bg-white lg:h-[575px] lg:max-w-[1280px] lg:rounded-[40px]"
            aria-live="polite"
            :aria-label="`Feature: ${states[activeIndex].eyebrow}`"
          >
            <article
              v-for="(s, i) in states"
              :key="s.eyebrow"
              class="comparison-state absolute inset-0 flex flex-col items-center justify-center gap-4 px-3 text-center lg:gap-[30px] lg:px-6"
              :class="i === 0 ? '' : 'opacity-0'"
            >
              <p class="text-lg font-medium leading-7 text-body lg:text-[18px]">{{ s.eyebrow }}</p>
              <img
                :src="s.icon"
                alt=""
                aria-hidden="true"
                class="h-[110px] w-[145px] object-contain lg:h-[151px] lg:w-[198px]"
              />
              <div class="flex max-w-[314px] flex-col items-center gap-0 text-center lg:max-w-[555px] lg:gap-1">
                <p class="text-lg font-medium leading-7 text-heading lg:whitespace-nowrap lg:text-2xl lg:leading-8 lg:text-nowrap">
                  {{ s.heading }}
                </p>
                <p class="text-sm font-medium leading-5 text-body lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                  {{ s.sub }}
                </p>
              </div>
            </article>
          </div>

          <div
            class="flex shrink-0 items-center justify-center gap-2"
            role="tablist"
            :aria-label="`Step ${activeIndex + 1} of ${states.length}`"
          >
            <div
              v-for="(s, i) in states"
              :key="s.eyebrow"
              role="tab"
              :aria-selected="activeIndex === i"
              :aria-label="s.eyebrow"
              class="h-2 rounded-full transition-all duration-300 ease-out"
              :class="activeIndex === i ? 'w-6 bg-white' : 'w-2 bg-white/40'"
            />
          </div>
        </div>
      </div>

      <!-- Reduced motion: static stacked cards -->
      <div
        v-else
        class="relative min-h-[578px] overflow-hidden rounded-[30px] lg:min-h-[900px] lg:rounded-[40px]"
      >
        <img
          src="/images/comparison-teal-bg.jpg"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 h-full w-full object-cover"
        />

        <div
          class="relative flex min-h-[578px] flex-col items-center px-5 pt-[50px] pb-8 lg:min-h-[900px] lg:px-[68px] lg:pt-[62px] lg:pb-[30px]"
        >
          <div class="mx-auto w-full max-w-[350px] text-center lg:max-w-[502px]">
            <h2 class="text-2xl font-medium leading-8 text-white lg:text-[clamp(2rem,5vw,3rem)] lg:leading-[60px]">
              A Better way to exchange currency
            </h2>
            <p class="mt-0 text-base font-normal leading-6 tracking-[0.32px] text-canvas lg:text-xl lg:leading-7 lg:tracking-normal">
              Traditional FX markets are fragmented, opaque, and risky. FX P2P
              provides the secure infrastructure Nigeria needs.
            </p>
          </div>

          <div
            class="mx-auto mt-10 flex w-full max-w-[338px] flex-col gap-10 rounded-[24px] bg-white px-6 py-12 lg:max-w-[1280px] lg:gap-12 lg:rounded-[40px] lg:px-10 lg:py-16"
          >
            <article
              v-for="s in states"
              :key="s.eyebrow"
              class="flex flex-col items-center gap-4 text-center lg:gap-[30px]"
            >
              <p class="text-lg font-medium leading-7 text-body lg:text-[18px]">{{ s.eyebrow }}</p>
              <img
                :src="s.icon"
                alt=""
                aria-hidden="true"
                class="h-[110px] w-[145px] object-contain lg:h-[151px] lg:w-[198px]"
              />
              <div class="flex max-w-[314px] flex-col items-center gap-0 text-center lg:max-w-[555px] lg:gap-1">
                <p class="text-lg font-medium leading-7 text-heading lg:whitespace-nowrap lg:text-2xl lg:leading-8 lg:text-nowrap">
                  {{ s.heading }}
                </p>
                <p class="text-sm font-medium leading-5 text-body lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                  {{ s.sub }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
