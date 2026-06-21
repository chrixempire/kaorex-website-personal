/**
 * Shared open/close state for the mobile contact modal.
 *
 * Backed by useState so the navbar (on any page) and the contact page can all
 * drive the single globally-rendered <ContactModal>.
 */
export function useContactModal() {
  const open = useState<boolean>('contact-modal-open', () => false)
  return {
    open,
    openModal: () => {
      open.value = true
    },
    closeModal: () => {
      open.value = false
    },
  }
}
