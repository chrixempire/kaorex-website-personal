
<script setup lang="ts">
const { fadeIn } = useMotionPresets()
const { requestContact } = useContactModal()
</script>

<template>
  <section id="cta" class="w-full">
    <div
      class="section-panel relative flex min-h-[485px] items-center overflow-hidden rounded-[30px] bg-ink lg:min-h-[600px] lg:rounded-[40px]"
    >
      <img
        v-motion
        :initial="fadeIn().initial"
        :visible-once="fadeIn().visibleOnce"
        src="/images/cta-pattern.webp"
        alt="" loading="lazy"
        aria-hidden="true"
        class="pointer-events-none absolute -right-1/4 top-1/2 w-[160%] max-w-none -translate-y-1/2 rotate-[9.63deg] opacity-30 mix-blend-difference sm:w-[120%]"
      />

      <!-- Background panel + pattern stay full-bleed; content is capped to the 1416px column
           and vertically centred (Figma 3149:12: top-1/2, items-start, gap-10). -->
      <div class="container-page relative px-4 lg:px-14">
        <div class="flex flex-col items-start gap-5 lg:gap-2.5">
          <Reveal
            as="h2"
            split="words"
            text="Ready to trade securely?"
            :delay="60"
            :stagger="55"
            class="whitespace-nowrap text-2xl font-medium leading-8 text-white lg:text-[48px] lg:leading-[60px]"
          />
          <Reveal
            as="p"
            split="words"
            text="Join the invite-only FX marketplace built for Nigerian traders who value security and transparency."
            :delay="240"
            :stagger="24"
            class="max-w-[284px] text-base leading-6 tracking-[0.32px] text-canvas lg:max-w-[462px] lg:text-xl lg:leading-7 lg:tracking-normal"
          />
          <Reveal as="div" :delay="460">
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
