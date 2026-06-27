<script setup lang="ts">
const { requestContact } = useContactModal()
</script>

<template>
  <section id="top" class="relative z-10 w-full">
    <div
      class="relative h-[844px] min-h-[520px] w-full overflow-hidden rounded-t-[30px] bg-white lg:h-[min(900px,92vh)] lg:rounded-t-[40px]"
    >
      <img
        src="/images/hero-woman.webp"
        alt="A trader using the Kaorex marketplace on her phone"
        fetchpriority="high"
        width="1920"
        height="1225"
        class="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
      />
      <div class="absolute inset-0 bg-black/40" />

      <!-- Background panel stays full-bleed; content is capped to the 1416px column -->
      <div class="relative flex h-full w-full min-w-0 flex-col justify-end pb-12 lg:pb-[50px]">
        <div class="container-page px-3 lg:px-[50px]">
          <div class="flex flex-col gap-5 lg:max-w-[434px]">
            <Reveal
              as="h1"
              split="words"
              text="Peer-to-Peer FX Exchange"
              :delay="80"
              :stagger="55"
              class="max-w-[246px] text-[36px] font-bold leading-[44px] text-white lg:max-w-none lg:text-[60px] lg:leading-[60px]"
            />

            <Reveal
              as="p"
              split="words"
              text="Trade foreign currencies with verified users through escrow-backed transactions. Transparent rates, secure settlements, zero middlemen."
              :delay="260"
              :stagger="22"
              class="max-w-[278px] text-base font-medium leading-6 tracking-[0.16px] text-white lg:max-w-[372px] lg:text-xl lg:leading-7 lg:tracking-normal"
            />

            <Reveal
              as="div"
              :delay="520"
              class="flex flex-row flex-wrap items-center gap-3"
            >
              <AppButton
                variant="primary"
                class="group !h-10 !w-[168px] !px-4 !py-2.5 !text-sm !leading-5 lg:!h-12 lg:!px-6 lg:!py-3 lg:!text-base lg:!leading-6"
                :show-icon="false"
                @click="requestContact"
              >
                Contact us
              </AppButton>
              <AppButton
                variant="secondary"
                href="#how-it-works"
                class="group !h-10 !px-4 !py-2.5 !text-sm !leading-5 lg:!h-12 lg:!px-6 lg:!py-3 lg:!text-base lg:!leading-6"
                :show-icon="false"
              >
                See how it works
              </AppButton>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
