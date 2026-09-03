import { useEffect, useRef } from 'react'

/* Inaya's message, kept for the one moment it belongs to.

   It waits until the closing panel is properly on screen, plays once, and is
   never heard again in the same visit — a note read aloud, not a track on a
   loop. Renders nothing: there is no player to find, only her voice arriving
   at the right line. */

export default function VoiceNote({ src, targetRef, onPlaying }) {
  const audioRef = useRef(null)
  const spentRef = useRef(false)

  useEffect(() => {
    const el = audioRef.current
    const target = targetRef.current
    if (!el || !target || typeof IntersectionObserver === 'undefined') return

    /* Scrolling is not a gesture a browser will accept as consent to make
       noise, so a blocked play is put back in the queue for the next touch
       rather than thrown away. */
    let pending = null
    const cancelPending = () => {
      if (!pending) return
      document.removeEventListener('pointerdown', pending)
      document.removeEventListener('keydown', pending)
      pending = null
    }

    const play = () => {
      if (spentRef.current) return
      spentRef.current = true
      const p = el.play()
      if (p && p.catch) {
        p.catch(() => {
          spentRef.current = false
          cancelPending()
          pending = () => { cancelPending(); play() }
          document.addEventListener('pointerdown', pending, { once: true, passive: true })
          document.addEventListener('keydown', pending, { once: true, passive: true })
        })
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        play()
      },
      { threshold: 0.45 },
    )
    observer.observe(target)

    return () => { observer.disconnect(); cancelPending() }
  }, [targetRef])

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      onPlay={() => onPlaying(true)}
      onPause={() => onPlaying(false)}
      onEnded={() => onPlaying(false)}
    />
  )
}
