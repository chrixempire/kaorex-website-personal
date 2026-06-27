<script setup lang="ts">
// Keep the "contact" experience consistent across the lg breakpoint:
//  • grow to desktop while the mobile modal is open  → go to the /contact page
//  • shrink to mobile while on the /contact page      → go home and open the modal
const { open, openModal, closeModal } = useContactModal()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const mq = window.matchMedia('(min-width: 1024px)')
  const onChange = (e: MediaQueryListEvent) => {
    if (e.matches) {
      if (open.value) {
        closeModal()
        if (route.path !== '/contact') router.push('/contact')
      }
    } else if (route.path === '/contact') {
      router.push('/')
      openModal()
    }
  }
  mq.addEventListener('change', onChange)
  onBeforeUnmount(() => mq.removeEventListener('change', onChange))
})

/* ── Site-wide SEO defaults (pages override title/description/canonical) ── */
useSeoMeta({
  ogSiteName: SITE.name,
  ogType: 'website',
  ogLocale: SITE.locale,
  ogImage: absoluteUrl(SITE.ogImage),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: SITE.defaultTitle,
  twitterCard: 'summary_large_image',
  twitterSite: SITE.twitter,
  twitterImage: absoluteUrl(SITE.ogImage),
})

/* Organization + WebSite structured data (applies across the whole site). */
useHead({
  htmlAttrs: { lang: 'en' },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': absoluteUrl('/#organization'),
            name: SITE.name,
            url: SITE.url,
            logo: absoluteUrl('/images/logo.png'),
            email: SITE.email,
            description: SITE.description,
          },
          {
            '@type': 'WebSite',
            '@id': absoluteUrl('/#website'),
            url: SITE.url,
            name: SITE.name,
            description: SITE.description,
            inLanguage: 'en',
            publisher: { '@id': absoluteUrl('/#organization') },
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-canvas antialiased">
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <!-- Globally available so the navbar can open it from any page (mobile) -->
    <ContactModal />
  </div>
</template>
