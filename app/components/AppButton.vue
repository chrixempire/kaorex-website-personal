<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'light'
  href?: string
  block?: boolean
  showIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  href: undefined,
  block: false,
  showIcon: true,
})

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-base font-medium leading-6 tracking-[0.16px] transition-all duration-200 will-change-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2'

const variants: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md',
  secondary: 'bg-muted text-heading hover:bg-subtle',
  light: 'bg-white text-heading hover:bg-white/90',
}

const tag = computed(() => (props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :class="[base, variants[variant], block ? 'w-full' : '']"
  >
    <slot />
    <svg
      v-if="showIcon"
      class="h-[18px] w-[18px] -mr-1 transition-transform duration-200 group-hover:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </component>
</template>
