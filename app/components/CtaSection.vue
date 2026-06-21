
<script setup lang="ts">
const { fadeIn } = useMotionPresets()
const { requestContact } = useContactModal()
</script>

<template>
  <section id="cta" class="w-full">
    <div
      class="section-panel relative min-h-[485px] overflow-hidden rounded-[30px] bg-ink py-16 lg:min-h-[600px] lg:rounded-[40px] lg:py-28"
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

      <!-- Background panel + pattern stay full-bleed; content is capped to the 1416px column -->
      <div class="container-page relative px-6 lg:px-14">
        <div class="max-w-[284px] lg:max-w-[462px]">
          <Reveal
            as="h2"
            split="words"
            text="Ready to trade securely?"
            :delay="60"
            :stagger="55"
            class="text-2xl font-medium leading-8 text-white lg:text-[clamp(2rem,5vw,3rem)] lg:leading-[60px]"
          />
          <Reveal
            as="p"
            split="words"
            text="Join the invite-only FX marketplace built for Nigerian traders who value security and transparency."
            :delay="240"
            :stagger="24"
            class="mt-5 text-base leading-6 tracking-[0.32px] text-canvas lg:mt-2.5 lg:text-xl lg:leading-7 lg:tracking-normal"
          />
          <Reveal as="div" :delay="460" class="mt-5 lg:mt-2.5">
            <AppButton
              variant="primary"
              class="group !h-10 !w-[168px] !px-4 !py-2.5 !text-sm !leading-5 lg:!h-12 lg:!text-base lg:!leading-6"
              @click="requestContact"
            >
              Contact us
            </AppButton>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
</template>
