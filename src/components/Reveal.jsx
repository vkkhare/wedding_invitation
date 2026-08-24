import { motion, useReducedMotion } from 'framer-motion'

/* Scroll-triggered reveal. `as` picks the rendered tag (p, h2, figure, …). */
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
