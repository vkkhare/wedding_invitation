import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/* Opening sequence: a sealed red envelope that waits to be opened.

   The invitation no longer lets itself in. The reader taps the seal, the flap
   lifts, the card rises out and carries the couple's names forward, and the
   hero takes over. That tap is also what earns the page the right to make a
   sound, so the music is started from inside the same handler — a browser
   counts the gesture only while its own event is still running, and a moment
   later is already too late. */
const PHASES = [
  ['p1', 0],     // flap lifts
  ['p2', 900],   // card rises out
  ['p3', 1850],  // card comes forward
  ['p4', 3100],  // fade away
]
const DONE_AT = 3850

export default function Intro({ onOpen, onDone }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('p0')
  const opened = useRef(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const open = useCallback(() => {
    if (opened.current) {
      /* a second tap means get on with it */
      timers.current.forEach(clearTimeout)
      setPhase('p4')
      timers.current.push(setTimeout(onDone, 500))
      return
    }
    opened.current = true
    onOpen()

    if (reduce) {
      setPhase('p4')
      timers.current.push(setTimeout(onDone, 700))
      return
    }
    PHASES.forEach(([p, t]) => timers.current.push(setTimeout(() => setPhase(p), t)))
    timers.current.push(setTimeout(onDone, DONE_AT))
  }, [onOpen, onDone, reduce])

  const onKeyDown = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    open()
  }

  return (
    <div
      className={`intro ${phase}${reduce ? ' intro--still' : ''}`}
      onClick={open}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the invitation"
    >
      <div className="intro__stage">
        <div className="intro__env" aria-hidden="true">
          <div className="intro__env-back" />
          <div className="intro__slot">
            <div className="intro__card">
              <img src="assets/monogram.png" alt="" className="intro__card-mark" />
              <p className="intro__card-names">
                <span className="script">Varun</span>
                <span className="intro__card-weds">weds</span>
                <span className="script">Prarita</span>
              </p>
              <span className="intro__card-rule" />
              <p className="intro__card-date">26 · 11 · 2026</p>
            </div>
          </div>
          <div className="intro__env-sides" />
          <div className="intro__env-pocket" />
          <div className="intro__env-flap">
            <span className="intro__seal">
              <img src="assets/monogram.png" alt="" />
            </span>
          </div>
        </div>
        <p className="intro__hint">Tap to open</p>
      </div>
    </div>
  )
}
