import { useRef } from 'react'
import Reveal from './Reveal.jsx'
import VoiceNote from './VoiceNote.jsx'
import { Divider } from './Invocation.jsx'
import { useSide } from '../content.js'

export default function Family({ onVoiceNote }) {
  const { thanks, specialRequest, rsvp } = useSide()
  const sectionRef = useRef(null)

  return (
    <section className="section section--red section--flush" id="family" ref={sectionRef}>
      <div className="wrap">
        <Reveal as="p" className="count-copy">{thanks}</Reveal>

        <Divider glyph="✻" />

        {/* the family's own request, where they have one to make */}
        {specialRequest && (
          <>
            <Reveal as="p" className="family-head">{specialRequest.head}</Reveal>
            <Reveal as="p" className="family-names">
              {specialRequest.names.map((n, i) => (
                <span key={n}>
                  {i > 0 && <br />}
                  {n}
                </span>
              ))}
            </Reveal>
            {specialRequest.little && (
              <Reveal as="p" className="family-names family-names--little">
                {specialRequest.little}
              </Reveal>
            )}
            {specialRequest.voiceNote && (
              <VoiceNote
                src={specialRequest.voiceNote}
                targetRef={sectionRef}
                onPlaying={onVoiceNote}
              />
            )}

            <Divider glyph="✻" />
          </>
        )}

        <Reveal as="a" className="rsvp-btn" href={rsvp.whatsapp} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.6.1-.8l.4-.5c.1-.2.1-.3.2-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.5 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" />
          </svg>
          Share Your RSVP
        </Reveal>
        <Reveal as="p" className="rsvp-alt">
          or call ·{' '}
          {rsvp.phones.map((p, i) => (
            <span key={p.tel}>
              {i > 0 && ' · '}
              <a href={`tel:${p.tel}`}>{p.label}</a>
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
