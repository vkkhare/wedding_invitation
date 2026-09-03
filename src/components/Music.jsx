import { useCallback, useEffect, useRef } from 'react'

/* Background music for the whole invitation.

   The reader's first scroll down the invitation is what starts the theme.
   On a phone that scroll begins with a finger on the glass, which is the
   gesture every browser wants before it will make a sound at a stranger;
   wheel, key and scroll events are watched alongside it so a trackpad or a
   keyboard counts too. Nothing is armed until the envelope is out of the
   way — the music belongs to the invitation, not to the opening. */

const VOLUME = 0.5
const DUCKED = 0.08
const FADE_IN = 1800
const FADE_DUCK = 700

const WAKE = ['touchstart', 'touchmove', 'pointerdown', 'click', 'keydown', 'wheel', 'scroll']

/* iPhones refuse to let a page set volume on a media element — the property
   is there, assignments to it just never take. Worth knowing once, because
   the fade and the duck below both need another way round on a phone. */
function volumeIsWritable(el) {
  const held = el.volume
  el.volume = held === 0.5 ? 0.25 : 0.5
  const writable = el.volume !== held
  el.volume = held
  return writable
}

export default function Music({ started, ducked = false }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const canFadeRef = useRef(true)
  /* read inside the wake handler, which must stay stable across ducking */
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

  useEffect(() => {
    const el = audioRef.current
    if (!started || !el) return
    canFadeRef.current = volumeIsWritable(el)

    /* play() has to be called straight out of the event, with nothing awaited
       in between, or the browser stops counting it as the reader's doing */
    const wake = () => {
      if (!el.paused) return
      if (canFadeRef.current) el.volume = 0
      const p = el.play()
      if (p && p.catch) p.catch(() => {})
    }

    /* The listeners come off only once sound is actually flowing. A play()
       the browser turned down leaves them armed for the next scroll instead
       of spending the single chance we had on it. */
    const flowing = () => {
      WAKE.forEach((e) => document.removeEventListener(e, wake))
      fade(duckedRef.current ? DUCKED : VOLUME, FADE_IN)
    }

    el.addEventListener('playing', flowing)
    WAKE.forEach((e) => document.addEventListener(e, wake, { passive: true }))
    return () => {
      el.removeEventListener('playing', flowing)
      WAKE.forEach((e) => document.removeEventListener(e, wake))
    }
  }, [started, fade])

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
