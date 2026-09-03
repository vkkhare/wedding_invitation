import { useCallback, useState } from 'react'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import Invocation from './components/Invocation.jsx'
import Couple from './components/Couple.jsx'
import Countdown from './components/Countdown.jsx'
import Events from './components/Events.jsx'
import Venue from './components/Venue.jsx'
import Family from './components/Family.jsx'
import TrainBand from './components/TrainBand.jsx'
import Footer from './components/Footer.jsx'
import Music from './components/Music.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])
  /* the theme steps back while Inaya's message is playing */
  const [voiceNote, setVoiceNote] = useState(false)

  return (
    <>
      {!introDone && <Intro onDone={finishIntro} />}
      <Hero started={introDone} />
      <main>
        <Invocation />
        <Couple />
        <Countdown />
        <Events />
        <Venue />
        <Family onVoiceNote={setVoiceNote} />
        <TrainBand />
        <Footer />
      </main>
      <Music ducked={voiceNote} />
    </>
  )
}
