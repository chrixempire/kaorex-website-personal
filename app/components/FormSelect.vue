<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

const props = withDefaults(
  defineProps<{
    modelValue: string
    options: readonly string[]
    placeholder?: string
    searchable?: boolean
    searchPlaceholder?: string
    error?: boolean
    id?: string
  }>(),
  {
    placeholder: 'Select an option',
    searchable: false,
    searchPlaceholder: 'Search...',
    error: false,
  },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const open = ref(false)
const search = ref('')
const searchEl = ref<HTMLInputElement | null>(null)

const filtered = computed(() => {
  if (!props.searchable || !search.value.trim()) return props.options
  const q = search.value.trim().toLowerCase()
  return props.options.filter((o) => o.toLowerCase().includes(q))
})

function onOpenChange(value: boolean) {
  open.value = value
  if (value && props.searchable) {
    search.value = ''
    setTimeout(() => searchEl.value?.focus(), 60)
  }
}

function pick(option: string) {
  emit('update:modelValue', option)
  open.value = false
  search.value = ''
}

function onSearchKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') return
  event.stopPropagation()
  if (event.key === 'Enter') {
    event.preventDefault()
    const first = filtered.value[0]
    if (first) pick(first)
  }
}

const borderClass = computed(() => (props.error ? 'border-required' : 'border-line'))
</script>

<template>
  <DropdownMenu :open="open" @update:open="onOpenChange">
    <DropdownMenuTrigger
      :id="id"
      type="button"
      :class="[
        'flex w-full items-center justify-between gap-2 rounded-[10px] border bg-white px-[14px] py-[10px] text-left text-sm leading-5 tracking-[0.42px] outline-none transition-colors data-[state=open]:border-primary lg:py-[12px] lg:text-base lg:leading-6 lg:tracking-[0.32px]',
        borderClass,
        modelValue ? 'text-ink' : 'text-placeholder',
      ]"
    >
      <span class="truncate">{{ modelValue || placeholder }}</span>
      <svg
        class="h-[17px] w-[17px] shrink-0 text-ink transition-transform data-[rotate]:rotate-180"
        :data-rotate="open ? '' : undefined"
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

    <DropdownMenuContent
      align="start"
      class="w-[var(--reka-dropdown-menu-trigger-width)] min-w-[12rem] p-0"
    >
      <div v-if="searchable" class="border-b border-line-subtle p-2">
        <input
          ref="searchEl"
          v-model="search"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full rounded-[8px] border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-placeholder focus:border-primary"
          @keydown="onSearchKeydown"
        />
      </div>
      <div class="max-h-[240px] overflow-y-auto p-1">
        <DropdownMenuItem
          v-for="option in filtered"
          :key="option"
          class="justify-between"
          @select="pick(option)"
        >
          <span class="truncate">{{ option }}</span>
          <svg
            v-if="option === modelValue"
            class="h-4 w-4 shrink-0 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        </DropdownMenuItem>
        <p v-if="!filtered.length" class="px-3 py-4 text-center text-sm text-sub">
          No results found
        </p>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
