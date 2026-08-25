import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const MAPS_UTOPIA = 'https://www.google.com/maps/search/?api=1&query=Utopia+Resort+Sanchi+Vidisha'
const GCAL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Varun+weds+Prarita+%E2%80%94+Wedding+%26+Reception&dates=20261126T083000Z/20261126T183000Z&details=Jaimala+4:00+pm+%C2%B7+Phere+5:45+pm+%C2%B7+Reception+%26+Dinner+8:00+pm&location=Utopia+Resort,+Sanchi,+Vidisha'

const PheraIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 8 q10 10 4 18 q10 -2 8 10 q-2 10 -12 12 q-10 -2 -12 -12 q-2 -12 8 -10 q-6 -8 4 -18 Z" />
    <path d="M32 30 q4 5 0 10 q-4 -5 0 -10 Z" />
    <path d="M14 54 h36 M18 60 h28" />
  </svg>
)

const EVENTS = [
  {
    day: '26',
    date: 'Nov 2026',
    weekday: 'Thursday',
    icon: <PheraIcon />,
    kicker: 'The Big Day',
    title: 'Wedding & Reception',
    meta: <>Thursday · 26<sup>th</sup> November 2026</>,
    sub: ['Baraat Prasthan · 2:00 pm', 'Jaimala · 4:00 pm', 'Phere · 5:45 pm', 'Reception & Dinner · 8:00 pm'],
    main: true,
    actions: [],
  },
]

export { MAPS_UTOPIA, GCAL }

/* Bind times like "8:00 pm" with a non-breaking space so "pm" never wraps alone */
const nb = (s) => s.replace(/ · (?=\d)/g, ' · ').replace(/ (am|pm)\b/g, ' $1')

/* Couple on the palace jharokha, drifting beside the wedding-day card */
function JharokhaArt() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [46, -34])

  return (
    <figure className="bigday__art" ref={ref} aria-hidden="true">
      <motion.img
        src="assets/jharokha.webp"
        alt=""
        loading="lazy"
        style={reduce ? undefined : { y }}
        initial={reduce ? false : { opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </figure>
  )
}

/* Beside the jharokha: diya, the big day, its name, date, and the schedule */
function BigDayHead({ ev }) {
  return (
    <Reveal className="bigday__head">
      <div className="event-card__icon" aria-hidden="true">{ev.icon}</div>
      <p className="event-card__kicker">{ev.kicker}</p>
      <h3 className="bigday__title script">{ev.title}</h3>
      <p className="event-card__meta">{ev.meta}</p>
      <div className="event-card__sub">
        {ev.sub.map((s, i) => (
          <span key={s} className="event-card__subitem">
            {i > 0 && <i>❖</i>}
            <span>{nb(s)}</span>
          </span>
        ))}
      </div>
    </Reveal>
  )
}

const HaldiIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 30 h40 q-2 18 -20 20 q-18 -2 -20 -20 Z" />
    <path d="M20 24 q6 -8 12 0 q6 -8 12 0" />
    <circle cx="32" cy="16" r="2.4" />
    <path d="M22 56 h20" />
  </svg>
)

/* Haldi art: groom showering marigolds from the jharokha, bride aglow below */
function HaldiArt() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [46, -34])

  return (
    <figure className="bigday__art bigday__art--right" ref={ref} aria-hidden="true">
      <motion.img
        src="assets/haldi.webp"
        alt=""
        loading="lazy"
        style={reduce ? undefined : { y }}
        initial={reduce ? false : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </figure>
  )
}

/* 25 Nov — mirrored composition: details on the left, art off the right edge */
function HaldiScene() {
  return (
    <div className="bigday bigday--haldi">
      <Reveal className="bigday__head bigday__head--left">
        <div className="event-card__icon" aria-hidden="true"><HaldiIcon /></div>
        <p className="event-card__kicker">It's Glow Time</p>
        <h3 className="bigday__title script">Haldi</h3>
        <p className="event-card__meta">Wednesday · 25<sup>th</sup> November 2026</p>
        <div className="event-card__sub">
          {['Lagun · 9:00 am', 'Bhat · 10:00 am', 'Haldi & Tel · 2:00 pm'].map((s, i) => (
            <span key={s} className="event-card__subitem">
              {i > 0 && <i>❖</i>}
              <span>{nb(s)}</span>
            </span>
          ))}
        </div>
      </Reveal>
      <HaldiArt />
    </div>
  )
}

const MusicIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 46 V16 l24 -6 v30" />
    <ellipse cx="18" cy="46" rx="6" ry="5" />
    <ellipse cx="42" cy="40" rx="6" ry="5" />
    <path d="M24 24 l24 -6" />
  </svg>
)

/* 25 Nov evening — Sangeet as a living video card */
function SangeetScene() {
  const [muted, setMuted] = useState(true)
  return (
    <div className="bigday bigday--sangeet">
      <Reveal className="sangeet__media">
        <video src="assets/sangeet.mp4" autoPlay muted={muted} loop playsInline preload="metadata" />
        <button
          type="button"
          className="sangeet__sound"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Play with sound' : 'Mute'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.6 3 3.2 3.2-1.4 1.4-3.2-3.2-3.2 3.2-1.4-1.4L13.8 12l-3.2-3.2 1.4-1.4 3.2 3.2 3.2-3.2 1.4 1.4L16.6 12Z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Zm-2.5-8.5v2.1a6.5 6.5 0 0 1 0 12.8v2.1a8.5 8.5 0 0 0 0-17Z"/></svg>
          )}
        </button>
      </Reveal>
      <Reveal className="bigday__head">
        <div className="event-card__icon" aria-hidden="true"><MusicIcon /></div>
        <p className="event-card__kicker">An Evening of Music &amp; Dance</p>
        <h3 className="bigday__title script">Sangeet</h3>
        <p className="event-card__meta">Wednesday · 25<sup>th</sup> November 2026</p>
        <div className="event-card__sub">
          <span className="event-card__subitem"><span>{nb('8:00 pm onwards')}</span></span>
        </div>
      </Reveal>
    </div>
  )
}

export default function Events() {
  return (
    <section className="section section--cream" id="events">
      <div className="curtain-top" aria-hidden="true">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path
            d="M0,0 L1440,0 L1440,40 C1200,100 960,110 720,110 C480,110 240,100 0,40 Z"
            fill="#7a1418"
          />
        </svg>
      </div>
      <div className="wrap">
        <Reveal as="p" className="lang-dev shloka-top shloka-top--dark">
          ॥ मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः ॥
        </Reveal>
        <Reveal as="h2" className="script section-script section-script--dark">Wedding Festivities</Reveal>

      </div>

      {/* 25 Nov — Haldi as a full painted scene */}
      <HaldiScene />

      <SangeetScene />

      {/* The Big Day — one composition: the jharokha with the full day beside it */}
      <div className="bigday">
        <JharokhaArt />
        <BigDayHead ev={EVENTS.find((ev) => ev.main)} />
      </div>
    </section>
  )
}
