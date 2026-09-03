import { useCallback, useEffect, useRef } from 'react'

/* Background music for the whole invitation.

   No browser will make an unprompted noise at a stranger, and the envelope
   opens on a timer rather than a tap, so there may be no gesture to lean on.
   What every browser does allow is muted playback — so the theme starts the
   moment the page loads and simply runs silently, and the first sign of life
   from the reader lifts the mute. There is nothing to press: a touch, a key,
   even the first flick of a scroll wheel is enough, and the track is already
   rolling underneath, so the sound arrives with no gap. */

const VOLUME = 0.5
const DUCKED = 0.08
const FADE_IN = 2200
const FADE_DUCK = 700

/* iPhones refuse to let a page set volume on a media element — the property
   is there, assignments to it just never take. Worth knowing once, because
   the fades and the duck below both need another way round on a phone. */
function volumeIsWritable(el) {
  const held = el.volume
  el.volume = held === 0.5 ? 0.25 : 0.5
  const writable = el.volume !== held
  el.volume = held
  return writable
}

/* A touch or a key is consent a browser will honour. A scroll or a mouse move
   is not, but costs nothing to try once in case this reader is a regular the
   browser already trusts — and exactly once, or a browser that answers by
   pausing us would be fought over every frame of a scroll. */
const CONSENT = ['pointerdown', 'touchstart', 'touchend', 'keydown', 'click']
const LONG_SHOT = ['wheel', 'scroll', 'mousemove']

export default function Music({ ducked = false }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const canFadeRef = useRef(true)
  const audibleRef = useRef(false)
  /* read inside callbacks that have to stay stable across ducking */
  const duckedRef = useRef(ducked)
  duckedRef.current = ducked

  const fade = useCallback((to, ms) => {
    const el = audioRef.current
    if (!el || !canFadeRef.current) return
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

  const resume = useCallback(() => {
    const el = audioRef.current
    if (!el || !el.paused) return
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
  }, [])

  const raise = useCallback(() => {
    const el = audioRef.current
    if (!el || audibleRef.current) return
    audibleRef.current = true
    if (canFadeRef.current) el.volume = 0
    el.muted = false
    resume()
    fade(duckedRef.current ? DUCKED : VOLUME, FADE_IN)
  }, [fade, resume])

  /* Silent from the first frame, which no browser objects to. */
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    canFadeRef.current = volumeIsWritable(el)
    el.muted = true
    resume()
  }, [resume])

  useEffect(() => {
    let spent = false
    const onConsent = () => raise()
    const onLongShot = () => { if (spent) return; spent = true; raise() }
    CONSENT.forEach((e) => document.addEventListener(e, onConsent, { passive: true }))
    LONG_SHOT.forEach((e) => document.addEventListener(e, onLongShot, { passive: true }))
    /* left armed for the life of the page: coming back from another app, or
       from a browser that took the mute off us, should not cost the music */
    return () => {
      CONSENT.forEach((e) => document.removeEventListener(e, onConsent))
      LONG_SHOT.forEach((e) => document.removeEventListener(e, onLongShot))
    }
  }, [raise])

  /* A browser that disagrees with an unmute answers by pausing the element.
     Take the hint, go back to running silently, and wait to be asked again. */
  const onPause = useCallback(() => {
    const el = audioRef.current
    if (!el || !audibleRef.current || duckedRef.current) return
    audibleRef.current = false
    el.muted = true
    resume()
  }, [resume])

  /* While Inaya's message plays the theme drops to a murmur underneath it.
     Where the volume will not move — a phone — it steps out of the way
     entirely and comes back when she is done, which is the same courtesy. */
  useEffect(() => {
    const el = audioRef.current
    if (!el || !audibleRef.current) return
    if (canFadeRef.current) fade(ducked ? DUCKED : VOLUME, FADE_DUCK)
    else if (ducked) el.pause()
    else resume()
  }, [ducked, fade, resume])

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), [])

  return (
    <audio
      ref={audioRef}
      src="assets/wedding-theme.mp3"
      loop
      preload="auto"
      onPause={onPause}
    />
  )
}
