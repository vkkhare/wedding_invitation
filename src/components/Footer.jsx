import Reveal from './Reveal.jsx'
import { useSide } from '../content.js'

export default function Footer() {
  const { hashtag, madeBy } = useSide()

  return (
    <footer className="footer">
      <Reveal as="img" className="footer__mark" src="/assets/monogram.png" alt="PV monogram" />
      <Reveal as="p" className="footer__hash">{hashtag}</Reveal>
      <Reveal as="p" className="footer__note">Celebrating Love &amp; Happiness · 26.11.2026</Reveal>
      <Reveal as="p" className="footer__made">
        Made with <span aria-hidden="true">♥</span> by {madeBy}
      </Reveal>
    </footer>
  )
}
