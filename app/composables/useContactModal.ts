/**
 * Shared open/close state for the mobile contact modal.
 *
 * Backed by useState so the navbar (on any page) and the contact page can all
 * drive the single globally-rendered <ContactModal>.
 */
export function useContactModal() {
  const open = useState<boolean>('contact-modal-open', () => false)
  const router = useRouter()

  const openModal = () => {
    open.value = true
  }
  const closeModal = () => {
    open.value = false
  }

  /**
   * Contact CTAs: navigate to the /contact page on desktop, pop the modal on mobile.
   */
  const requestContact = () => {
    if (import.meta.client && window.matchMedia('(min-width: 1024px)').matches) {
      router.push('/contact')
    } else {
      openModal()
    }
  }

  return { open, openModal, closeModal, requestContact }
}
