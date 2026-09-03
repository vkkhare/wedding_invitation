import { useCallback, useEffect, useRef } from 'react'

/* Background music for the whole invitation.

   The tap that opens the envelope is what starts it. That is the one gesture
   a browser accepts without argument, and play() is called from inside the
   tap's own handler, while the browser is still counting it — anything
   deferred to an animation, a promise or a later event has already lost it.

   The listeners below are only insurance: if that first play is refused,
   the next lift of a finger tries again, and they take themselves off once
   the audio clock has actually moved. */

const VOLUME = 0.5
const DUCKED = 0.08
const FADE_DUCK = 700

/* touchend and pointerup carry the weight here. A browser will not take a
   finger landing on the glass as permission to make a sound — at touchstart
   it cannot yet tell a tap from a scroll, so it withholds consent until the
   finger lifts. The rest are for the mouse, wheel and keyboard, and cost
   nothing when they turn out not to count. */
const WAKE = [
  'touchend', 'pointerup', 'click', 'keydown', 'mouseup',
  'touchstart', 'touchmove', 'pointerdown', 'wheel', 'scroll',
]

/* iPhones refuse to let a page set volume on a media element — the property
   is there, assignments to it just never take. Worth knowing once, because
   the duck below needs another way round on a phone. */
function volumeIsWritable(el) {
  const held = el.volume
  el.volume = held === 0.5 ? 0.25 : 0.5
  const writable = el.volume !== held
  el.volume = held
  return writable
}

export default function Music({ playRef, ducked = false }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const canFadeRef = useRef(true)
  /* read inside start(), which must stay stable across ducking */
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

  /* The volume is set before play(), never after: a ramp that waits on a
     later event is a track playing at nothing wherever that event does not
     arrive, and silence has no way out of itself. */
  const start = useCallback(() => {
    const el = audioRef.current
    if (!el || !el.paused) return
    if (canFadeRef.current) el.volume = duckedRef.current ? DUCKED : VOLUME
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
  }, [])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    canFadeRef.current = volumeIsWritable(el)
    if (playRef) playRef.current = start

    const progressed = () => {
      if (el.currentTime <= 0) return
      el.removeEventListener('timeupdate', progressed)
      WAKE.forEach((e) => document.removeEventListener(e, start))
    }
    el.addEventListener('timeupdate', progressed)
    WAKE.forEach((e) => document.addEventListener(e, start, { passive: true }))
    return () => {
      if (playRef) playRef.current = null
      el.removeEventListener('timeupdate', progressed)
      WAKE.forEach((e) => document.removeEventListener(e, start))
    }
  }, [playRef, start])

  /* While Inaya's message plays the theme drops to a murmur underneath it.
     Where the volume will not move — a phone — it steps out of the way
     entirely and comes back when she is done, which is the same courtesy. */
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (canFadeRef.current) {
      if (!el.paused) fade(ducked ? DUCKED : VOLUME, FADE_DUCK)
    } else if (ducked) {
      el.pause()
    } else if (el.currentTime > 0) {
      const p = el.play()
      if (p && p.catch) p.catch(() => {})
    }
  }, [ducked, fade])

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), [])

  return <audio ref={audioRef} src="assets/wedding-theme.mp3" loop preload="auto" />
}
