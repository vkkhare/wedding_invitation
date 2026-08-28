import { useCallback, useEffect, useRef, useState } from 'react'

/* Background music for the whole invitation.

   Browsers refuse to start sound on their own, so the track waits for the
   reader's first touch — which, for almost everyone, is the tap that opens the
   envelope. Anyone who lets the envelope open by itself gets the control in the
   corner instead, and anyone who turns it off is not asked twice. */

const VOLUME = 0.5
const FADE_IN = 2200
const FADE_OUT = 500

export default function Music() {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const declined = useRef(false)
  const [playing, setPlaying] = useState(false)

  const fade = useCallback((to, ms, then) => {
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
      else if (then) then()
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(() => {
    const el = audioRef.current
    if (!el || declined.current || !el.paused) return
    el.volume = 0
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
    fade(VOLUME, FADE_IN)
  }, [fade])

  /* The opening tap is the gesture that earns us the right to make a sound. */
  useEffect(() => {
    const events = ['pointerdown', 'touchstart', 'keydown']
    const once = () => { events.forEach((e) => document.removeEventListener(e, once)); start() }
    events.forEach((e) => document.addEventListener(e, once, { passive: true }))
    return () => events.forEach((e) => document.removeEventListener(e, once))
  }, [start])

  useEffect(() => () => cancelAnimationFrame(fadeRef.current), [])

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      declined.current = false
      start()
    } else {
      declined.current = true
      fade(0, FADE_OUT, () => el.pause())
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="assets/wedding-theme.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`music${playing ? ' is-on' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Turn the music off' : 'Turn the music on'}
      >
        <span className="music__bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </button>
    </>
  )
}
