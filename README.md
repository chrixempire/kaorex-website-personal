# Kaorex Website

Marketing site for **Kaorex** — a peer-to-peer, escrow-backed FX marketplace for Nigeria.
Built from the Figma `City-sub` design.

## Stack

- [Nuxt 4](https://nuxt.com) (Vue 3, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com) via the `@tailwindcss/vite` plugin
- [`@vueuse/motion`](https://motion.vueuse.org) for scroll-reveal animations
- Mobile-first responsive layout

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build
npm run generate # static site generation
```

## Project structure

```
app/
  app.vue                 # root shell
  pages/index.vue         # landing page, assembles all sections
  assets/css/main.css     # Tailwind import + @theme design tokens
  composables/
    useMotionPresets.ts   # shared fade/scale animation variants
  components/
    TheNavbar.vue         # floating pill nav + mobile menu
    HeroSection.vue
    TradersSection.vue    # "Built for every trader"
    HowItWorks.vue        # animated 6-step flow + ticket graphic
    FeaturesSection.vue   # horizontal carousel of trading tools
    SecuritySection.vue
    ComparisonSection.vue
    FaqSection.vue        # accordion
    CtaSection.vue
    TheFooter.vue
    AppButton.vue         # pill button (primary / secondary / light)
public/
  images/                 # design assets pulled from Figma
  fonts/                  # drop Neue Montreal .woff2 here (see below)
```

## Fonts

The design uses **Neue Montreal** (a proprietary typeface). The site currently
falls back to **Inter** (loaded from Google Fonts). To enable the real font,
drop the licensed files into `public/fonts/`:

- `NeueMontreal-Regular.woff2`
- `NeueMontreal-Medium.woff2`
- `NeueMontreal-Bold.woff2`

They are already wired up via `@font-face` in `app/assets/css/main.css` and take
priority over Inter automatically.

## Design tokens

Colours, type scale and fonts live in the `@theme` block of
`app/assets/css/main.css` (e.g. `--color-primary: #007fff`). Use the generated
utilities like `bg-primary`, `text-heading`, `bg-ink`, `border-line-subtle`.

## Notes

- The **Security** and **Comparison** sections were empty frames in the Figma
  file but are linked from the nav; they've been authored on-brand and are easy
  to revise.
- CTA buttons are placeholders (anchor links) since there is no backend yet.
- Design assets in `public/images/` were exported from Figma. Re-export if the
  source design changes.
