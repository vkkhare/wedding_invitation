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

        <Reveal as="p" className="family-head">A Message from Maa</Reveal>
        <Reveal as="p" className="lang-dev couplet">
          आज इस आँगन में एक नई किरण उतरी है,<br />
          जैसे दुआओं की चादर घर पर बिखरी है।
        </Reveal>
      </div>
    </section>
  )
}
