<script setup lang="ts">
useHead({
  title: 'Contact us — Kaorex',
  meta: [
    {
      name: 'description',
      content:
        'Speak to our team. Submit your details and the Kaorex team will review your request within 1-2 business days.',
    },
  ],
})
</script>

<template>
  <div>
    <TheNavbar />

    <main id="top" class="flex w-full min-w-0 flex-col overflow-x-hidden">
      <ContactSection />

      <div class="bg-canvas">
        <TheFooter />
      </div>
    </main>
  </div>
</template>
