import { useCallback, useEffect, useRef } from 'react'

/* Background music for the whole invitation.

   The track tries to start on its own the moment the page is ready. Browsers
   that refuse unprompted sound get a second chance at the reader's first
   touch — which, for almost everyone, is the tap that opens the envelope.
   There is no control in the corner: the music simply plays, and steps aside
   whenever Inaya's message asks for the room. */

const VOLUME = 0.5
const DUCKED = 0.08
const FADE_IN = 2200
const FADE_DUCK = 700

export default function Music({ ducked = false }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  /* read inside start(), which has to stay stable across ducking or the
     first-touch listener below would be torn down and re-armed mid-fade */
  const duckedRef = useRef(ducked)
  duckedRef.current = ducked

  const fade = useCallback((to, ms) => {
    const el = audioRef.current
    if (!el) return
    cancelAnimationFrame(fadeRef.current)
    const from = el.volume
    const t0 = performance.now()
    const step = (t) => {
      /* rAF hands back the frame's own start time, which can predate the clock
         read above — so the ramp is clamped at both ends, or the first frame
         asks for a negative volume and the browser throws */
      const k = Math.min(1, Math.max(0, (t - t0) / ms))
      el.volume = Math.min(1, Math.max(0, from + (to - from) * k))
      if (k < 1) fadeRef.current = requestAnimationFrame(step)
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(() => {
    const el = audioRef.current
    if (!el || !el.paused) return
    el.volume = 0
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
    fade(duckedRef.current ? DUCKED : VOLUME, FADE_IN)
  }, [fade])

  /* Try unprompted first; the opening tap is the fallback for the browsers
     that say no. Either way the listener is torn down after one shot. */
  useEffect(() => {
    start()
    const events = ['pointerdown', 'touchstart', 'keydown']
    const once = () => { events.forEach((e) => document.removeEventListener(e, once)); start() }
    events.forEach((e) => document.addEventListener(e, once, { passive: true }))
    return () => events.forEach((e) => document.removeEventListener(e, once))
  }, [start])

  /* While her message plays the theme drops back rather than stopping, so the
     room never goes silent and the words stay on top of it. */
  useEffect(() => {
    const el = audioRef.current
    if (!el || el.paused) return
    fade(ducked ? DUCKED : VOLUME, FADE_DUCK)
  }, [ducked, fade])

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), [])

  return <audio ref={audioRef} src="assets/wedding-theme.mp3" loop preload="auto" />
}
