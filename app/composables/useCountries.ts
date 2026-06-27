import { countries as bundledCountries } from 'country-list-json'

export interface Country {
  name: string
  dial_code: string
  code: string
  /** Remote flag image (flagcdn). */
  flag: string
  /** Emoji fallback if the image fails to load. */
  emoji: string
}

/** Netherlands Antilles (AN) dissolved in 2010 and has no flag on CDNs. */
const FLAG_OVERRIDES: Record<string, string> = { AN: 'nl' }

function flagUrl(isoCode: string): string {
  if (!isoCode) return ''
  const code = (FLAG_OVERRIDES[isoCode.toUpperCase()] ?? isoCode).toLowerCase()
  return `https://flagcdn.com/w40/${code}.png`
}

function emojiFromCode(isoCode: string): string {
  const iso = (isoCode || '').toUpperCase().slice(0, 2)
  if (iso.length !== 2) return ''
  return String.fromCodePoint(...[...iso].map((c) => 127397 + c.charCodeAt(0)))
}

let cached: Country[] | null = null

function buildList(): Country[] {
  if (cached) return cached
  cached = bundledCountries
    .filter((c) => c.dial_code?.startsWith('+'))
    .map((c) => {
      const name = c.name.trim()
      return {
        name,
        dial_code: c.dial_code,
        code: c.code,
        flag: flagUrl(c.code),
        emoji: c.flag || emojiFromCode(c.code),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
  return cached
}

export function useCountries() {
  const countries = buildList()

  function findByDialCode(dialCode: string): Country | undefined {
    // Prefer the longest match so e.g. "+1" resolves predictably.
    return countries.find((c) => c.dial_code === dialCode)
  }

  /** Split a full phone string into dial code + remaining digits. */
  function splitPhoneNumber(phone: string) {
    if (!phone) return null
    const match = countries
      .filter((c) => phone.startsWith(c.dial_code))
      .sort((a, b) => b.dial_code.length - a.dial_code.length)[0]
    if (!match) return null
    return { dialCode: match.dial_code, number: phone.slice(match.dial_code.length) }
  }

  return { countries, findByDialCode, splitPhoneNumber, flagUrl, emojiFromCode }
}
