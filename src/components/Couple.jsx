import Reveal from './Reveal.jsx'
import { useSide } from '../content.js'

export default function Couple() {
  const { couple, invitation } = useSide()

  return (
    <section className="section section--red section--flush" id="couple">
      <div className="wrap">
        {invitation ? <Passage invitation={invitation} /> : <Names couple={couple} />}
      </div>
    </section>
  )
}

/* Each party in turn: the honorific it is addressed by, the name, the elders it
   comes from, and the line that carries the reader on to the next. */
function Passage({ invitation }) {
  return (
    <>
      <FloralRule />
      {invitation.parties.map((p) => (
        <div className="invite-party" key={p.name}>
          <Reveal as="p" className="invite-honorific lang-dev">{p.honorific}</Reveal>
          <Reveal as="h2" className="invite-name lang-dev">{p.name}</Reveal>
          {p.kin.map((line) => (
            <Reveal as="p" key={line} className="invite-kin lang-dev">
              {line}
            </Reveal>
          ))}
          <Reveal as="p" className="invite-join lang-dev">{p.after}</Reveal>
        </div>
      ))}
      <Reveal as="p" className="invite-close lang-dev">{invitation.close}</Reveal>
    </>
  )
}

/* The turn between the invitation's opening and the names it introduces: a gold
   hairline that fades out at both ends, a leaf either side, and a small rosette
   at its centre. Drawn rather than typed — no ornament in the page's faces sits
   comfortably beside Devanagari at this weight. */
function FloralRule() {
  return (
    <Reveal className="floral-rule" aria-hidden="true">
      <svg viewBox="0 0 360 28" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* in user space, not the default bounding box: a horizontal line's box
              has no height, and a gradient measured against it never paints */}
          <linearGradient id="ruleL" gradientUnits="userSpaceOnUse" x1="8" y1="14" x2="150" y2="14">
            <stop offset="0" stopColor="#d9b45c" stopOpacity="0.12" />
            <stop offset="1" stopColor="#d9b45c" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="ruleR" gradientUnits="userSpaceOnUse" x1="210" y1="14" x2="352" y2="14">
            <stop offset="0" stopColor="#d9b45c" stopOpacity="1" />
            <stop offset="1" stopColor="#d9b45c" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path d="M8 14 H150" fill="none" stroke="url(#ruleL)" strokeWidth="1.4" />
        <path d="M210 14 H352" fill="none" stroke="url(#ruleR)" strokeWidth="1.4" />
        <g fill="#d9b45c">
          <circle cx="112" cy="14" r="1.9" opacity="0.75" />
          <circle cx="248" cy="14" r="1.9" opacity="0.75" />
          <path d="M150 14 C 154 8, 162 8, 166 14 C 162 20, 154 20, 150 14 Z" opacity="0.9" />
          <path d="M210 14 C 206 8, 198 8, 194 14 C 198 20, 206 20, 210 14 Z" opacity="0.9" />
        </g>
        <g transform="translate(180 14)">
          <g fill="#d9b45c">
            <ellipse rx="3.4" ry="9" />
            <ellipse rx="9" ry="3.4" />
          </g>
          <g fill="#d9b45c" opacity="0.55" transform="rotate(45)">
            <ellipse rx="2.6" ry="7" />
            <ellipse rx="7" ry="2.6" />
          </g>
          <circle r="2" fill="#f0d48a" />
        </g>
      </svg>
    </Reveal>
  )
}

function Names({ couple }) {
  const [first, second] = couple

  return (
    <>
      <Reveal as="h2" className="couple-name">{first.name}</Reveal>
      <Reveal as="p" className="couple-parent">{first.parent}</Reveal>

      <Reveal className="couple-amp">
        <span className="script">&amp;</span>
      </Reveal>

      <Reveal as="h2" className="couple-name">{second.name}</Reveal>
      <Reveal as="p" className="couple-parent">{second.parent}</Reveal>
    </>
  )
}
