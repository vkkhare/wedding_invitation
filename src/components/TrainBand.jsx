import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/* Full-bleed storytelling band: the journey home — Lucknow to Bhopal.
   The image drifts slightly against the scroll for depth. */
export default function TrainBand() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="train-band" ref={ref} aria-label="Lucknow to Bhopal — the journey home">
      <motion.img
        src="/assets/train.webp"
        alt="Bride and groom reaching for each other beside a Lucknow to Bhopal railway carriage"
        loading="lazy"
        style={reduce ? undefined : { y }}
      />
    </section>
  )
}
