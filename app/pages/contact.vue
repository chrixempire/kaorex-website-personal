<script setup lang="ts">
const title = 'Contact us — Kaorex'
const description =
  'Speak to our team. Submit your details and the Kaorex team will review your request within 1-2 business days.'
const canonical = absoluteUrl('/contact')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: canonical,
  twitterTitle: title,
  twitterDescription: description,
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        isPartOf: { '@id': absoluteUrl('/#website') },
        inLanguage: 'en',
        about: { '@id': absoluteUrl('/#organization') },
      }),
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
