/**
 * Single source of truth for the FAQ — rendered by FaqSection and emitted as
 * FAQPage JSON-LD on the home page so the two never drift apart.
 */
export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'How does the escrow system work?',
    a: 'When you initiate a trade, funds are immediately locked in our secure escrow. Neither party can access the funds until both confirm successful payment transfer. This eliminates counterparty risk and ensures safe transactions.',
  },
  {
    q: 'How long does verification take?',
    a: "KYC verification typically takes 24–48 hours. We manually review all documents to ensure platform security. You'll receive an email once your account is approved.",
  },
  {
    q: 'Is the platform invite only?',
    a: "Yes, FX P2P is currently invite-only to ensure quality and security. Request access through our waitlist, and we'll review your application within 3–5 business days.",
  },
  {
    q: "What happens if there's a trade dispute?",
    a: 'Our dispute resolution team reviews all evidence from both parties, including transaction receipts and communication logs. We typically resolve disputes within 2–3 business days with fair outcomes.',
  },
  {
    q: 'How are exchange rates determined?',
    a: 'Users set their own rates based on market conditions. You can browse multiple offers and choose the best rate for your volume. Our platform displays real-time market averages for reference.',
  },
  {
    q: 'What are the transaction limits?',
    a: 'Minimum trade is $100 USD equivalent. Maximum limits depend on your verification tier. Verified business accounts can trade up to $50,000 per transaction.',
  },
]
