import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import { Divider } from './Invocation.jsx'

const TARGET = new Date('2026-11-26T00:00:00+05:30').getTime()
const pad = (n) => String(n).padStart(2, '0')

function remaining() {
  const diff = Math.max(0, TARGET - Date.now())
  const s = Math.floor(diff / 1000)
  return {
    done: diff <= 0,
    d: pad(Math.floor(s / 86400)),
    h: pad(Math.floor((s % 86400) / 3600)),
    m: pad(Math.floor((s % 3600) / 60)),
    s: pad(s % 60),
  }
}

export default function Countdown() {
  const [t, setT] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section section--red section--flush" id="countdown">
      <div className="wrap">
        <Reveal as="h2" className="script section-script">The Journey Begins</Reveal>
        <Reveal as="p" className="count-copy">
          Surrounded by family and friends, we can't wait
          <br className="br-desk" /> to celebrate this beautiful moment with you.
        </Reveal>
        <Reveal as="p" className="count-date">26 · 11 · 2026</Reveal>
        <Divider />
        <Reveal as="p" className="countdown" aria-live="polite">
          <span><b>{t.d}</b><small>Days</small></span>
          <i>·</i>
          <span><b>{t.h}</b><small>Hours</small></span>
          <i>·</i>
          <span><b>{t.m}</b><small>Mins</small></span>
          <i>·</i>
          <span><b>{t.s}</b><small>Secs</small></span>
        </Reveal>
        {t.done && <p className="count-copy">The auspicious day is here!</p>}
      </div>
    </section>
  )
}
