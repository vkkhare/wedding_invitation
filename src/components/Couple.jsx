import Reveal from './Reveal.jsx'
import { useSide } from '../content.js'

export default function Couple() {
  const { couple } = useSide()
  const [first, second] = couple

  return (
    <section className="section section--red section--flush" id="couple">
      <div className="wrap">
        <Reveal as="h2" className="couple-name">{first.name}</Reveal>
        <Reveal as="p" className="couple-parent">{first.parent}</Reveal>

        <Reveal className="couple-amp">
          <span className="script">&amp;</span>
        </Reveal>

        <Reveal as="h2" className="couple-name">{second.name}</Reveal>
        <Reveal as="p" className="couple-parent">{second.parent}</Reveal>
      </div>
    </section>
  )
}
