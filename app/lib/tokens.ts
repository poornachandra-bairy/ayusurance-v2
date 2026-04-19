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
    title: 'Virtual Clinic',
    desc: 'Experience borderless healing with highly qualified Ayurvedic Vaidyas. Receive deep, personalized consultations and tailored constitutional treatment plans from the absolute comfort of your own sanctuary.',
  },
  {
    title: 'Care Concierge',
    desc: 'Your dedicated wellness advocate. We provide white-glove, seamless technical and clinical support, guiding you effortlessly toward authentic holistic rejuvenation therapies and premium sourced medicinals.',
  },
  {
    title: 'Global Directory',
    desc: 'Explore the world\'s most comprehensive and rigorously vetted network of elite Ayurveda practitioners, traditional hospitals, and specialized Panchakarma healing sanctuaries across the globe.',
  },
  {
    title: 'Intelligent Matching',
    desc: 'Our advanced system transcends borders and cultures, matching your precise physiological constitution, astrological blueprint, and cultural preferences directly with the perfect authentic healer.',
  },
  {
    title: 'Expert Network',
    desc: 'Join an exclusive ecosystem of internationally acclaimed Ayurvedic researchers, holistic academics, and generational healers actively collaborating to ensure your absolute and complete wellbeing.',
  },
] as const;
