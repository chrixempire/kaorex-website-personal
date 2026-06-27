<script setup lang="ts">
/* Figma: IPC Product MVP — Contact Us (desktop node 11402:3338, mobile modal 11405:3499) */
import { Checkbox } from '~/components/ui/checkbox'

const benefits = [
  'Exchange currency directly with verified traders',
  'Protect every transaction with secure escrow',
  'Get transparent rates driven by market demand',
]

const {
  describesOptions,
  hearAboutOptions,
  form,
  errors,
  submitting,
  submitted,
  submitError,
  onSubmit,
  borderClass,
} = useContactForm()

/** Full searchable country list for the Country field. */
const countryNames = useCountries().countries.map((c) => c.name)

/* Desktop inline-card field styling (16px). The mobile modal styles its own. */
const fieldBase =
  'w-full rounded-[10px] border bg-white px-[14px] py-[12px] text-base leading-6 tracking-[0.32px] text-ink outline-none transition-colors placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/15'

function fieldClass(name: string) {
  return [fieldBase, borderClass(name)]
}

// On mobile the form is presented as a modal (rendered globally in app.vue).
const { openModal } = useContactModal()
</script>

<template>
  <section id="contact" class="w-full bg-subtle">
    <div class="container-page pb-16 pt-[120px] lg:pb-[66px] lg:pt-[154px]">
      <div
        class="mx-auto flex max-w-[1164px] flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-[84px]"
      >
        <!-- Left column ───────────────────────────────────────── -->
        <div class="flex w-full flex-col lg:h-[815px] lg:w-[478px]">
          <div class="flex flex-col gap-[22px]">
            <div class="flex flex-col">
              <p class="text-sm font-medium leading-5 text-primary">CONTACT US</p>
              <h1
                class="mt-1 text-[36px] font-medium leading-[44px] text-heading lg:mt-0 lg:text-display lg:leading-[var(--text-display--line-height)]"
              >
                Speak to our team
              </h1>
              <p class="mt-2 text-lg leading-7 text-body lg:mt-0 lg:text-xl lg:leading-[28px]">
                Submit your details and our team will review your request
              </p>
            </div>

            <a
              href="mailto:info@kaorex.com"
              class="flex items-center gap-[14px] text-body transition-colors hover:text-primary"
            >
              <svg
                class="h-6 w-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
                <path d="m3.5 7 7.3 5.2a2 2 0 0 0 2.4 0L20.5 7" />
              </svg>
              <span class="text-xl leading-7">info@kaorex.com</span>
            </a>
          </div>

          <!-- "With kaorex you can" — bottom-aligned to match the device height -->
          <div class="mt-12 flex flex-col gap-4 lg:mt-auto">
            <p class="text-xl font-medium leading-7 text-heading">With kaorex you can</p>
            <ul class="flex flex-col gap-[10px]">
              <li v-for="item in benefits" :key="item" class="flex items-center gap-3">
                <svg
                  class="h-5 w-5 shrink-0 text-primary"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" />
                  <path
                    d="m6.2 10.2 2.4 2.4 5-5.2"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-base leading-6 tracking-[0.32px] text-body">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Mobile-only trigger: opens the contact form in a modal -->
          <button
            type="button"
            class="mt-8 flex w-full items-center justify-center rounded-[44px] bg-primary px-6 py-4 text-base font-medium leading-6 tracking-[0.16px] text-white transition-colors hover:bg-primary-hover lg:hidden"
            @click="openModal"
          >
            Send us a message
          </button>
        </div>

        <!-- Right column — device frame + form (desktop only) ──────── -->
        <div
          class="relative hidden w-full max-w-[602px] lg:block lg:h-[838px] lg:w-[602px] lg:overflow-hidden lg:rounded-[40px]"
        >
          <!-- Metallic device bezel (decorative) -->
          <img
            src="/images/contact/device-frame.jpg"
            alt="" loading="lazy"
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 hidden size-full rounded-[40px] object-cover mix-blend-luminosity lg:block"
          />

          <!-- Inner card: a clean white card on mobile, the device screen on desktop -->
          <div
            class="relative flex flex-col rounded-2xl border border-line-subtle bg-white shadow-sm lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[790px] lg:w-[570px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:overflow-hidden lg:rounded-[24px] lg:border-8 lg:border-subtle lg:bg-canvas lg:shadow-none"
          >
            <!-- Success state -->
            <div
              v-if="submitted"
              class="flex min-h-[420px] flex-col items-center justify-center gap-4 px-8 py-12 text-center lg:min-h-0 lg:flex-1 lg:py-0"
            >
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  class="h-8 w-8 text-primary"
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
              <h2 class="text-xl font-medium leading-7 text-heading">Request received</h2>
              <p class="max-w-[380px] text-sm leading-5 tracking-[0.42px] text-sub">
                Thanks{{ form.firstName ? `, ${form.firstName}` : '' }}! Our team will review your
                request and get back to you within 1-2 business days.
              </p>
            </div>

            <!-- Form -->
            <template v-else>
              <form
                class="form-scroll flex flex-col gap-[10px] p-4 lg:flex-1 lg:overflow-y-auto"
                novalidate
                @submit.prevent="onSubmit"
              >
                <p class="text-lg font-medium leading-7 text-body">
                  Submit your details and our team will review your request
                </p>

                <!-- First / Last name -->
                <div class="flex flex-col gap-[10px] sm:flex-row sm:gap-5">
                  <div class="flex flex-1 flex-col gap-[10px]">
                    <label for="firstName" class="text-base leading-6 tracking-[0.32px] text-ink">
                      First name
                    </label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      placeholder="John"
                      :class="fieldClass('firstName')"
                    />
                  </div>
                  <div class="flex flex-1 flex-col gap-[10px]">
                    <label for="lastName" class="text-base leading-6 tracking-[0.32px] text-ink">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      placeholder="Doe"
                      :class="fieldClass('lastName')"
                    />
                  </div>
                </div>

                <!-- Email -->
                <div class="flex flex-col gap-[10px]">
                  <label for="email" class="text-base leading-6 tracking-[0.32px] text-ink">
                    Email <span class="text-xl leading-6 text-required">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="you@company.com"
                    :class="fieldClass('email')"
                  />
                  <p v-if="errors.email" class="text-sm leading-5 text-required">{{ errors.email }}</p>
                </div>

                <!-- Phone number -->
                <div class="flex flex-col gap-[10px]">
                  <label for="phone" class="text-base leading-6 tracking-[0.32px] text-ink">
                    Phone number
                  </label>
                  <CountryPhoneInput
                    v-model:dial-code="form.dialCode"
                    v-model:phone="form.phone"
                    input-id="phone"
                  />
                </div>

                <!-- Company Name -->
                <div class="flex flex-col gap-[10px]">
                  <label for="company" class="text-base leading-6 tracking-[0.32px] text-ink">
                    Company Name <span class="text-xl leading-6 text-required">*</span>
                  </label>
                  <input
                    id="company"
                    v-model="form.company"
                    type="text"
                    placeholder="Enter your company name"
                    :class="fieldClass('company')"
                  />
                  <p v-if="errors.company" class="text-sm leading-5 text-required">
                    {{ errors.company }}
                  </p>
                </div>

                <!-- Country -->
                <div class="flex flex-col gap-[10px]">
                  <label for="country" class="text-base leading-6 tracking-[0.32px] text-ink">
                    Country <span class="text-xl leading-6 text-required">*</span>
                  </label>
                  <FormSelect
                    id="country"
                    v-model="form.country"
                    :options="countryNames"
                    searchable
                    placeholder="Select country"
                    search-placeholder="Search countries..."
                    :error="!!errors.country"
                  />
                  <p v-if="errors.country" class="text-sm leading-5 text-required">
                    {{ errors.country }}
                  </p>
                </div>

                <!-- What best describes you? -->
                <div class="flex flex-col gap-[10px]">
                  <label for="describes" class="text-base leading-6 tracking-[0.32px] text-ink">
                    What best describes you? <span class="text-xl leading-6 text-required">*</span>
                  </label>
                  <FormSelect
                    id="describes"
                    v-model="form.describes"
                    :options="describesOptions"
                    placeholder="Select an option"
                    :error="!!errors.describes"
                  />
                  <p v-if="errors.describes" class="text-sm leading-5 text-required">
                    {{ errors.describes }}
                  </p>
                </div>

                <!-- Message -->
                <div class="flex flex-col gap-[10px]">
                  <label for="message" class="text-base leading-6 tracking-[0.32px] text-ink">
                    Message <span class="text-xl leading-6 text-required">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="3"
                    placeholder="Tell me more about your request"
                    :class="[fieldClass('message'), 'min-h-[90px] resize-y']"
                  />
                  <p v-if="errors.message" class="text-sm leading-5 text-required">
                    {{ errors.message }}
                  </p>
                </div>

                <!-- How did you hear about us? -->
                <div class="flex flex-col gap-[10px]">
                  <label for="hearAbout" class="text-base leading-6 tracking-[0.32px] text-ink">
                    How did you hear about us? <span class="text-xl leading-6 text-required">*</span>
                  </label>
                  <FormSelect
                    id="hearAbout"
                    v-model="form.hearAbout"
                    :options="hearAboutOptions"
                    placeholder="Select an option"
                    :error="!!errors.hearAbout"
                  />
                  <p v-if="errors.hearAbout" class="text-sm leading-5 text-required">
                    {{ errors.hearAbout }}
                  </p>
                </div>

                <!-- Consent -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-start gap-[10px]">
                    <Checkbox id="consent" v-model="form.consent" class="mt-[1px]" />
                    <label
                      for="consent"
                      class="cursor-pointer text-sm leading-5 tracking-[0.42px] text-body"
                      @click="form.consent = !form.consent"
                    >
                      I agree to the
                      <a href="#" class="text-[#0066cc] hover:underline" @click.stop>Privacy Policy</a>
                      and consent to be contacted by the Kaorex team regarding my request
                    </label>
                  </div>
                  <p v-if="errors.consent" class="text-sm leading-5 text-required">
                    {{ errors.consent }}
                  </p>
                </div>
              </form>

              <!-- Submit area: flows with the form on mobile, pinned footer bar on desktop -->
              <div class="flex flex-col items-center gap-[10px] px-4 pb-4 lg:border-t lg:border-subtle lg:bg-white lg:px-4 lg:py-5">
                <p v-if="submitError" class="text-sm leading-5 text-required">{{ submitError }}</p>
                <button
                  type="button"
                  :disabled="submitting"
                  class="flex w-full items-center justify-center rounded-[44px] bg-primary px-6 py-4 text-base font-medium leading-6 tracking-[0.16px] text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                  @click="onSubmit"
                >
                  {{ submitting ? 'Sending…' : 'Submit request' }}
                </button>
                <p class="max-w-[380px] text-center text-sm leading-5 tracking-[0.42px] text-sub">
                  Our team will review your request and get back to you within 1-2 business days.
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Thin custom scrollbar inside the device card (matches Figma 11402:3461). */
.form-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--color-ink) var(--color-canvas);
}
.form-scroll::-webkit-scrollbar {
  width: 4px;
}
.form-scroll::-webkit-scrollbar-track {
  background: var(--color-canvas);
  border-radius: 20px;
}
.form-scroll::-webkit-scrollbar-thumb {
  background: var(--color-ink);
  border-radius: 20px;
}
</style>
