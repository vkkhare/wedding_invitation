import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/* Opening sequence: a sealed red envelope opens and the invitation card
   rises out, revealing the couple's names, then fades into the hero film. */
const PHASES = [
  ['p1', 600],   // flap lifts
  ['p2', 1500],  // card rises out
  ['p3', 2450],  // card comes forward
  ['p4', 3700],  // fade away
]
const DONE_AT = 4450

export default function Intro({ onDone }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('p0')
  const timers = useRef([])

  useEffect(() => {
    if (reduce) {
      timers.current.push(setTimeout(onDone, 1400))
      return () => timers.current.forEach(clearTimeout)
    }
    PHASES.forEach(([p, t]) => timers.current.push(setTimeout(() => setPhase(p), t)))
    timers.current.push(setTimeout(onDone, DONE_AT))
    return () => timers.current.forEach(clearTimeout)
  }, [reduce, onDone])

  const skip = () => {
    timers.current.forEach(clearTimeout)
    setPhase('p4')
    timers.current.push(setTimeout(onDone, 500))
  }

  return (
    <div className={`intro ${phase}${reduce ? ' intro--still' : ''}`} onClick={skip} role="presentation">
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
