<script setup lang="ts">
const { fadeUp } = useMotionPresets()

const faqs = FAQS

const open = ref(0)

function toggle(i: number) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="w-full pt-[50px]">
    <div class="container-page">
      <div class="px-3 pb-16 sm:pb-20 lg:px-0">
    <h2
      v-motion
      :initial="fadeUp().initial"
      :visible-once="fadeUp().visibleOnce"
      class="text-center text-2xl font-medium leading-8 text-heading lg:text-[clamp(2rem,5vw,3rem)] lg:leading-[60px]"
    >
      Frequently asked questions
    </h2>

    <div class="mx-auto mt-10 max-w-[366px] lg:max-w-[678px]">
      <div
        v-for="(item, i) in faqs"
        :key="item.q"
        v-motion
        :initial="fadeUp(i * 60).initial"
        :visible-once="fadeUp(i * 60).visibleOnce"
        class="border-b border-line-subtle py-2.5"
      >
        <button
          class="flex w-full cursor-pointer items-center justify-between gap-4 py-2.5 text-left"
          :aria-expanded="open === i"
          @click="toggle(i)"
        >
          <span class="text-base font-medium leading-6 text-heading lg:text-lg lg:leading-7">{{ item.q }}</span>
          <img
            :src="open === i ? '/images/faq-close.svg' : '/images/faq-plus.svg'"
            alt="" loading="lazy"
            class="h-3 w-3 shrink-0 lg:h-4 lg:w-4"
          />
        </button>

        <div
          class="grid transition-all duration-300 ease-out"
          :class="open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="overflow-hidden">
            <p class="max-w-[301px] pb-2.5 text-sm leading-5 tracking-[0.42px] text-body lg:max-w-[562px] lg:text-base lg:leading-6 lg:tracking-[0.32px]">
              {{ item.a }}
            </p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </section>
</template>
