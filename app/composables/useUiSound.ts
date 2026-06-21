/**
 * Tiny synthesized UI sound effects via the Web Audio API.
 *
 * No audio assets are shipped — short sine "ticks" are generated on the fly.
 * The AudioContext is created lazily on first use, which keeps it gated behind
 * a real user gesture (a tap/click) as browsers require.
 */
let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tick(frequency: number, peak = 0.12, durationMs = 40) {
  const c = getCtx()
  if (!c) return

  const now = c.currentTime
  const dur = durationMs / 1000

  const osc = c.createOscillator()
  const gain = c.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(frequency, now)

  // Fast attack, quick exponential decay → a soft, tactile "tick".
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur)

  osc.connect(gain).connect(c.destination)
  osc.start(now)
  osc.stop(now + dur + 0.02)
}

export function useUiSound() {
  return {
    /** High tick — use when something opens. */
    playOpen: () => tick(880),
    /** Low tick — use when something closes. */
    playClose: () => tick(440),
  }
}
