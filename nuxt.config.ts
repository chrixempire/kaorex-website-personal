import tailwindcss from '@tailwindcss/vite'
import { SITE } from './app/utils/seo'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@vueuse/motion/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Site identity consumed by @nuxtjs/sitemap and @nuxtjs/robots.
  site: {
    url: SITE.url,
    name: SITE.name,
  },

  // robots.txt: allow crawling and point to the sitemap (auto-wired from `site`).
  robots: {
    allow: '/',
  },

  // shadcn-vue components under ui/ are imported explicitly (via their index.ts),
  // so exclude them from auto-import to avoid duplicate-name warnings.
  components: [{ path: '~/components', ignore: ['**/ui/**'] }],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle these deps so adding shadcn-vue/reka-ui doesn't trigger
    // mid-session dep re-optimization and full page reloads.
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'clsx',
        'country-list-json',
        'reka-ui',
        'tailwind-merge',
      ],
    },
  },

  app: {
    head: {
      title: 'Kaorex — Peer-to-Peer FX Exchange for Nigeria',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Trade foreign currencies with verified users through escrow-backed transactions. Transparent rates, secure settlements, zero middlemen.',
        },
        { name: 'theme-color', content: '#111827' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo.png' },
      ],
    },
  },
})
