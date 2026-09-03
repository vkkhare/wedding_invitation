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
