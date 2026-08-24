import Reveal from './Reveal.jsx'
import { MAPS_UTOPIA, GCAL } from './Events.jsx'

/* The wedding venue with directions and calendar, following the big-day composition */
export default function Venue() {
  return (
    <section className="section section--red venue" id="venue">
      <div className="curtain-top curtain-top--flip" aria-hidden="true">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path
            d="M0,0 L1440,0 L1440,40 C1200,100 960,110 720,110 C480,110 240,100 0,40 Z"
            fill="#f6ecd9"
          />
        </svg>
      </div>
      <div className="wrap">
        <Reveal as="p" className="family-head">The Venue</Reveal>
        <Reveal as="h2" className="venue__name">Utopia Resort</Reveal>
        <Reveal as="p" className="venue__place">Sanchi (Vidisha), Madhya Pradesh</Reveal>
        <Reveal className="venue__actions">
          <a className="event-card__dir" href={MAPS_UTOPIA} target="_blank" rel="noopener noreferrer">
            View Directions
          </a>
          <a className="event-card__dir" href={GCAL} target="_blank" rel="noopener noreferrer">
            Add to Calendar
          </a>
        </Reveal>
      </div>
    </section>
  )
}
