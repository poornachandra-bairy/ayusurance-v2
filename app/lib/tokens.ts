export const ORBIT_RADIUS = 230;
export const CARD_RADIUS  = 268;

export const TEXT_ENTER     = 0.0;
export const RISHI_ENTER    = 0.35;
export const DOSHA_ENTRANCE = [1.0, 1.5, 2.0] as const;
export const ENTRANCE_DONE  = 2.8;

export const BHUTAS = [
  { id: 'akasha', src: '/akasha.png', alt: 'Akasha', targetAngleDeg: -90,  startDy: -90, cardOffsetY: 0  },
  { id: 'vayu',   src: '/vayu.png',   alt: 'Vayu',   targetAngleDeg: -18,  startDy: -90, cardOffsetY: 55 },
  { id: 'agni',   src: '/agni.png',   alt: 'Agni',   targetAngleDeg:  54,  startDy:   0, cardOffsetY: 0  },
  { id: 'jala',   src: '/jala.png',   alt: 'Jala',   targetAngleDeg: 126,  startDy: -45, cardOffsetY: 0  },
  { id: 'bhumi',  src: '/bhumi.png',  alt: 'Bhumi',  targetAngleDeg: 198,  startDy:  90, cardOffsetY: 55 },
] as const;

export const DOSHAS = [
  { id: 'vata',  src: '/vata.png',  alt: 'Vata'  },
  { id: 'pitta', src: '/pitta.png', alt: 'Pitta' },
  { id: 'kapha', src: '/kapha.png', alt: 'Kapha' },
] as const;

export const CARD_COLORS: Record<string, string> = {
  akasha: 'linear-gradient(150deg, #3b3056 0%, #5d4fa3 100%)',
  vayu:   'linear-gradient(150deg, #253e54 0%, #3b7097 100%)',
  agni:   'linear-gradient(150deg, #523528 0%, #87563d 100%)',
  jala:   'linear-gradient(150deg, #1e4840 0%, #2e7060 100%)',
  bhumi:  'linear-gradient(150deg, #463826 0%, #6e5738 100%)',
};

export const CARD_ACCENTS: Record<string, string> = {
  akasha: '#c4b5fd',
  vayu:   '#7dd3fc',
  agni:   '#fdba74',
  jala:   '#6ee7b7',
  bhumi:  '#fbbf24',
};

export const CARD_CONTENT = [
  {
    element: 'Akasha • Space',
    title: 'Teleconsultations',
    desc: 'Online consultations with qualified Ayurvedic doctors for personalised guidance and treatment plans.',
  },
  {
    element: 'Vayu • Air',
    title: 'Concierge Services',
    desc: 'Dedicated support for users to seamlessly access Ayurvedic services and products.',
  },
  {
    element: 'Agni • Fire',
    title: 'Global Directory',
    desc: 'A comprehensive list of Ayurveda Vaidyas, practitioners, hospitals, and centres worldwide.',
  },
  {
    element: 'Jala • Water',
    title: 'Multilingual Support',
    desc: 'Availability in multiple languages for broader accessibility across cultures.',
  },
  {
    element: 'Bhumi • Earth',
    title: 'Expert Network',
    desc: 'A team of experienced Ayurvedic professionals offering consultations and guidance.',
  },
] as const;
