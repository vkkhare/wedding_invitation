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

function PalaceFar() {
  return (
    <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice">
      <defs>
        <g id="domeF">
          <path d="M -16 0 C -25 -7 -25 -19 -13 -27 C -6 -31 -3 -32 0 -39 C 3 -32 6 -31 13 -27 C 25 -19 25 -7 16 0 Z" />
          <path d="M -1.5 -38 h3 l-1.5 -8 Z" />
        </g>
        <g id="chhatriF">
          <path d="M -13 -16 C -13 -24 -6 -27 0 -27 C 6 -27 13 -24 13 -16 L -13 -16 Z" />
          <path d="M -1.2 -27 h2.4 l-1.2 -6 Z" />
          <rect x="-12" y="-16" width="3" height="16" />
          <rect x="9" y="-16" width="3" height="16" />
          <rect x="-15" y="-17" width="30" height="3" rx="1.5" />
        </g>
      </defs>
      <g fill="#c99a63" opacity="0.5">
        <path d="M0 420 V310 H80 V260 H180 V310 H260 V240 H380 V310 H480 V220 H640 V310 H720 V244 H840 V310 H920 V258 H1020 V310 H1200 V420 Z" />
        <use href="#domeF" x="130" y="260" />
        <use href="#domeF" x="320" y="240" />
        <use href="#domeF" x="530" y="220" />
        <use href="#domeF" x="590" y="220" />
        <use href="#domeF" x="780" y="244" />
        <use href="#domeF" x="970" y="258" />
        <use href="#chhatriF" x="220" y="310" />
        <use href="#chhatriF" x="440" y="310" />
        <use href="#chhatriF" x="690" y="310" />
        <use href="#chhatriF" x="880" y="310" />
        <use href="#chhatriF" x="1080" y="310" />
      </g>
    </svg>
  )
}

function PalaceNear() {
  return (
    <svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice">
      <defs>
        <g id="domeN">
          <path d="M -22 0 C -33 -9 -33 -26 -18 -36 C -8 -42 -4 -43 0 -52 C 4 -43 8 -42 18 -36 C 33 -26 33 -9 22 0 Z" />
          <path d="M -2 -51 h4 l-2 -11 Z" />
        </g>
        <g id="chhatriN">
          <path d="M -17 -22 C -17 -33 -8 -37 0 -37 C 8 -37 17 -33 17 -22 L -17 -22 Z" />
          <path d="M -1.6 -37 h3.2 l-1.6 -8 Z" />
          <rect x="-16" y="-22" width="4" height="22" />
          <rect x="12" y="-22" width="4" height="22" />
          <rect x="-20" y="-23" width="40" height="4" rx="2" />
        </g>
      </defs>
      <g fill="#8a5a33">
        <path d="M0 360 V250 H60 V200 H200 V250 H300 V170 H460 V250 H560 V150 H760 V250 H860 V176 H1010 V250 H1090 V210 H1200 V360 Z" />
        <use href="#domeN" x="130" y="200" />
        <use href="#domeN" x="345" y="170" />
        <use href="#domeN" x="415" y="170" />
        <use href="#domeN" x="620" y="150" />
        <use href="#domeN" x="700" y="150" />
        <use href="#domeN" x="935" y="176" />
        <use href="#chhatriN" x="250" y="250" />
        <use href="#chhatriN" x="510" y="250" />
        <use href="#chhatriN" x="810" y="250" />
        <use href="#chhatriN" x="1050" y="250" />
        <use href="#chhatriN" x="1150" y="210" />
        <g opacity="0.8" fill="#5e3a1e">
          <path d="M96 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M156 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M346 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M406 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M616 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M676 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M896 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M956 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M1110 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
          <path d="M1160 288 a14 16 0 0 1 28 0 v34 h-28 Z" />
        </g>
      </g>
    </svg>
  )
}
