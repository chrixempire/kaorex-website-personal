<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

useSeoMeta({
  title: () => (isNotFound.value ? 'Page not found — Kaorex' : 'Something went wrong — Kaorex'),
  robots: 'noindex, follow',
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-canvas antialiased">
    <header class="px-4 pt-6 sm:px-6">
      <div class="container-page">
        <a href="/" class="inline-flex items-center" aria-label="Kaorex home" @click.prevent="goHome">
          <img
            src="/images/logo.svg"
            alt="Kaorex"
            class="h-9 w-[97px] object-contain object-left lg:h-12 lg:w-[129.743px]"
          />
        </a>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-5 py-20">
      <div class="flex max-w-[480px] flex-col items-center text-center">
        <p class="text-[80px] font-medium leading-none text-primary lg:text-[120px]">
          {{ error?.statusCode || 404 }}
        </p>
        <h1 class="mt-4 text-2xl font-medium leading-8 text-heading lg:text-[32px] lg:leading-10">
          {{ isNotFound ? 'Page not found' : 'Something went wrong' }}
        </h1>
        <p class="mt-3 text-base leading-6 tracking-[0.32px] text-body">
          {{
            isNotFound
              ? "The page you're looking for doesn't exist or may have moved."
              : 'An unexpected error occurred on our end. Please try again.'
          }}
        </p>
        <button
          type="button"
          class="mt-8 inline-flex h-12 items-center justify-center rounded-[44px] bg-primary px-6 text-base font-medium leading-6 tracking-[0.16px] text-white transition-colors hover:bg-primary-hover"
          @click="goHome"
        >
          Back to home
        </button>
      </div>
    </main>
  </div>
</template>
