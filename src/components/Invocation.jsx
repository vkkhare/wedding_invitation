import Reveal from './Reveal.jsx'
import { useSide } from '../content.js'

export default function Invocation() {
  const { blessings, hosts, child, invitation } = useSide()

  return (
    <section
      className={`section section--red${invitation ? ' section--runs-on' : ''}`}
      id="invocation"
    >
      <div className="wrap">
        <Reveal as="p" className="lang-dev shloka-top">॥ श्री गणेशाय नमः ॥</Reveal>

        <Reveal className="ganesha" aria-hidden="true">
          <img src="/assets/ganesha.webp" alt="" loading="lazy" />
        </Reveal>

        <Reveal as="p" className="lang-dev shloka">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </Reveal>

        <Divider glyph="✻" />

        {invitation ? (
          /* the family's own invitation, in their words */
          invitation.lead.map((line) => (
            <Reveal as="p" key={line} className="invite-lead lang-dev">
              {line}
            </Reveal>
          ))
        ) : (
          <>
            {/* the elders are named only where the family has given their names */}
            {blessings && (
              <>
                <Reveal as="p" className="blessing-lead">With the heavenly blessings of</Reveal>
                <Reveal as="p" className="blessing-names">{blessings}</Reveal>

                <Divider glyph="✻" />
              </>
            )}

            <Reveal as="p" className="hosts-names">{hosts}</Reveal>
            <Reveal as="p" className="hosts-line">
              cordially solicit your gracious presence with family<br />
              to bless the couple on the auspicious occasion of the marriage of their {child}
            </Reveal>
          </>
        )}
      </div>
    </section>
  )
}

export function Divider({ glyph = '❖' }) {
  return (
    <Reveal className="orn-divider">
      <span></span>
      <i>{glyph}</i>
      <span></span>
    </Reveal>
  )
}
