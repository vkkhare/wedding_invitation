import { createContext, useContext } from 'react'

/* Every word that differs between the two sides of the family lives here.

   The same invitation is served twice: the groom's at the domain root, and
   the bride's at /bride/ (bride/index.html, the same bundle — main.jsx reads
   the side off the URL). The wedding itself is shared, so the venue, the
   countdown, the artwork, the music and the envelope that opens it all are
   identical; what changes is the voice the invitation is written in — whose
   home is inviting you, whose parents host, whose name is read first. */

/* One wedding, one schedule — only the baraat line is written from where each
   family is standing, so it is added per side below. */
const SHUBH_RASMEIN = ['Lagun · 9:00 am', 'Bhat · 10:00 am', 'Haldi & Tel · 2:00 pm']
const BIG_DAY = ['Jaimala · 4:00 pm', 'Phere · 5:45 pm', 'Reception & Dinner · 8:00 pm']

const THANKS =
  'Thank you for being part of our journey. Your presence at the wedding celebrations will ' +
  'enhance the joy of the occasion and add blessings to this happy union.'

const wa = (text) => `https://wa.me/917898527805?text=${encodeURIComponent(text)}`

export const GROOM = {
  key: 'groom',
  /* the envelope card, and the order the names are read in */
  names: ['Varun', 'Prarita'],
  title: 'Varun weds Prarita — 26 November 2026',

  /* Ma's blessing over the hero */
  poem: {
    lines: [
      'आज इस आंगन में एक नई किरण उतरी है',
      'जैसे दुआओं की चादर घर पे बिखरी है',
    ],
    sign: '— माँ',
  },

  /* the invocation: the elders blessed, the hosts inviting */
  blessings: 'Late Shri K. B. Khare & Late Smt. Tara Khare',
  hosts: 'Dr. Shobha Khare & Dr. Abhay Khare',
  child: 'son',

  couple: [
    { name: 'Varun', parent: 'Son of Dr. Shobha & Dr. Abhay Khare' },
    { name: 'Prarita', parent: 'Daughter of Shri Prakash Chandra Agrawal & Smt. Shalini Agrawal' },
  ],

  shubhRasmein: SHUBH_RASMEIN,
  bigDay: ['Baraat Prasthan · 2:00 pm', ...BIG_DAY],

  thanks: THANKS,
  specialRequest: {
    head: 'Special Request',
    names: ['Abhinav', 'Kratika'],
    little: 'Mama’s little girl — Inaya',
    voiceNote: '/assets/inaya-message.mp3',
  },
  rsvp: {
    whatsapp: wa(
      'Namaste! We would be delighted to join the wedding celebrations of Varun & Prarita.',
    ),
    phones: [
      { tel: '+917898527805', label: '78985 27805' },
      { tel: '+919611942479', label: '96119 42479' },
    ],
  },

  hashtag: '#VarunWedsPrarita',
  madeBy: 'the Khare family',
}

export const BRIDE = {
  key: 'bride',
  names: ['Prarita', 'Varun'],
  title: 'Prarita weds Varun — 26 November 2026',

  /* A mother's blessing, from this side of the courtyard. Written to mirror
     the groom-side couplet — replace it with Ma's own words when she has them. */
  poem: {
    lines: [
      'आज इस आंगन से एक किरण विदा होती है',
      'दुआओं की चादर उसके संग-संग चलती है',
    ],
    sign: '— माँ',
  },

  /* TODO(family): the bride's grandparents, to be blessed by name as the groom
     side does. Until they are filled in, the invocation simply leaves the line
     out rather than carrying a placeholder. */
  blessings: null,
  hosts: 'Shri Prakash Chandra Agrawal & Smt. Shalini Agrawal',
  child: 'daughter',

  couple: [
    { name: 'Prarita', parent: 'Daughter of Shri Prakash Chandra Agrawal & Smt. Shalini Agrawal' },
    { name: 'Varun', parent: 'Son of Dr. Shobha & Dr. Abhay Khare' },
  ],

  shubhRasmein: SHUBH_RASMEIN,
  /* the baraat arrives here rather than departing; add the aagman time to this
     list once it is fixed */
  bigDay: BIG_DAY,

  thanks: THANKS,
  /* TODO(family): the bride's siblings, and a voice note of their own if they
     record one. Left out until then — the block is skipped, not blanked. */
  specialRequest: null,
  /* TODO(family): the bride's side RSVP numbers. These are the Khare family's
     numbers, standing in so the button always reaches someone. */
  rsvp: {
    whatsapp: wa(
      'Namaste! We would be delighted to join the wedding celebrations of Prarita & Varun.',
    ),
    phones: [
      { tel: '+917898527805', label: '78985 27805' },
      { tel: '+919611942479', label: '96119 42479' },
    ],
  },

  hashtag: '#PraritaWedsVarun',
  madeBy: 'the Agrawal family',
}

/* The side is chosen once, at the entry point, and read from anywhere below. */
export const SideContext = createContext(GROOM)
export const useSide = () => useContext(SideContext)

/* /bride (or /bride/, or under a repo subpath) is the bride's invitation;
   everything else is the invitation as it has always been. */
export function sideForPath(pathname) {
  const path = pathname.replace(/\/(index\.html)?$/, '')
  return path.endsWith('/bride') ? BRIDE : GROOM
}

/* ?side=bride / ?side=groom forces a side wherever the page happens to be
   served from — the single-file preview, a local file, a staging host. The
   URL still decides when nothing is asked for. */
export function resolveSide({ pathname, search = '' }) {
  const forced = new URLSearchParams(search).get('side')
  if (forced === 'bride') return BRIDE
  if (forced === 'groom') return GROOM
  return sideForPath(pathname)
}
