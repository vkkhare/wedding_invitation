import Reveal from './Reveal.jsx'
import { Divider } from './Invocation.jsx'

const WHATSAPP =
  'https://wa.me/917898527805?text=Namaste!%20We%20would%20be%20delighted%20to%20join%20the%20wedding%20celebrations%20of%20Varun%20%26%20Prarita.%20%E2%80%94'

export default function Family() {
  return (
    <section className="section section--red section--flush" id="family">
      <div className="wrap">
        <Reveal as="h2" className="script section-script">With Love From Us</Reveal>
        <Reveal as="p" className="count-copy">
          Thank you for being part of our journey. Your presence at the wedding celebrations will
          enhance the joy of the occasion and add blessings to this happy union.
        </Reveal>

        <Divider glyph="✻" />

        <Reveal as="p" className="family-head">Special Request</Reveal>
        <Reveal as="p" className="family-names">Kratika Khare &amp; Abhinav Saxena · Inaya</Reveal>

        <Divider glyph="✻" />

        <Reveal as="h2" className="script section-script rsvp-script">
          Awaiting the Pleasure
          <br />
          of Your Company
        </Reveal>
        <Reveal as="a" className="rsvp-btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.1-.3.2-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.5 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" />
          </svg>
          Share Your RSVP
        </Reveal>
        <Reveal as="p" className="rsvp-alt">
          or call · <a href="tel:+917898527805">78985 27805</a> ·{' '}
          <a href="tel:+919611942479">96119 42479</a>
        </Reveal>
      </div>
    </section>
  )
}
