import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/* Parallax speeds: 0 = pinned to the page, 1 = scrolls away at full speed.
   Each layer is translated by scrollY * (1 - speed), so lower numbers drift slower. */
const drift = (scrollY, speed) => useTransform(scrollY, (v) => v * (1 - speed))

const LANTERNS = [
  { x: '8%', d: '22s', s: 0.7, o: 0.5 },
  { x: '18%', d: '26s', s: 1.0, o: 0.75, delay: '-8s' },
  { x: '32%', d: '20s', s: 0.55, o: 0.45, delay: '-14s' },
  { x: '48%', d: '28s', s: 0.85, o: 0.6, delay: '-4s' },
  { x: '62%', d: '23s', s: 0.65, o: 0.5, delay: '-17s' },
  { x: '75%', d: '27s', s: 1.1, o: 0.8, delay: '-10s' },
  { x: '88%', d: '21s', s: 0.6, o: 0.45, delay: '-6s' },
  { x: '41%', d: '30s', s: 1.25, o: 0.85, delay: '-20s' },
]

const PETALS = [
  { x: '12%', d: '11s' },
  { x: '28%', d: '14s', delay: '-5s' },
  { x: '44%', d: '12s', delay: '-9s' },
  { x: '58%', d: '15s', delay: '-3s' },
  { x: '72%', d: '13s', delay: '-7s' },
  { x: '86%', d: '16s', delay: '-11s' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  /* The wedding film: attach it at public/assets/hero.mp4 — until then the
     painted lantern-dusk scene stands in. */
  const [hasVideo, setHasVideo] = useState(true)

  useEffect(() => {
    /* <source> error events are unreliable across browsers, so verify directly */
    fetch('assets/hero.mp4', { method: 'HEAD' })
      .then((r) => setHasVideo(r.ok))
      .catch(() => setHasVideo(false))
  }, [])

  const ySky = drift(scrollY, 0.12)
  const yFar = drift(scrollY, 0.26)
  const yNear = drift(scrollY, 0.42)
  const yLanterns = drift(scrollY, 0.6)
  const yPetals = drift(scrollY, 0.75)
  const yContent = drift(scrollY, 0.9)

  const videoScale = useTransform(scrollY, [0, 900], [1, 1.18])
  const videoY = drift(scrollY, 0.3)
  const contentOpacity = useTransform(scrollY, (v) => {
    const h = (ref.current?.offsetHeight || window.innerHeight) * 0.55
    return Math.max(0, 1 - v / h)
  })

  const still = { y: 0 }
  const mv = (y) => (reduce ? still : { y })

  return (
    <header className="hero" id="hero" ref={ref}>
      {/* Layered painted scene — fallback behind the film, and the hero itself until the film is attached */}
      <div className="hero__scene" aria-hidden="true">
        <motion.div className="hero__layer hero__sky" style={mv(ySky)} />
        <motion.div className="hero__layer hero__sun" style={mv(ySky)} />
        <motion.div className="hero__layer hero__palace-far" style={mv(yFar)}>
          <PalaceFar />
        </motion.div>
        <motion.div className="hero__layer hero__palace-near" style={mv(yNear)}>
          <PalaceNear />
        </motion.div>
        <motion.div className="hero__layer hero__lanterns" style={mv(yLanterns)}>
          {LANTERNS.map((l, i) => (
            <span
              key={i}
              className="lantern"
              style={{ '--x': l.x, '--d': l.d, '--s': l.s, '--o': l.o, '--delay': l.delay }}
            />
          ))}
        </motion.div>
      </div>

      {/* The film plays above the painted scene, below the atmosphere + titles */}
      {hasVideo && (
        <motion.video
          className="hero__video"
          style={reduce ? undefined : { scale: videoScale, y: videoY }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setHasVideo(false)}
        >
          <source src="assets/hero.mp4" type="video/mp4" onError={() => setHasVideo(false)} />
        </motion.video>
      )}

      {/* Atmosphere above the film: drifting petals + vignette for text legibility */}
      <motion.div className="hero__layer hero__petals" style={mv(yPetals)} aria-hidden="true">
        {PETALS.map((p, i) => (
          <span key={i} className="petal" style={{ '--x': p.x, '--d': p.d, '--delay': p.delay }} />
        ))}
      </motion.div>
      <div className="hero__vignette" aria-hidden="true" />

      <motion.div
        className="hero__content"
        style={reduce ? undefined : { y: yContent, opacity: contentOpacity }}
      >
        <p className="hero__mantra lang-dev">॥ श्री गणेशाय नमः ॥</p>
        <img className="hero__monogram" src="assets/monogram.png" alt="VP monogram" />
        <h1 className="hero__names">
          <span className="hero__name">Varun</span>
          <span className="hero__weds">weds</span>
          <span className="hero__name">Prarita</span>
        </h1>
        <div className="hero__rule">
          <span></span>
          <i>❖</i>
          <span></span>
        </div>
        <p className="hero__date">
          Thursday · 26<sup>th</sup> November 2026
        </p>
        <p className="hero__place">Utopia Resort, Sanchi · Vidisha</p>
      </motion.div>

      <a className="hero__scroll" href="#invocation" aria-label="Scroll to invitation">
        <span className="hero__scroll-text">Open Invitation</span>
        <span className="hero__scroll-chev"></span>
      </a>

      <div className="hero__curtain" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,120 L0,60 C240,10 480,0 720,0 C960,0 1200,10 1440,60 L1440,120 Z"
            fill="#7a1418"
          />
        </svg>
      </div>
    </header>
  )
}

/* Wide sandstone palace across a reflecting lake, dusk-lit windows */
function PalaceFar() {
  const winRows = [284, 330]
  const winCols = Array.from({ length: 25 }, (_, i) => 92 + i * 42).filter((x) => x < 508 || x > 688)
  const lit = (x, y) => ((x * 7 + y) % 5) < 2
  const chhatris = [150, 300, 450, 750, 900, 1050]
  const reflections = winCols.filter((_, i) => i % 2 === 0)
  return (
    <>
    <svg className="pf-desk" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="lakeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b87f4c" />
          <stop offset="0.5" stopColor="#93613a" />
          <stop offset="1" stopColor="#7a4d2b" />
        </linearGradient>
        <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c89b53" />
          <stop offset="1" stopColor="#a1743e" />
        </linearGradient>
        <g id="chF">
          <path d="M -15 -18 C -15 -28 -7 -32 0 -32 C 7 -32 15 -28 15 -18 Z" fill="#9d7038" />
          <path d="M -1.4 -32 h2.8 l-1.4 -7 Z" fill="#9d7038" />
          <rect x="-13" y="-18" width="3.4" height="18" fill="#9d7038" />
          <rect x="9.6" y="-18" width="3.4" height="18" fill="#9d7038" />
          <rect x="-18" y="-19" width="36" height="3.4" rx="1.7" fill="#9d7038" />
        </g>
        <g id="winF">
          <path d="M -9 0 v-16 q0 -6 4.5 -8 q2.5 -1.2 4.5 -4 q2 2.8 4.5 4 q4.5 2 4.5 8 v16 Z" />
        </g>
      </defs>

      {/* lake */}
      <rect x="0" y="400" width="1200" height="120" fill="url(#lakeG)" />
      {reflections.map((x) => (
        <rect key={x} x={x - 4} y="404" width="8" height={30 + ((x * 13) % 44)} fill="#ffd27a" opacity="0.35" />
      ))}
      <rect x="578" y="404" width="44" height="66" fill="#ffe0a0" opacity="0.4" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={(i * 97) % 1160} y={414 + ((i * 37) % 86)} width={34 + ((i * 29) % 40)} height="2.4" rx="1.2" fill="#f2d7a4" opacity="0.3" />
      ))}

      {/* main facade */}
      <rect x="40" y="232" width="1120" height="168" fill="url(#wallG)" />
      <rect x="40" y="384" width="1120" height="16" fill="#7d5c32" />
      {Array.from({ length: 47 }, (_, i) => (
        <rect key={i} x={48 + i * 24} y="224" width="12" height="10" fill="#a87c42" />
      ))}

      {/* corner towers */}
      {[
        [40, 100],
        [1100, 100],
      ].map(([x]) => (
        <g key={x}>
          <rect x={x} y="176" width="60" height="224" fill="#b28545" />
          <path d={`M ${x + 4} 176 C ${x + 4} 150 ${x + 14} 142 ${x + 30} 138 C ${x + 46} 142 ${x + 56} 150 ${x + 56} 176 Z`} fill="#9d7038" />
          <path d={`M ${x + 28} 140 h4 l-2 -12 Z`} fill="#9d7038" />
          <use href="#winF" x={x + 30} y="280" fill="#5f3d20" opacity="0.7" />
          <use href="#winF" x={x + 30} y="344" fill="#ffd27a" opacity="0.95" />
        </g>
      ))}

      {/* central pavilion with grand dome */}
      <rect x="508" y="188" width="184" height="212" fill="#b98a4a" />
      <path d="M 528 188 C 522 138 548 118 600 110 C 652 118 678 138 672 188 Z" fill="#a1743e" />
      <path d="M 596 112 h8 l-4 -20 Z" fill="#a1743e" />
      <use href="#chF" x="540" y="188" />
      <use href="#chF" x="660" y="188" />
      <path d="M 570 400 v-50 q0 -18 13 -24 q9 -4 17 -12 q8 8 17 12 q13 6 13 24 v50 Z" fill="#ffd88a" opacity="0.95" />
      <use href="#winF" x="545" y="316" fill="#ffd27a" opacity="0.9" />
      <use href="#winF" x="655" y="316" fill="#ffd27a" opacity="0.9" />

      {/* parapet chhatris */}
      {chhatris.map((x) => (
        <use key={x} href="#chF" x={x} y="232" />
      ))}

      {/* window rows */}
      {winRows.map((y) =>
        winCols.map((x) => (
          <use
            key={`${x}-${y}`}
            href="#winF"
            x={x}
            y={y}
            fill={lit(x, y) ? '#ffd27a' : '#5f3d20'}
            opacity={lit(x, y) ? 0.95 : 0.65}
          />
        )),
      )}
    </svg>
    <PalaceFarMobile />
    </>
  )
}

/* Portrait recomposition of the same palace for phone screens */
function PalaceFarMobile() {
  const winCols = [64, 100, 300, 336].concat([136, 264])
  const winRows = [296, 344]
  const lit = (x, y) => ((x * 7 + y) % 5) < 2
  return (
    <svg className="pf-mob" viewBox="0 0 400 520" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="lakeGm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b87f4c" />
          <stop offset="0.5" stopColor="#93613a" />
          <stop offset="1" stopColor="#7a4d2b" />
        </linearGradient>
        <linearGradient id="wallGm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c89b53" />
          <stop offset="1" stopColor="#a1743e" />
        </linearGradient>
        <g id="chFm">
          <path d="M -12 -15 C -12 -24 -6 -27 0 -27 C 6 -27 12 -24 12 -15 Z" fill="#9d7038" />
          <path d="M -1.2 -27 h2.4 l-1.2 -6 Z" fill="#9d7038" />
          <rect x="-10.5" y="-15" width="3" height="15" fill="#9d7038" />
          <rect x="7.5" y="-15" width="3" height="15" fill="#9d7038" />
          <rect x="-14.5" y="-16" width="29" height="3" rx="1.5" fill="#9d7038" />
        </g>
        <g id="winFm">
          <path d="M -8 0 v-14 q0 -5.4 4 -7.2 q2.2 -1 4 -3.6 q1.8 2.6 4 3.6 q4 1.8 4 7.2 v14 Z" />
        </g>
      </defs>

      {/* lake */}
      <rect x="0" y="396" width="400" height="124" fill="url(#lakeGm)" />
      {[64, 136, 264, 336].map((x) => (
        <rect key={x} x={x - 4} y="400" width="8" height={26 + ((x * 13) % 40)} fill="#ffd27a" opacity="0.35" />
      ))}
      <rect x="182" y="400" width="36" height="58" fill="#ffe0a0" opacity="0.4" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={(i * 53) % 360} y={408 + ((i * 37) % 72)} width={26 + ((i * 29) % 30)} height="2.2" rx="1.1" fill="#f2d7a4" opacity="0.3" />
      ))}

      {/* facade */}
      <rect x="8" y="252" width="384" height="144" fill="url(#wallGm)" />
      <rect x="8" y="384" width="384" height="12" fill="#7d5c32" />
      {Array.from({ length: 19 }, (_, i) => (
        <rect key={i} x={14 + i * 20} y="245" width="10" height="8" fill="#a87c42" />
      ))}

      {/* corner towers */}
      {[8, 340].map((x) => (
        <g key={x}>
          <rect x={x} y="204" width="52" height="192" fill="#b28545" />
          <path d={`M ${x + 3} 204 C ${x + 3} 182 ${x + 12} 175 ${x + 26} 171 C ${x + 40} 175 ${x + 49} 182 ${x + 49} 204 Z`} fill="#9d7038" />
          <path d={`M ${x + 24} 173 h4 l-2 -10 Z`} fill="#9d7038" />
          <use href="#winFm" x={x + 26} y="300" fill="#5f3d20" opacity="0.7" />
          <use href="#winFm" x={x + 26} y="352" fill="#ffd27a" opacity="0.95" />
        </g>
      ))}

      {/* central pavilion */}
      <rect x="140" y="218" width="120" height="178" fill="#b98a4a" />
      <path d="M 154 218 C 149 178 168 162 200 156 C 232 162 251 178 246 218 Z" fill="#a1743e" />
      <path d="M 197 158 h6 l-3 -16 Z" fill="#a1743e" />
      <use href="#chFm" x="152" y="218" />
      <use href="#chFm" x="248" y="218" />
      <path d="M 176 396 v-44 q0 -15 10.5 -20 q7.5 -3.4 13.5 -10 q6 6.6 13.5 10 q10.5 5 10.5 20 v44 Z" fill="#ffd88a" opacity="0.95" />
      <use href="#winFm" x="160" y="330" fill="#ffd27a" opacity="0.9" />
      <use href="#winFm" x="240" y="330" fill="#ffd27a" opacity="0.9" />

      {/* parapet chhatris */}
      <use href="#chFm" x="104" y="252" />
      <use href="#chFm" x="296" y="252" />

      {/* windows */}
      {winRows.map((y) =>
        winCols.map((x) => (
          <use
            key={`${x}-${y}`}
            href="#winFm"
            x={x}
            y={y}
            fill={lit(x, y) ? '#ffd27a' : '#5f3d20'}
            opacity={lit(x, y) ? 0.95 : 0.65}
          />
        )),
      )}
    </svg>
  )
}

/* Foreground: darker side pavilions and a lakeside terrace framing the centre */
function PalaceNear() {
  return (
    <svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice">
      <defs>
        <g id="domeN">
          <path d="M -22 0 C -33 -9 -33 -26 -18 -36 C -8 -42 -4 -43 0 -52 C 4 -43 8 -42 18 -36 C 33 -26 33 -9 22 0 Z" />
          <path d="M -2 -51 h4 l-2 -11 Z" />
        </g>
        <g id="archN">
          <path d="M -13 0 v-24 q0 -9 6.5 -12 q3.6 -1.8 6.5 -6 q2.9 4.2 6.5 6 q6.5 3 6.5 12 v24 Z" />
        </g>
      </defs>
      <g fill="#8a5433">
        {/* left pavilion */}
        <path d="M0 360 V150 H30 V120 H150 V150 H190 V210 H230 V360 Z" />
        <use href="#domeN" x="90" y="120" />
        {/* right pavilion */}
        <path d="M1200 360 V150 H1170 V120 H1050 V150 H1010 V210 H970 V360 Z" />
        <use href="#domeN" x="1110" y="120" />
        {/* lakeside terrace edge */}
        <path d="M0 360 V330 H1200 V360 Z" />
        {Array.from({ length: 29 }, (_, i) => (
          <rect key={i} x={16 + i * 42} y="316" width="16" height="14" rx="3" />
        ))}
      </g>
      <g fill="#5e3a1e" opacity="0.85">
        <use href="#archN" x="70" y="240" />
        <use href="#archN" x="120" y="240" />
        <use href="#archN" x="1080" y="240" />
        <use href="#archN" x="1130" y="240" />
      </g>
      <g fill="#ffd98a" opacity="0.85">
        <use href="#archN" x="95" y="300" transform="scale(0.6)" transform-origin="95 300" />
        <use href="#archN" x="1105" y="300" transform="scale(0.6)" transform-origin="1105 300" />
      </g>
    </svg>
  )
}
