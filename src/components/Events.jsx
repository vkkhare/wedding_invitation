import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const MAPS_UTOPIA = 'https://www.google.com/maps/search/?api=1&query=Utopia+Resort+Sanchi+Vidisha'
const MAPS_HOME =
  'https://www.google.com/maps/search/?api=1&query=Sterling+Oasis%2C+Rajat+Vihar%2C+Hoshangabad+Road%2C+Bhopal'
const GCAL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Varun+weds+Prarita+%E2%80%94+Wedding+%26+Reception&dates=20261126T083000Z/20261126T183000Z&details=Jaimala+4:00+pm+%C2%B7+Phere+5:45+pm+%C2%B7+Reception+%26+Dinner+8:00+pm&location=Utopia+Resort,+Sanchi,+Vidisha'

const KalashIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 26 h20 M20 26 q-8 14 4 26 q8 6 16 0 q12 -12 4 -26" />
    <path d="M24 20 q8 -6 16 0 l2 6 h-20 Z" />
    <path d="M32 6 v8 M26 10 l6 4 6 -4" />
    <path d="M24 56 h16" />
  </svg>
)

const HaldiIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 30 h40 q-2 18 -20 20 q-18 -2 -20 -20 Z" />
    <path d="M20 24 q6 -8 12 0 q6 -8 12 0" />
    <circle cx="32" cy="16" r="2.4" />
    <path d="M22 56 h20" />
  </svg>
)

const PheraIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 8 q10 10 4 18 q10 -2 8 10 q-2 10 -12 12 q-10 -2 -12 -12 q-2 -12 8 -10 q-6 -8 4 -18 Z" />
    <path d="M32 30 q4 5 0 10 q-4 -5 0 -10 Z" />
    <path d="M14 54 h36 M18 60 h28" />
  </svg>
)

const EVENTS = [
  {
    day: '23',
    date: 'Nov 2026',
    weekday: 'Monday',
    icon: <KalashIcon />,
    title: 'Ganesh & Mata Pujan',
    meta: <>Monday, November 23<sup>rd</sup> 2026 · 9:00 am onwards</>,
    sub: ['Mandap · 11:00 am', 'Mehendi · 4:00 pm'],
    venue: 'At Residence — D-52, Sterling Oasis, Rajat Vihar, Hoshangabad Road, Bhopal',
    actions: [{ label: 'View Directions', href: MAPS_HOME }],
  },
  {
    day: '25',
    date: 'Nov 2026',
    weekday: 'Wednesday',
    icon: <HaldiIcon />,
    title: 'Haldi, Sangeet & Engagement',
    meta: <>Wednesday, November 25<sup>th</sup> 2026</>,
    sub: ['Lagun · 9:00 am', 'Bhat · 10:00 am', 'Haldi & Tel · 2:00 pm', 'Sangeet & Engagement · 8:00 pm'],
    venue: 'At Utopia Resort, Sanchi (Vidisha)',
    actions: [{ label: 'View Directions', href: MAPS_UTOPIA }],
  },
  {
    day: '26',
    date: 'Nov 2026',
    weekday: 'Thursday',
    icon: <PheraIcon />,
    kicker: 'The Big Day',
    title: 'Wedding & Reception',
    meta: <>Thursday, November 26<sup>th</sup> 2026</>,
    sub: ['Baraat Prasthan · 2:00 pm', 'Jaimala · 4:00 pm', 'Phere · 5:45 pm', 'Reception & Dinner · 8:00 pm'],
    venue: 'At Utopia Resort, Sanchi (Vidisha)',
    main: true,
    actions: [
      { label: 'View Directions', href: MAPS_UTOPIA },
      { label: 'Add to Calendar', href: GCAL },
    ],
  },
]

function EventCard({ ev }) {
  return (
    <Reveal as="article" className={`event-card${ev.main ? ' event-card--main' : ''}`}>
      <div className="event-card__datebar">
        <span className="event-card__day">{ev.day}</span>
        <span className="event-card__mon">
          {ev.date}
          <br />
          {ev.weekday}
        </span>
      </div>
      <div className="event-card__icon" aria-hidden="true">{ev.icon}</div>
      {ev.kicker && <p className="event-card__kicker">{ev.kicker}</p>}
      <h3 className="event-card__title script">{ev.title}</h3>
      <p className="event-card__meta">{ev.meta}</p>
      <div className="event-card__sub">
        {ev.sub.map((s, i) => (
          <span key={s} className="event-card__subitem">
            {i > 0 && <i>❖</i>}
            <span>{s}</span>
          </span>
        ))}
      </div>
      <p className="event-card__venue">{ev.venue}</p>
      <div className="event-card__actions">
        {ev.actions.map((a) => (
          <a key={a.label} className="event-card__dir" href={a.href} target="_blank" rel="noopener noreferrer">
            {a.label}
          </a>
        ))}
      </div>
    </Reveal>
  )
}

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

        {EVENTS.filter((ev) => !ev.main).map((ev) => (
          <EventCard key={ev.day} ev={ev} />
        ))}
      </div>

      {/* The Big Day — card beside the couple on the jharokha */}
      <div className="bigday">
        <EventCard ev={EVENTS.find((ev) => ev.main)} />
        <JharokhaArt />
      </div>
    </section>
  )
}
