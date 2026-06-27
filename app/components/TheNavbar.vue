<script setup lang="ts">
const links = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Security', href: '/#security' },
  { label: 'Features', href: '/#features' },
  { label: 'Comparison', href: '/#comparison' },
  { label: 'FAQ', href: '/#faq' },
]

const open = ref(false)
const scrolled = ref(false)
const sound = useUiSound()
const { openModal } = useContactModal()

// Mobile: collapse the nav first, then open the contact modal in place
// (no navigation). The delay lets the menu finish its close animation.
function openContact() {
  close()
  window.setTimeout(openModal, 300)
}

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function toggle() {
  open.value = !open.value
  open.value ? sound.playOpen() : sound.playClose()
}

function close() {
  if (!open.value) return
  open.value = false
  sound.playClose()
}

// Staggered menu-item reveal (values reverse-engineered from glossar.app):
// items start slightly raised + transparent and settle in, 80ms apart.
const ISLAND_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
function itemStyle(i: number) {
  const delay = open.value ? 0.16 + i * 0.08 : 0
  return {
    transition: `opacity 0.46s ${ISLAND_EASE} ${delay}s, transform 0.7s ${ISLAND_EASE} ${delay}s`,
    opacity: open.value ? 1 : 0,
    transform: open.value ? 'translateY(0)' : 'translateY(-10px)',
    willChange: 'opacity, transform',
  }
}
</script>

<template>
  <!-- Pill top = 23px (12px hero inset + 11px gap to image top) -->
  <header class="fixed inset-x-0 top-10 z-50 px-3 sm:px-4 lg:top-[23px]">
    <div class="container-page min-w-0">
      <!-- Desktop: fixed 899.743px pill, centred on 1440px canvas -->
      <nav
        class="mx-auto hidden h-[60px] w-full max-w-[899.743px] items-center gap-10 rounded-[60px] border-[0.5px] border-line-subtle bg-white px-[6px] py-[6px] transition-shadow duration-300 lg:flex"
        :class="scrolled ? 'shadow-md shadow-black/8' : 'shadow-sm'"
      >
        <a href="/" class="flex w-[129.743px] shrink-0 items-center" @click="close">
          <img
            src="/images/logo.svg"
            alt="Kaorex"
            class="h-12 w-[129.743px] object-contain object-left"
          />
        </a>

        <ul class="flex min-w-0 flex-1 items-center justify-center gap-6">
          <li v-for="link in links" :key="link.href" class="shrink-0">
            <a
              :href="link.href"
              class="whitespace-nowrap text-sm font-medium leading-5 tracking-normal text-heading transition-colors hover:text-primary"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <div class="flex w-[288px] shrink-0 items-center justify-end gap-3">
          <a
            href="#"
            class="inline-flex h-12 w-[116px] shrink-0 items-center justify-center rounded-[44px] bg-muted px-6 py-3 text-base font-medium leading-6 tracking-[0.16px] text-heading transition-colors hover:bg-subtle"
          >
            Sign in
          </a>
          <NuxtLink
            to="/contact"
            class="inline-flex h-12 w-[160px] shrink-0 items-center justify-center rounded-[44px] bg-primary px-6 py-3 text-base font-medium leading-6 tracking-[0.16px] text-white transition-colors hover:bg-primary-hover"
          >
            Contact us
          </NuxtLink>
        </div>
      </nav>

      <!-- Mobile: a single pill that expands downward to hold the menu -->
      <div
        class="w-full min-w-0 overflow-hidden border-[0.5px] border-line-subtle bg-white transition-[border-radius,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] lg:hidden"
        :class="
          open
            ? 'rounded-[28px] shadow-xl'
            : scrolled
              ? 'rounded-[60px] shadow-md shadow-black/8'
              : 'rounded-[60px] shadow-sm'
        "
      >
        <!-- Top bar (always visible) -->
        <div class="flex h-12 w-full items-center justify-between gap-3 px-3 py-[6px]">
          <a href="/" class="flex min-w-0 shrink items-center" @click="close">
            <img
              src="/images/logo.svg"
              alt="Kaorex"
              class="h-9 w-[97px] object-contain object-left"
            />
          </a>

          <button
            class="relative flex h-5 w-5 shrink-0 items-center justify-center text-heading"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            @click="toggle"
          >
            <!-- Two bars converge into a single line when open (glossar style) -->
            <span
              class="absolute h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              :class="open ? 'translate-y-0' : '-translate-y-[3.5px]'"
            />
            <span
              class="absolute h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              :class="open ? 'translate-y-0' : 'translate-y-[3.5px]'"
            />
          </button>
        </div>

        <!-- Expandable region: animates its own height via grid-rows -->
        <div
          class="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
          :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div id="mobile-menu" class="min-h-0 overflow-hidden" :inert="!open">
            <div class="px-3 pb-3 pt-1">
              <ul class="divide-y divide-line-subtle overflow-hidden rounded-2xl bg-muted">
                <li v-for="(link, i) in links" :key="link.href" :style="itemStyle(i)">
                  <a
                    :href="link.href"
                    class="block px-4 py-3.5 text-sm font-medium leading-5 text-heading transition-colors hover:bg-subtle"
                    @click="close"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
              <div class="mt-3 flex flex-col gap-3">
                <div :style="itemStyle(links.length)">
                  <AppButton variant="secondary" href="#" :show-icon="false" block @click="close">
                    Sign in
                  </AppButton>
                </div>
                <div :style="itemStyle(links.length + 1)">
                  <AppButton variant="primary" :show-icon="false" block @click="openContact">
                    Contact us
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
