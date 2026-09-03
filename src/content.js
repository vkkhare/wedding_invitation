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
       · specialRequest — her own siblings, and a voice note if they record one
       · bigDay         — reads "Baraat Prasthan"; from here it is the aagman
       · rsvp.phones    — the Khare family's numbers */
  ...GROOM,

  key: 'bride',
  names: ['Prarita', 'Varun'],
  /* her card joins the names in Hindi — Devanagari sets itself on the card */
  weds: 'संग',
  title: 'Prarita weds Varun — 26 November 2026',

  /* Her side opens on the family's own dedication rather than a couplet in one
     voice, so it carries no signature; the last line names the rite and is set
     to carry the weight. */
  poem: {
    lines: [
      'दो आत्माओं का समर्पण, दो परिवारों का स्नेहमय मिलन',
      'और अनगिनत शुभकामनाओं से सजा',
    ],
    closing: 'शुभ पाणिग्रहण संस्कार…',
    sign: null,
  },

  /* Her family invite in their own words, in Hindi, and the passage carries
     what the English blessing, the couple's introduction and the countdown's
     opening line carried on the groom's page — so wherever `invitation` is
     set, it is what those three places say, and the English fields above and
     below it go unread. Each party names itself, the line that follows it, and
     the elders it comes from. */
  invitation: {
    lead: [
      'श्री श्याम प्रभु की असीम कृपा से प्राप्त इस शुभ अवसर पर',
      'हम आपको सपरिवार सादर आमंत्रित करते हैं।',
    ],
    parties: [
      {
        honorific: 'सौभाग्यवती',
        name: 'प्रारिता',
        kin: [
          '(सुपौत्री स्वर्गीय द्रौपदी देवी एवं रामस्वरूप अग्रवाल)',
          '(सुपुत्री श्रीमती शालिनी एवं प्रकाश अग्रवाल)',
        ],
        after: 'का शुभ परिणय',
      },
      {
        honorific: 'चिरंजीव',
        name: 'वरुण',
        kin: ['(सुपुत्र डॉ. शोभा एवं डॉ. अभय खरे)'],
        after: 'के साथ',
      },
    ],
    close: 'शुभ लग्नानुसार सम्पन्न होगा।',
    wish: 'आपकी शुभकामनाएँ एवं शुभाशीष नवयुगल के नवजीवन की अमूल्य निधि होंगे।',
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
