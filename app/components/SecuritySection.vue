<script setup lang="ts">
const { fadeUp } = useMotionPresets()

const escrowFeatures = [
  {
    title: 'Multi-Signature Escrow',
    desc: 'Requires authorization from both parties plus platform confirmation.',
    icon: '/images/security/icon-pen.svg',
  },
  {
    title: 'Smart Hold & Release',
    desc: 'Automated settlement logic prevents premature fund movement.',
    icon: '/images/security/icon-lock.svg',
  },
  {
    title: 'Dispute Protection',
    desc: 'Funds frozen during disputes until fair resolution.',
    icon: '/images/security/icon-safe.svg',
  },
  {
    title: 'Time-Locked Security',
    desc: 'Configurable hold periods for adequate verification.',
    icon: '/images/security/icon-timer.svg',
  },
]

const monitoringFeatures = [
  {
    title: 'AI Fraud Detection',
    desc: 'Real-time monitoring flags suspicious patterns and behavior.',
    icon: '/images/security/icon-eye.svg',
  },
  {
    title: 'KYC/AML Compliance',
    desc: 'Identity verification and continuous screening for all users.',
    icon: '/images/security/icon-user.svg',
  },
  {
    title: 'Transaction Audits',
    desc: 'Complete logging and timestamping for regulatory compliance.',
    icon: '/images/security/icon-doc.svg',
  },
  {
    title: 'Encrypted Communication',
    desc: 'End-to-end encryption for all trader conversations.',
    icon: '/images/security/icon-password.svg',
  },
]
</script>

<template>
  <section id="security" class="w-full">
    <!-- Figma 3105:220 — orange bg, 86px 68px padding, 40px radius -->
    <div
      class="section-panel relative overflow-hidden rounded-[30px] bg-[lightgray] bg-cover bg-center bg-no-repeat px-5 py-10 lg:rounded-[40px] lg:px-[68px] lg:py-[86px]"
      style="background-image: url('/images/security/orange-bg.jpg')"
    >
      <div
        class="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center rounded-[24px] bg-white py-8 lg:h-[728px] lg:py-0"
      >
        <div class="flex w-full max-w-[1220px] flex-1 flex-col items-center px-4 pt-6 lg:px-0 lg:pt-[47px]">
          <div class="text-center">
            <h2
              v-motion
              :initial="fadeUp().initial"
              :visible-once="fadeUp().visibleOnce"
              class="text-2xl font-medium leading-8 text-heading lg:whitespace-nowrap lg:text-[48px] lg:leading-[60px] lg:[text-wrap:nowrap]"
            >
              Security-first infrastructure
            </h2>
            <p
              v-motion
              :initial="fadeUp(100).initial"
              :visible-once="fadeUp(100).visibleOnce"
              class="mx-auto mt-0 max-w-[342px] text-base font-normal leading-6 tracking-[0.32px] text-body lg:max-w-[502px] lg:text-xl lg:leading-7 lg:tracking-normal"
            >
              Multi-layer protection, continuous monitoring, and compliance at every step
            </p>
          </div>

          <div
            class="mt-10 grid w-full max-w-[1220px] grid-cols-1 gap-5 lg:mt-[78px] lg:grid-cols-2"
          >
            <article
              v-motion
              :initial="fadeUp(150).initial"
              :visible-once="fadeUp(150).visibleOnce"
              class="rounded-[20px] bg-muted px-6 pt-8 pb-8 lg:h-[467px] lg:px-[30px] lg:pt-10 lg:pb-0"
            >
              <div class="mb-8 lg:mb-[100px]">
                <h3 class="text-lg font-medium leading-7 text-heading lg:text-2xl lg:leading-8">Escrow System</h3>
                <p class="mt-1 text-base font-normal leading-6 text-body lg:text-xl lg:leading-7">
                  Encrypted messaging for direct negotiation
                </p>
              </div>

              <ul class="flex flex-col gap-2.5">
                <li
                  v-for="item in escrowFeatures"
                  :key="item.title"
                  class="flex items-center gap-3"
                >
                  <span class="flex h-[26px] w-[26px] shrink-0 items-center justify-center">
                    <img :src="item.icon" alt="" class="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div class="min-w-0">
                    <p class="text-base font-medium leading-6 tracking-[0.16px] text-heading">
                      {{ item.title }}
                    </p>
                    <p class="text-base font-normal leading-6 tracking-[0.32px] text-body">
                      {{ item.desc }}
                    </p>
                  </div>
                </li>
              </ul>
            </article>

            <article
              v-motion
              :initial="fadeUp(220).initial"
              :visible-once="fadeUp(220).visibleOnce"
              class="rounded-[20px] bg-muted px-6 pt-8 pb-8 lg:h-[467px] lg:px-[30px] lg:pt-10 lg:pb-0"
            >
              <div class="mb-8 lg:mb-[100px]">
                <h3 class="text-lg font-medium leading-7 text-heading lg:text-2xl lg:leading-8">
                  Platform Monitoring
                </h3>
                <p class="mt-1 text-base font-normal leading-6 text-body lg:text-xl lg:leading-7">
                  Encrypted messaging for direct negotiation
                </p>
              </div>

              <ul class="flex flex-col gap-2.5">
                <li
                  v-for="item in monitoringFeatures"
                  :key="item.title"
                  class="flex items-center gap-3"
                >
                  <span class="flex h-[26px] w-[26px] shrink-0 items-center justify-center">
                    <img :src="item.icon" alt="" class="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div class="min-w-0">
                    <p class="text-base font-medium leading-6 tracking-[0.16px] text-heading">
                      {{ item.title }}
                    </p>
                    <p class="text-base font-normal leading-6 tracking-[0.32px] text-body">
                      {{ item.desc }}
                    </p>
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
