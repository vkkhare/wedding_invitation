import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import Invocation from './components/Invocation.jsx'
import Couple from './components/Couple.jsx'
import Countdown from './components/Countdown.jsx'
import Events from './components/Events.jsx'
import Family from './components/Family.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const done = () => setTimeout(() => setLoaded(true), 700)
    if (document.readyState === 'complete') done()
    else window.addEventListener('load', done, { once: true })
    const safety = setTimeout(() => setLoaded(true), 3200)
    return () => clearTimeout(safety)
  }, [])

  return (
    <>
      <div className={`loader${loaded ? ' is-done' : ''}`} aria-hidden="true">
        <img src="assets/monogram.png" alt="" className="loader__mark" />
        <p className="loader__text">
          Varun <span>weds</span> Prarita
        </p>
      </div>
      <Hero />
      <main>
        <Invocation />
        <Couple />
        <Countdown />
        <Events />
        <Family />
        <Footer />
      </main>
    </>
  )
}
