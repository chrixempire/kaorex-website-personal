<script setup lang="ts">
/* Figma: IPC Product MVP — Contact modal (node 11405:3499). Mobile presentation
   of the contact form: a centred, 80vh, animated modal. */

const { open, closeModal } = useContactModal()

const {
  dialCodes,
  countries,
  describesOptions,
  hearAboutOptions,
  form,
  errors,
  submitting,
  submitted,
  submitError,
  onSubmit,
  reset,
  borderClass,
} = useContactForm()

const fieldBase =
  'w-full rounded-[10px] border bg-white px-[14px] py-[10px] text-sm leading-5 tracking-[0.42px] text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/15'

function fieldClass(name: string) {
  return [fieldBase, borderClass(name)]
}

function close() {
  closeModal()
}

// Reset a previously-submitted form when re-opening; lock body scroll while open.
watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen && submitted.value) reset()
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="modal" :duration="{ enter: 620, leave: 340 }">
        <div v-if="open" class="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true">
          <div class="modal-backdrop absolute inset-0 bg-black/50" @click="close" />

          <div class="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
            <div
              class="modal-panel pointer-events-auto relative flex max-h-[90vh] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] bg-white p-3.5 shadow-2xl"
            >
              <!-- Close -->
              <button
                type="button"
                class="absolute right-3 top-3 flex h-5 w-5 items-center justify-center text-sub transition-colors hover:text-heading"
                aria-label="Close"
                @click="close"
              >
                <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5" aria-hidden="true">
                  <circle cx="12" cy="12" r="9.25" stroke="currentColor" stroke-width="1.5" />
                  <path
                    d="m9 9 6 6m0-6-6 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>

              <!-- Header -->
              <div class="shrink-0 pr-8">
                <p class="text-sm font-medium leading-5 text-primary">CONTACT US</p>
                <h2 class="text-2xl font-medium leading-8 text-heading">Speak to our team</h2>
                <p class="mt-1 max-w-[269px] text-base leading-6 tracking-[0.32px] text-body">
                  Submit your details and our team will review your request
                </p>
              </div>

              <!-- Scrollable card -->
              <div
                class="modal-scroll mt-5 min-h-0 flex-1 overflow-y-auto rounded-[20px] border-8 border-subtle bg-canvas"
              >
                <!-- Success -->
                <div
                  v-if="submitted"
                  class="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
                >
                  <div class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <svg
                      class="h-7 w-7 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium leading-7 text-heading">Request received</h3>
                  <p class="text-sm leading-5 tracking-[0.42px] text-sub">
                    Thanks{{ form.firstName ? `, ${form.firstName}` : '' }}! Our team will get back
                    to you within 1-2 business days.
                  </p>
                  <button
                    type="button"
                    class="mt-2 rounded-[44px] bg-primary px-6 py-3 text-sm font-medium leading-5 text-white transition-colors hover:bg-primary-hover"
                    @click="close"
                  >
                    Done
                  </button>
                </div>

                <!-- Form -->
                <form
                  v-else
                  class="flex flex-col gap-[10px] p-4"
                  novalidate
                  @submit.prevent="onSubmit"
                >
                  <!-- First name -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-firstName" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      First name <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <input
                      id="m-firstName"
                      v-model="form.firstName"
                      type="text"
                      placeholder="John"
                      :class="fieldClass('firstName')"
                    />
                  </div>

                  <!-- Last name -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-lastName" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      Last name <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <input
                      id="m-lastName"
                      v-model="form.lastName"
                      type="text"
                      placeholder="Doe"
                      :class="fieldClass('lastName')"
                    />
                  </div>

                  <!-- Work email -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-email" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      Work email <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <input
                      id="m-email"
                      v-model="form.email"
                      type="email"
                      placeholder="you@company.com"
                      :class="fieldClass('email')"
                    />
                    <p v-if="errors.email" class="text-xs leading-4 text-required">{{ errors.email }}</p>
                  </div>

                  <!-- Phone number -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-phone" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      Phone number <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <div class="flex gap-[10px]">
                      <div
                        class="relative flex h-[40px] shrink-0 items-center gap-[5px] rounded-[10px] border border-line bg-white px-3"
                      >
                        <span class="h-[22px] w-[22px] shrink-0 overflow-hidden rounded-full">
                          <svg viewBox="0 0 30 30" class="h-full w-full" aria-hidden="true">
                            <rect width="10" height="30" fill="#008751" />
                            <rect x="10" width="10" height="30" fill="#fff" />
                            <rect x="20" width="10" height="30" fill="#008751" />
                          </svg>
                        </span>
                        <svg
                          class="pointer-events-none h-5 w-5 text-ink"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m7 10 5 5 5-5" />
                        </svg>
                        <select
                          v-model="form.dialCode"
                          aria-label="Country dialing code"
                          class="absolute inset-0 cursor-pointer opacity-0"
                        >
                          <option v-for="d in dialCodes" :key="d.code" :value="d.code">{{ d.label }}</option>
                        </select>
                      </div>
                      <input
                        id="m-phone"
                        v-model="form.phone"
                        type="tel"
                        :placeholder="`${form.dialCode} XXX XXX XXXX`"
                        :class="[fieldClass('phone'), 'flex-1']"
                      />
                    </div>
                  </div>

                  <!-- Company name -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-company" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      Company name <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <input
                      id="m-company"
                      v-model="form.company"
                      type="text"
                      placeholder="Enter your company name"
                      :class="fieldClass('company')"
                    />
                    <p v-if="errors.company" class="text-xs leading-4 text-required">{{ errors.company }}</p>
                  </div>

                  <!-- Country -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-country" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      Country <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <div class="relative">
                      <select
                        id="m-country"
                        v-model="form.country"
                        :class="[fieldClass('country'), 'cursor-pointer appearance-none pr-10', form.country ? 'text-ink' : 'text-placeholder']"
                      >
                        <option value="" disabled>Select country</option>
                        <option v-for="cName in countries" :key="cName" :value="cName" class="text-ink">{{ cName }}</option>
                      </select>
                      <svg
                        class="pointer-events-none absolute right-[14px] top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-ink"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m7 10 5 5 5-5" />
                      </svg>
                    </div>
                    <p v-if="errors.country" class="text-xs leading-4 text-required">{{ errors.country }}</p>
                  </div>

                  <!-- Message -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-message" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      Message <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <textarea
                      id="m-message"
                      v-model="form.message"
                      rows="3"
                      placeholder="Tell me more about your request"
                      :class="[fieldClass('message'), 'min-h-[77px] resize-y']"
                    />
                    <p v-if="errors.message" class="text-xs leading-4 text-required">{{ errors.message }}</p>
                  </div>

                  <!-- How did you hear about us? -->
                  <div class="flex flex-col gap-[10px]">
                    <label for="m-hear" class="text-sm leading-5 tracking-[0.42px] text-ink">
                      How did you hear about us? <span class="text-base leading-5 text-required">*</span>
                    </label>
                    <div class="relative">
                      <select
                        id="m-hear"
                        v-model="form.hearAbout"
                        :class="[fieldClass('hearAbout'), 'cursor-pointer appearance-none pr-10', form.hearAbout ? 'text-ink' : 'text-placeholder']"
                      >
                        <option value="" disabled>Select an option</option>
                        <option v-for="o in hearAboutOptions" :key="o" :value="o" class="text-ink">{{ o }}</option>
                      </select>
                      <svg
                        class="pointer-events-none absolute right-[14px] top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-ink"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m7 10 5 5 5-5" />
                      </svg>
                    </div>
                    <p v-if="errors.hearAbout" class="text-xs leading-4 text-required">{{ errors.hearAbout }}</p>
                  </div>

                  <!-- Consent -->
                  <label class="mt-0.5 flex items-start gap-[10px]">
                    <input
                      v-model="form.consent"
                      type="checkbox"
                      class="mt-px h-[23px] w-[23px] shrink-0 cursor-pointer rounded-[5px] border border-[#d4d5d6] accent-primary"
                    />
                    <span class="text-xs leading-4 tracking-[0.24px] text-body">
                      I agree to the
                      <a href="#" class="text-[#0066cc] hover:underline">Privacy Policy</a>
                      and consent to be contacted by the Kaorex team regarding my request
                    </span>
                  </label>
                  <p v-if="errors.consent" class="text-xs leading-4 text-required">{{ errors.consent }}</p>

                  <!-- Submit -->
                  <p v-if="submitError" class="text-xs leading-4 text-required">{{ submitError }}</p>
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="mt-2 flex w-full items-center justify-center rounded-[44px] bg-primary px-4 py-[13px] text-sm font-medium leading-5 text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {{ submitting ? 'Sending…' : 'Submit request' }}
                  </button>
                  <p class="text-center text-xs leading-4 tracking-[0.24px] text-sub">
                    Our team will review your request and get back to you within 1-2 business days.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
/* Thin custom scrollbar inside the card (matches Figma 11405:3573). */
.modal-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--color-ink) var(--color-canvas);
}
.modal-scroll::-webkit-scrollbar {
  width: 4px;
}
.modal-scroll::-webkit-scrollbar-track {
  background: var(--color-canvas);
  border-radius: 20px;
}
.modal-scroll::-webkit-scrollbar-thumb {
  background: var(--color-ink);
  border-radius: 20px;
}

/* Open / close animation (modelled on moneda.com): backdrop fades while the
   panel zooms in from scale(0.83) with an ease-out curve; close mirrors it, faster. */
.modal-backdrop {
  transition: opacity 0.55s cubic-bezier(0.33, 1, 0.68, 1);
}
.modal-panel {
  transform-origin: center;
  transition:
    opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1),
    transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}
.modal-enter-from .modal-backdrop,
.modal-leave-to .modal-backdrop {
  opacity: 0;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  opacity: 0;
  transform: scale(0.83);
}
/* Close: quicker than open. */
.modal-leave-active .modal-backdrop,
.modal-leave-active .modal-panel {
  transition-duration: 0.32s;
}

@media (prefers-reduced-motion: reduce) {
  .modal-backdrop,
  .modal-panel {
    transition: none;
  }
}
</style>
