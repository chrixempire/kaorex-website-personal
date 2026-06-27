<script setup lang="ts">
const { fadeUp } = useMotionPresets()

const faqs = [
  {
    q: 'How does the escrow system work?',
    a: 'When you initiate a trade, funds are immediately locked in our secure escrow. Neither party can access the funds until both confirm successful payment transfer. This eliminates counterparty risk and ensures safe transactions.',
  },
  {
    q: 'How long does verification take?',
    a: "KYC verification typically takes 24–48 hours. We manually review all documents to ensure platform security. You'll receive an email once your account is approved.",
  },
  {
    q: 'Is the platform invite only?',
    a: "Yes, FX P2P is currently invite-only to ensure quality and security. Request access through our waitlist, and we'll review your application within 3–5 business days.",
  },
  {
    q: "What happens if there's a trade dispute?",
    a: 'Our dispute resolution team reviews all evidence from both parties, including transaction receipts and communication logs. We typically resolve disputes within 2–3 business days with fair outcomes.',
  },
  {
    q: 'How are exchange rates determined?',
    a: 'Users set their own rates based on market conditions. You can browse multiple offers and choose the best rate for your volume. Our platform displays real-time market averages for reference.',
  },
  {
    q: 'What are the transaction limits?',
    a: 'Minimum trade is $100 USD equivalent. Maximum limits depend on your verification tier. Verified business accounts can trade up to $50,000 per transaction.',
  },
]

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
            alt=""
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
