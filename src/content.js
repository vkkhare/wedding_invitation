import { createContext, useContext } from 'react'

/* Every word that differs between the two sides of the family lives here.

   The same invitation is served twice: the groom's at the domain root, and
   the bride's at /bride/ (bride/index.html, the same bundle — main.jsx reads
   the side off the URL). The wedding itself is shared, so the venue, the
   countdown, the artwork, the music and the envelope that opens it all are
   identical; what changes is the voice the invitation is written in — whose
   home is inviting you, whose parents host, whose name is read first. */

const wa = (text) => `https://wa.me/917898527805?text=${encodeURIComponent(text)}`

export const GROOM = {
  key: 'groom',
  /* the envelope card, and the order the names are read in */
  names: ['Varun', 'Prarita'],
  /* the word that joins them on the card */
  weds: 'weds',
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

  /* one wedding, one running order — the baraat is the only line that reads
     differently depending on which house you are standing in */
  shubhRasmein: ['Lagun · 9:00 am', 'Bhat · 10:00 am', 'Haldi & Tel · 2:00 pm'],
  bigDay: [
    'Baraat Prasthan · 2:00 pm',
    'Jaimala · 4:00 pm',
    'Phere · 5:45 pm',
    'Reception & Dinner · 8:00 pm',
  ],

  thanks:
    'Thank you for being part of our journey. Your presence at the wedding celebrations will ' +
    'enhance the joy of the occasion and add blessings to this happy union.',
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
  /* The bride's family have not sent every line across yet. Rather than leave
     holes in their invitation, the groom side's words stand in wherever this
     object does not override them — spread first, overridden below — so the
     page reads whole today and each line can be replaced one at a time.

     Still standing in from the groom side, to be replaced when the words come:
       · blessings      — the bride's grandparents, blessed by name
       · specialRequest — her own siblings, and a voice note if they record one
       · bigDay         — reads "Baraat Prasthan"; from here it is the aagman
       · rsvp.phones    — the Khare family's numbers */
  ...GROOM,

  key: 'bride',
  names: ['Prarita', 'Varun'],
  /* her card joins the names in Hindi — Devanagari sets itself on the card */
  weds: 'संग',
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

  hosts: 'Shri Prakash Chandra Agrawal & Smt. Shalini Agrawal',
  child: 'daughter',

  couple: [
    { name: 'Prarita', parent: 'Daughter of Shri Prakash Chandra Agrawal & Smt. Shalini Agrawal' },
    { name: 'Varun', parent: 'Son of Dr. Shobha & Dr. Abhay Khare' },
  ],

  rsvp: {
    ...GROOM.rsvp,
    whatsapp: wa(
      'Namaste! We would be delighted to join the wedding celebrations of Prarita & Varun.',
    ),
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
