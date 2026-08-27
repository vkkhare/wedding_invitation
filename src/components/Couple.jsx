import Reveal from './Reveal.jsx'

export default function Couple() {
  return (
    <section className="section section--red section--flush" id="couple">
      <div className="wrap">
        <Reveal as="h2" className="couple-name">Varun</Reveal>
        <Reveal as="p" className="couple-parent">
          Son of Dr. Shobha &amp; Dr. Abhay Khare
        </Reveal>

        <Reveal className="couple-amp">
          <span className="script">&amp;</span>
        </Reveal>

        <Reveal as="h2" className="couple-name">Prarita</Reveal>
        <Reveal as="p" className="couple-parent">
          Daughter of Shri Prakash Chandra Agrawal &amp; Smt. Shalini Agrawal
        </Reveal>

        <Reveal className="couple-film">
          <video src="assets/couple.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Animated portrait of the couple" />
        </Reveal>
      </div>
    </section>
  )
}
