<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useCountries, type Country } from '~/composables/useCountries'

const props = withDefaults(
  defineProps<{
    dialCode: string
    phone: string
    error?: boolean
    inputId?: string
  }>(),
  { error: false, inputId: 'phone' },
)

const emit = defineEmits<{
  (e: 'update:dialCode', value: string): void
  (e: 'update:phone', value: string): void
}>()

const { countries } = useCountries()

const open = ref(false)
const search = ref('')
const searchEl = ref<HTMLInputElement | null>(null)
const failedFlags = ref<Record<string, true>>({})

const selected = computed<Country | undefined>(
  () =>
    countries.find((c) => c.dial_code === props.dialCode) ??
    countries.find((c) => c.code === 'NG'),
)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return countries
  return countries.filter(
    (c) => c.name.toLowerCase().includes(q) || c.dial_code.includes(q),
  )
})

function onOpenChange(value: boolean) {
  open.value = value
  if (value) {
    search.value = ''
    // Focus the search box (reka focuses the first item by default).
    setTimeout(() => searchEl.value?.focus(), 60)
  }
}

function onSearchKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') return // let the menu close
  event.stopPropagation() // stop reka-ui's typeahead from hijacking keystrokes
  if (event.key === 'Enter') {
    event.preventDefault()
    const first = filtered.value[0]
    if (first) pick(first)
  }
}

function pick(country: Country) {
  emit('update:dialCode', country.dial_code)
  open.value = false
  search.value = ''
}

function markFailed(country: Country) {
  failedFlags.value = { ...failedFlags.value, [country.code]: true }
}

const phoneModel = computed({
  get: () => props.phone,
  set: (value: string) => emit('update:phone', value.replace(/[^0-9+ ]/g, '')),
})

const borderClass = computed(() => (props.error ? 'border-required' : 'border-line'))
</script>

<template>
  <div class="flex gap-[10px]">
    <DropdownMenu :open="open" @update:open="onOpenChange">
      <DropdownMenuTrigger
        type="button"
        :class="[
          'flex h-[40px] shrink-0 cursor-pointer items-center gap-[5px] rounded-[10px] border bg-white px-3 transition-colors lg:h-[52px] lg:px-[14px]',
          borderClass,
        ]"
        aria-label="Select country dialing code"
      >
        <span
          class="flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-full lg:h-[30px] lg:w-[30px]"
        >
          <img
            v-if="selected && !failedFlags[selected.code]"
            :src="selected.flag"
            :alt="selected.name"
            class="h-full w-full object-cover"
            @error="markFailed(selected)"
          />
          <span v-else-if="selected" class="text-base leading-none">{{ selected.emoji }}</span>
        </span>
        <span class="text-sm text-ink lg:text-base">{{ selected?.dial_code }}</span>
        <svg
          class="h-5 w-5 text-ink lg:h-[22px] lg:w-[22px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" class="w-[280px] p-0">
        <div class="border-b border-line-subtle p-2">
          <input
            ref="searchEl"
            v-model="search"
            type="text"
            placeholder="Search countries..."
            class="w-full rounded-[8px] border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-placeholder focus:border-primary"
            @keydown="onSearchKeydown"
          />
        </div>
        <div class="max-h-[240px] overflow-y-auto p-1">
          <DropdownMenuItem
            v-for="c in filtered"
            :key="c.code"
            class="gap-3"
            @select="pick(c)"
          >
            <span class="flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-sm">
              <img
                v-if="!failedFlags[c.code]"
                :src="c.flag"
                :alt="c.name"
                class="h-full w-full object-cover"
                @error="markFailed(c)"
              />
              <span v-else class="text-base leading-none">{{ c.emoji }}</span>
            </span>
            <span class="w-[46px] shrink-0 font-medium text-heading">{{ c.dial_code }}</span>
            <span class="truncate text-body">{{ c.name }}</span>
          </DropdownMenuItem>
          <p v-if="!filtered.length" class="px-3 py-4 text-center text-sm text-sub">
            No countries found
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

    <input
      :id="inputId"
      v-model="phoneModel"
      type="tel"
      :placeholder="`${dialCode} XXX XXX XXXX`"
      :class="[
        'w-full flex-1 rounded-[10px] border bg-white px-[14px] py-[10px] text-sm leading-5 tracking-[0.42px] text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/15 lg:py-[12px] lg:text-base lg:leading-6 lg:tracking-[0.32px]',
        borderClass,
      ]"
    />
  </div>
</template>
