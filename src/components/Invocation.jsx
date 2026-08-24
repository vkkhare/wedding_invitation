import Reveal from './Reveal.jsx'

export default function Invocation() {
  return (
    <section className="section section--red" id="invocation">
      <div className="wrap">
        <Reveal as="p" className="lang-dev shloka-top">॥ श्री गणेशाय नमः ॥</Reveal>

        <Reveal className="ganesha" aria-hidden="true">
          <svg viewBox="0 0 200 220" fill="none" stroke="var(--gold)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M100 18 L94 34 M100 18 L106 34 M100 12 L100 34" />
            <path d="M78 40 Q100 24 122 40 L118 52 Q100 40 82 52 Z" />
            <path d="M70 78 Q70 50 100 50 Q130 50 130 78 Q130 96 118 106" />
            <path d="M70 78 Q46 66 44 90 Q42 116 66 112 Q60 96 70 92" />
            <path d="M130 78 Q154 66 156 90 Q158 116 134 112 Q140 96 130 92" />
            <path d="M86 76 Q90 73 94 76 M106 76 Q110 73 114 76" />
            <path d="M100 58 Q97 66 100 72 Q103 66 100 58" />
            <path d="M100 84 Q104 100 96 112 Q86 126 92 138 Q98 150 112 146 Q122 142 118 132" />
            <path d="M88 106 Q80 112 82 120" />
            <path d="M66 112 Q52 138 58 164 Q64 188 100 190 Q136 188 142 164 Q148 138 134 112" />
            <path d="M78 156 Q100 170 122 156" />
            <path d="M58 140 Q42 148 46 164 Q50 176 62 174" />
            <path d="M142 140 Q158 148 154 164 Q150 176 138 174" />
            <path d="M46 164 Q42 158 46 154 Q52 152 54 158" />
            <path d="M154 164 Q158 158 154 154 Q148 152 146 158" />
            <path d="M64 196 Q100 208 136 196" />
            <path d="M56 204 Q100 218 144 204" />
          </svg>
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

        <Reveal as="h2" className="invite-word script">Invite</Reveal>
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
