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
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-canvas antialiased">
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <!-- Globally available so the navbar can open it from any page (mobile) -->
    <ContactModal />
  </div>
</template>
