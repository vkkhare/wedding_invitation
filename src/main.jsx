import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { resolveSide } from './content.js'
import './styles.css'

/* One bundle, two invitations: the groom's at the root, the bride's at
   /bride/ — bride/index.html loads this same script and the URL decides
   which side of the family is speaking. */
const side = resolveSide(window.location)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App side={side} />
  </React.StrictMode>,
)
