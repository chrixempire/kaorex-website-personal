<template>
  <div>
    <CursorLevelTrail />
    <TheNavbar />

    <main class="flex w-full min-w-0 flex-col gap-[30px] overflow-x-hidden lg:gap-[50px]">
      <div class="section-panel pt-3">
        <div class="relative isolate w-full">
          <HeroSection />
          <TradersSection />
        </div>
      </div>

      <ComparisonSection />
      <HowItWorks />
      <SecuritySection />

      <div class="bg-canvas">
        <FeaturesSection />
        <FaqSection />
        <CtaSection />
        <TheFooter />
      </div>
    </main>
  </div>
</template>

<style>
:target {
  scroll-margin-top: 5.5rem;
}
section[id] {
  scroll-margin-top: 5.5rem;
}
@media (min-width: 1024px) {
  :target,
  section[id] {
    scroll-margin-top: 6rem;
  }
}
</style>
