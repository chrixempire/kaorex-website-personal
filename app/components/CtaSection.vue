
<script setup lang="ts">
const { fadeUp, fadeIn } = useMotionPresets()
</script>

<template>
  <section id="cta" class="w-full">
    <div
      class="section-panel relative min-h-[485px] overflow-hidden rounded-[30px] bg-ink px-6 py-16 lg:min-h-[600px] lg:rounded-[40px] lg:px-14 lg:py-28"
    >
      <img
        v-motion
        :initial="fadeIn().initial"
        :visible-once="fadeIn().visibleOnce"
        src="/images/cta-pattern.png"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute -right-1/4 top-1/2 w-[160%] max-w-none -translate-y-1/2 rotate-[9.63deg] opacity-30 mix-blend-difference sm:w-[120%]"
      />

      <div class="relative max-w-[284px] lg:max-w-[462px]">
        <h2
          v-motion
          :initial="fadeUp().initial"
          :visible-once="fadeUp().visibleOnce"
          class="text-2xl font-medium leading-8 text-white lg:text-[clamp(2rem,5vw,3rem)] lg:leading-[60px]"
        >
          Ready to trade securely?
        </h2>
        <p
          v-motion
          :initial="fadeUp(100).initial"
          :visible-once="fadeUp(100).visibleOnce"
          class="mt-5 text-base leading-6 tracking-[0.32px] text-canvas lg:mt-2.5 lg:text-xl lg:leading-7 lg:tracking-normal"
        >
          Join the invite-only FX marketplace built for Nigerian traders who
          value security and transparency.
        </p>
        <div
          v-motion
          :initial="fadeUp(200).initial"
          :visible-once="fadeUp(200).visibleOnce"
          class="mt-5 lg:mt-2.5"
        >
          <AppButton
            variant="primary"
            href="#"
            class="group !h-10 !w-[168px] !px-4 !py-2.5 !text-sm !leading-5 lg:!h-12 lg:!text-base lg:!leading-6"
          >
            Contact us
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
