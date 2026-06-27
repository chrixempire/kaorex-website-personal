<script setup lang="ts">
const props = defineProps<{
  activeIndex: number
  screens: readonly string[]
}>()

onMounted(() => {
  props.screens.forEach((screen) => {
    const image = new Image()
    image.src = screen
  })
})

const btnSide = [
  'linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 8.8542%, rgba(255,255,255,0.1) 17.187%, rgba(255,255,255,0.1) 83.333%, rgba(255,255,255,0) 91.667%, rgba(255,255,255,0.2) 100%), linear-gradient(90deg, rgb(126,126,126) 0%, rgb(126,126,126) 100%)',
  'linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 6.5241%, rgba(255,255,255,0.1) 13.168%, rgba(255,255,255,0.1) 89.242%, rgba(255,255,255,0) 94.557%, rgba(255,255,255,0.2) 100%), linear-gradient(90deg, rgb(126,126,126) 0%, rgb(126,126,126) 100%)',
  'linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 6.5241%, rgba(255,255,255,0.1) 13.168%, rgba(255,255,255,0.1) 89.242%, rgba(255,255,255,0) 94.557%, rgba(255,255,255,0.2) 100%), linear-gradient(90deg, rgb(126,126,126) 0%, rgb(126,126,126) 100%)',
]
const btnRight =
  'linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 50%), linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 5.5207%, rgba(255,255,255,0.1) 11.087%, rgba(255,255,255,0.1) 89.219%, rgba(255,255,255,0) 94.586%, rgba(255,255,255,0.2) 100%), linear-gradient(90deg, rgb(126,126,126) 0%, rgb(126,126,126) 100%)'
</script>

<template>
  <!-- Figma 3105:329 desktop 284.391×574 · mobile 3139:1055 175×353 -->
  <div class="relative mx-auto aspect-[284.391/574] w-[175px] shrink-0 lg:w-[284.391px]">
    <div class="absolute inset-x-[0.92%] inset-y-0 overflow-clip rounded-[26.491px] lg:rounded-[43.05px]">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 rounded-[26.491px] bg-[#fafafa] lg:rounded-[43.05px]"
      />
      <div class="absolute inset-0 overflow-clip rounded-[26.491px] bg-[#f5f8f8] lg:rounded-[43.05px]">
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <Transition name="phone-screen">
            <img
              :key="screens[activeIndex]"
              :src="screens[activeIndex]"
              alt=""
              class="absolute max-w-none object-cover object-top"
              style="height: 95.96%; width: 91.17%; left: 4.22%; top: 2.23%"
            />
          </Transition>
        </div>
      </div>
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-[2.16%_24.3%_94.09%_24.53%]"
      >
        <img
          src="/images/how-it-works/phone-eyebrow.svg"
          alt=""
          class="absolute inset-0 block size-full max-w-none"
        />
      </div>
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_0.602px_#d7d7d7,inset_0_0_0_1.606px_#2d2d2d,inset_0_0_0_2.007px_rgba(255,255,255,0.25),inset_0_0_0_7.626px_black] lg:shadow-[inset_0_0_0_0.978px_#d7d7d7,inset_0_0_0_2.609px_#2d2d2d,inset_0_0_0_3.261px_rgba(255,255,255,0.25),inset_0_0_0_12.393px_black]"
      />
    </div>

    <!-- Holes (3105:338) -->
    <div class="pointer-events-none absolute inset-x-[0.92%] inset-y-0">
      <div class="absolute inset-[0_20.64%_99.55%_78.44%] bg-gradient-to-b from-[#2f2f2f] to-[#404040]" />
      <div class="absolute inset-[9.77%_0.92%_89.77%_98.17%] flex items-center justify-center [container-type:size]">
        <div class="h-[100cqw] w-[100cqh] flex-none rotate-90">
          <div class="size-full bg-gradient-to-b from-[#2f2f2f] to-[#404040]" />
        </div>
      </div>
      <div class="absolute inset-[9.77%_98.17%_89.77%_0.92%] flex items-center justify-center [container-type:size]">
        <div class="-rotate-90 h-[100cqw] w-[100cqh] flex-none">
          <div class="size-full bg-gradient-to-b from-[#2f2f2f] to-[#404040]" />
        </div>
      </div>
      <div class="absolute inset-[89.77%_0.92%_9.77%_98.17%] flex items-center justify-center [container-type:size]">
        <div class="h-[100cqw] w-[100cqh] flex-none rotate-90">
          <div class="size-full bg-gradient-to-b from-[#2f2f2f] to-[#404040]" />
        </div>
      </div>
      <div class="absolute inset-[89.77%_98.17%_9.77%_0.92%] flex items-center justify-center [container-type:size]">
        <div class="-rotate-90 h-[100cqw] w-[100cqh] flex-none">
          <div class="size-full bg-gradient-to-b from-[#2f2f2f] to-[#404040]" />
        </div>
      </div>
      <div class="absolute inset-[99.55%_78.44%_0_20.64%] flex items-center justify-center [container-type:size]">
        <div class="h-[100cqh] w-[100cqw] flex-none rotate-180">
          <div class="size-full bg-gradient-to-b from-[#2f2f2f] to-[#404040]" />
        </div>
      </div>
    </div>

    <!-- Buttons (3105:345) -->
    <div
      class="pointer-events-none absolute inset-[16.14%_99.08%_80.45%_0]"
      :style="{ backgroundImage: btnSide[0] }"
    />
    <div
      class="pointer-events-none absolute inset-[23.18%_99.08%_69.55%_0.23%]"
      :style="{ backgroundImage: btnSide[1] }"
    />
    <div
      class="pointer-events-none absolute inset-[32.5%_99.08%_60.23%_0.23%]"
      :style="{ backgroundImage: btnSide[2] }"
    />
    <div class="pointer-events-none absolute inset-[25.68%_0_62.5%_99.08%] flex items-center justify-center [container-type:size]">
      <div class="h-[100cqh] w-[99.9998cqw] flex-none rotate-180">
        <div class="size-full" :style="{ backgroundImage: btnRight }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-screen-enter-active,
.phone-screen-leave-active {
  transition: opacity 350ms ease-in-out;
}

.phone-screen-enter-from,
.phone-screen-leave-to {
  opacity: 0;
}
</style>
