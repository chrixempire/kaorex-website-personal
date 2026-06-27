/**
 * Central SEO configuration — single source of truth for site-wide metadata.
 * Update SITE.url to the production domain before launch.
 */
export const SITE = {
  url: 'https://kaorex.com',
  name: 'Kaorex',
  defaultTitle: 'Kaorex — Peer-to-Peer FX Exchange for Nigeria',
  description:
    'Trade foreign currencies with verified users through escrow-backed transactions. Transparent rates, secure settlements, zero middlemen.',
  /** 1200×630 social-share image (served from /public). */
  ogImage: '/og-image.jpg',
  locale: 'en_NG',
  /** Twitter/X handle (with @). Leave as-is or update when the account exists. */
  twitter: '@kaorex',
  email: 'info@kaorex.com',
} as const

/** Resolve a path to an absolute URL against the site origin. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString()
}
