<script setup lang="ts">
const { fadeUp } = useMotionPresets()
</script>

<template>
  <section id="top" class="relative z-10 w-full">
    <div
      class="relative h-[844px] min-h-[520px] w-full overflow-hidden rounded-t-[30px] bg-white lg:h-[min(900px,92vh)] lg:rounded-t-[40px]"
    >
      <img
        src="/images/hero-woman.jpg"
        alt="A trader using the Kaorex marketplace on her phone"
        class="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
      />
      <div class="absolute inset-0 bg-black/40" />

      <div
        class="relative flex h-full w-full min-w-0 flex-col justify-end gap-5 px-3 pb-12 lg:max-w-[484px] lg:px-[50px] lg:pb-[50px]"
      >
        <h1
          v-motion
          :initial="fadeUp(0).initial"
          :visible-once="fadeUp(0).visibleOnce"
          class="max-w-[246px] text-[36px] font-bold leading-[44px] text-white lg:max-w-none lg:text-[60px] lg:leading-[60px]"
        >
          Peer-to-Peer FX Exchange
        </h1>

        <p
          v-motion
          :initial="fadeUp(120).initial"
          :visible-once="fadeUp(120).visibleOnce"
          class="max-w-[278px] text-base font-medium leading-6 tracking-[0.16px] text-white lg:max-w-[372px] lg:text-xl lg:leading-7 lg:tracking-normal"
        >
          Trade foreign currencies with verified users through escrow-backed
          transactions. Transparent rates, secure settlements, zero middlemen.
        </p>

        <div
          v-motion
          :initial="fadeUp(240).initial"
          :visible-once="fadeUp(240).visibleOnce"
          class="flex flex-row flex-wrap items-center gap-3"
        >
          <AppButton
            variant="primary"
            href="#cta"
            class="group !h-10 !w-[168px] !px-4 !py-2.5 !text-sm !leading-5 lg:!h-12 lg:!text-base lg:!leading-6"
            :show-icon="false"
          >
            Contact us
          </AppButton>
          <AppButton
            variant="secondary"
            href="#how-it-works"
            class="group !h-10 !px-4 !py-2.5 !text-sm !leading-5 lg:!h-12 lg:!text-base lg:!leading-6"
            :show-icon="false"
          >
            See how it works
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
