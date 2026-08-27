import Reveal from './Reveal.jsx'

export default function Invocation() {
  return (
    <section className="section section--red" id="invocation">
      <div className="wrap">
        <Reveal as="p" className="lang-dev shloka-top">॥ श्री गणेशाय नमः ॥</Reveal>

        <Reveal className="ganesha" aria-hidden="true">
          <img src="assets/ganesha.webp" alt="" loading="lazy" />
        </Reveal>

        <Reveal as="p" className="lang-dev shloka">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </Reveal>

        <Divider glyph="✻" />

        <Reveal as="p" className="blessing-lead">With the heavenly blessings of</Reveal>
        <Reveal as="p" className="blessing-names">Late Shri K. B. Khare &amp; Late Smt. Tara Khare</Reveal>

        <Divider glyph="✻" />

        <Reveal as="p" className="hosts-names">Dr. Shobha Khare &amp; Dr. Abhay Khare</Reveal>
        <Reveal as="p" className="hosts-line">
          cordially solicit your gracious presence with family<br />
          to bless the couple on the auspicious occasion of the marriage of their son
        </Reveal>

        <Reveal as="p" className="hosts-line">Invite</Reveal>
        <Reveal as="p" className="hosts-line">you to join us in the wedding celebrations of</Reveal>
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
