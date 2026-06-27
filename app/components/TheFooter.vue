<template>
  <!-- 81px content band (Figma 3151:269), flush under the section above;
       the gap below comes from the page's bottom padding, not the footer. -->
  <footer class="w-full px-5">
    <div class="flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:justify-between">
      <a href="#top" class="flex shrink-0 items-center">
        <img
          src="/images/logo.svg"
          alt="Kaorex"
          class="h-[61px] w-[165px] object-contain object-left lg:h-[81px] lg:w-[220px]"
        />
      </a>

      <p class="text-center text-sm leading-5 tracking-[0.42px] text-sub lg:text-left">
        2026 Kaorex. Peer-to-peer foreign exchange for Nigeria.
      </p>
    </div>
  </footer>
</template>
