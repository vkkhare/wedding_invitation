import Reveal from './Reveal.jsx'

export default function Invocation() {
  return (
    <section className="section section--red" id="invocation">
      <div className="wrap">
        <Reveal as="p" className="lang-dev shloka-top">॥ श्री गणेशाय नमः ॥</Reveal>

        <Reveal className="ganesha" aria-hidden="true">
          <svg viewBox="0 0 200 240" fill="none" stroke="var(--gold)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* aura arcs */}
            <path d="M58 44 C52 30 56 16 66 8" opacity="0.55" />
            <path d="M142 44 C148 30 144 16 134 8" opacity="0.55" />
            {/* crown */}
            <path d="M78 50 C76 30 86 22 100 20 C114 22 124 30 122 50" />
            <path d="M100 20 C97 15 97 10 100 6 C103 10 103 15 100 20" />
            <path d="M84 44 C84 34 91 29 100 28 C109 29 116 34 116 44" />
            <path d="M78 50 L122 50" />
            <path d="M75 56 L125 56" />
            <circle cx="86" cy="53" r="0.9" fill="var(--gold)" stroke="none" />
            <circle cx="93" cy="53" r="0.9" fill="var(--gold)" stroke="none" />
            <circle cx="100" cy="53" r="0.9" fill="var(--gold)" stroke="none" />
            <circle cx="107" cy="53" r="0.9" fill="var(--gold)" stroke="none" />
            <circle cx="114" cy="53" r="0.9" fill="var(--gold)" stroke="none" />
            {/* ears */}
            <path d="M74 58 C56 52 44 60 44 74 C44 90 56 100 70 96" />
            <path d="M70 66 C60 64 54 70 55 79 C56 88 62 92 68 91" />
            <path d="M126 58 C144 52 156 60 156 74 C156 90 144 100 130 96" />
            <path d="M130 66 C140 64 146 70 145 79 C144 88 138 92 132 91" />
            {/* face sides */}
            <path d="M75 56 C73 68 74 80 78 90 M125 56 C127 68 126 80 122 90" />
            {/* tilak + eyes */}
            <path d="M96 64 C98 68 102 68 104 64" />
            <path d="M100 62 L100 68" />
            <path d="M84 76 C87 73 91 73 94 76" />
            <path d="M106 76 C109 73 113 73 116 76" />
            {/* trunk: compact sweep curling toward the modak */}
            <path d="M94 80 C88 94 82 102 76 110 C70 118 66 126 67 134 C68 143 76 148 83 146 C89 144 90 137 84 135" />
            <path d="M106 80 C100 96 94 106 87 114 C82 120 78 126 78 132" />
            {/* tusk */}
            <path d="M114 86 C120 92 122 101 116 108" />
            {/* body */}
            <path d="M70 96 C58 116 52 138 54 160 C56 180 64 192 74 198" />
            <path d="M130 96 C142 116 148 138 146 160 C144 180 136 192 126 198" />
            {/* upper arms with lotus buds */}
            <path d="M70 102 C58 104 50 110 47 118" />
            <path d="M47 118 C42 114 42 106 48 105 C54 105 55 114 50 118" />
            <path d="M130 102 C142 104 150 110 153 118" />
            <path d="M153 118 C158 114 158 106 152 105 C146 105 145 114 150 118" />
            {/* lower arms: modak and blessing palm */}
            <path d="M60 148 C62 158 70 164 79 165" />
            <path d="M87 167 C86 160 91 155 96 157 C100 159 100 166 96 169" />
            <path d="M92 157 L92 153" />
            <path d="M140 148 C138 158 130 164 121 165" />
            <path d="M116 167 C111 162 111 153 118 151 C124 153 124 162 120 167" />
            <path d="M118 158 L118 152 M122 159 L123 154" />
            {/* folded legs + dhoti */}
            <path d="M78 190 C90 198 110 198 122 190" />
            <path d="M74 198 C82 208 118 208 126 198" />
            <path d="M92 206 C96 209 104 209 108 206" />
            {/* lotus seat */}
            <path d="M60 220 C70 212 84 210 100 210 C116 210 130 212 140 220" />
            <path d="M60 220 C76 228 124 228 140 220" />
            <path d="M78 215 C84 211 92 210 100 210 M100 210 C108 210 116 211 122 215" />
            <path d="M70 224 C76 220 84 219 90 221 M110 221 C116 219 124 220 130 224" />
            {/* mushak */}
            <path d="M152 216 C150 209 158 204 164 207 C170 210 168 217 162 218 C157 219 153 219 152 216 Z" />
            <path d="M162 218 C170 222 176 219 177 214" />
            <path d="M158 206 C158 203 162 203 162 206" />
            <circle cx="163" cy="210" r="1" fill="var(--gold)" stroke="none" />
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
