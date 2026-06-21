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

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function close() {
  open.value = false
}
</script>

<template>
  <!-- Pill top = 23px (12px hero inset + 11px gap to image top) -->
  <header class="fixed inset-x-0 top-10 z-50 px-3 sm:px-4 lg:top-[23px]">
    <div class="container-page min-w-0">
      <!-- Desktop: fixed 899.743px pill, centred on 1440px canvas -->
      <nav
        class="mx-auto hidden h-[60px] w-full max-w-[899.743px] items-center gap-10 rounded-[60px] border-[0.5px] border-line-subtle bg-white px-[10px] py-[6px] transition-shadow duration-300 lg:flex"
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

      <!-- Mobile bar -->
      <nav
        class="relative flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-[60px] border-[0.5px] border-line-subtle bg-white px-3 py-[6px] shadow-sm lg:hidden"
        :class="scrolled ? 'shadow-md shadow-black/8' : ''"
      >
        <a href="/" class="flex min-w-0 shrink items-center" @click="close">
          <img
            src="/images/logo.svg"
            alt="Kaorex"
            class="h-9 w-[97px] object-contain object-left"
          />
        </a>

        <button
          class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-heading"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <svg
            v-if="!open"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </nav>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="open"
          class="mt-2 w-full overflow-hidden rounded-3xl border-[0.5px] border-line-subtle bg-white p-4 shadow-xl lg:hidden"
        >
          <ul class="flex flex-col">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="block rounded-xl px-3 py-3 text-sm font-medium leading-5 text-heading transition-colors hover:bg-muted"
                @click="close"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
          <div class="mt-3 flex flex-col gap-3">
            <AppButton variant="secondary" href="#" :show-icon="false" block @click="close">
              Sign in
            </AppButton>
            <AppButton variant="primary" href="/contact" :show-icon="false" block @click="close">
              Contact us
            </AppButton>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>
