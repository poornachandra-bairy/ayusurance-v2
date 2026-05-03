export const ORBIT_RADIUS = 230;
export const CARD_RADIUS  = 268;

export const TEXT_ENTER     = 0.0;
export const RISHI_ENTER    = 0.35;
export const DOSHA_ENTRANCE = [1.0, 1.5, 2.0] as const;
export const ENTRANCE_DONE  = 2.8;

export const BHUTAS = [
  { id: 'akasha', src: '/akasha.png', alt: 'Akasha', targetAngleDeg: -90,  startDy: -130, cardOffsetY: 0  },
  { id: 'vayu',   src: '/vayu.png',   alt: 'Vayu',   targetAngleDeg: -18,  startDy: -65,  cardOffsetY: 55 },
  { id: 'agni',   src: '/agni.png',   alt: 'Agni',   targetAngleDeg:  54,  startDy:   0,  cardOffsetY: 0  },
  { id: 'jala',   src: '/jala.png',   alt: 'Jala',   targetAngleDeg: 126,  startDy:  65,  cardOffsetY: 0  },
  { id: 'bhumi',  src: '/bhumi.png',  alt: 'Bhumi',  targetAngleDeg: 198,  startDy:  130, cardOffsetY: 55 },
] as const;

export const DOSHAS = [
  { id: 'kapha', src: '/kapha.png', alt: 'Kapha' },
  { id: 'pitta', src: '/pitta.png', alt: 'Pitta' },
  { id: 'vata',  src: '/vata.png',  alt: 'Vata'  },
] as const;

export const CARD_COLORS: Record<string, string> = {
  // ALL must be the neumorphic base color — shadows do the differentiation
  akasha: '#4A7055',
  vayu:   '#4A7055',
  agni:   '#4A7055',
  jala:   '#4A7055',
  bhumi:  '#4A7055',
};

export const CARD_ACCENTS: Record<string, string> = {
  akasha: '#C49050',    // amber — accent divider line
  vayu:   '#A8C890',    // sage green — air
  agni:   '#E8884A',    // warm orange — fire
  jala:   '#6AACCC',    // blue-green — water
  bhumi:  '#C0A06A',    // earthy gold — earth
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
