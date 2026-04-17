export type JourneyStep = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  accentColor: string;
  accentLight: string;
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    tag: 'Step 01 · Begin Your Path',
    title: 'Registration',
    subtitle: 'Effortless Entry, Intelligent Matching',
    desc: 'Book your slot effortlessly — practitioner-agnostic, language-aware, and built around your schedule. Our system intelligently matches you to the right Vaidya based on your constitution, language, and availability.',
    image: '/cards/1-registration.jpg',
    accentColor: '#7a9e7e',
    accentLight: 'rgba(122,158,126,0.12)',
  },
  {
    id: 2,
    tag: 'Step 02 · A Personal Touch',
    title: 'Doctor Invitation',
    subtitle: 'Your Vaidya Reaches Out',
    desc: 'A qualified Vaidya reviews your request and dispatches a personalised intake questionnaire, crafted to reveal your unique Prakriti and complete health history before you ever meet.',
    image: '/cards/2-invitation.jpg',
    accentColor: '#a8843e',
    accentLight: 'rgba(168,132,62,0.12)',
  },
  {
    id: 3,
    tag: 'Step 03 · Your Story, Heard',
    title: 'Health Profile',
    subtitle: 'A Portrait of Your Whole Self',
    desc: 'Complete your comprehensive questionnaire and securely upload lab reports. Every nuance of your health portrait — body, mind, spirit — helps our practitioners understand you holistically and precisely.',
    image: '/cards/3-data-entry.jpg',
    accentColor: '#5a8870',
    accentLight: 'rgba(90,136,112,0.12)',
  },
  {
    id: 4,
    tag: 'Step 04 · Ancient Wisdom Applied',
    title: 'Initial Screening',
    subtitle: 'Root Cause, Not Symptoms',
    desc: 'Our practitioners perform an initial analysis alongside constitutional and astrological assessments guided by classical Ayurvedic texts, identifying the root cause of imbalance rather than surface symptoms.',
    image: '/cards/4-screening.jpg',
    accentColor: '#6a5878',
    accentLight: 'rgba(106,88,120,0.12)',
  },
  {
    id: 5,
    tag: 'Step 05 · On Your Terms',
    title: 'Consultation Scheduling',
    subtitle: 'Zero Friction, Pure Intention',
    desc: 'A virtual consultation is scheduled based on mutual availability — flexible across time zones, calendar-integrated, and designed for zero friction between you and your path to healing.',
    image: '/cards/5-scheduling.jpg',
    accentColor: '#4a7858',
    accentLight: 'rgba(74,120,88,0.12)',
  },
  {
    id: 6,
    tag: 'Step 06 · Face-to-Face Healing',
    title: 'Virtual Consultation',
    subtitle: 'Prakriti & Vikriti in Depth',
    desc: 'Connect with your Vaidya for a comprehensive 30-minute session covering medical history, lifestyle, diet, sleep patterns, and a deep Prakriti and Vikriti analysis — all from the comfort of your home.',
    image: '/cards/6-teleconsul.jpg',
    accentColor: '#3a6878',
    accentLight: 'rgba(58,104,120,0.12)',
  },
  {
    id: 7,
    tag: 'Step 07 · Sacred Therapies',
    title: 'In-Person Treatment',
    subtitle: 'Panchakarma & Classical Healing',
    desc: 'For those eligible following assessment, schedule a physical visit for Panchakarma, Rasayana, or specialised treatments at a vetted, accredited Ayurvedic centre near you.',
    image: '/cards/7-treatment.jpg',
    accentColor: '#786040',
    accentLight: 'rgba(120,96,64,0.12)',
  },
  {
    id: 8,
    tag: 'Step 08 · The Journey Continues',
    title: 'Ongoing Support',
    subtitle: 'Season by Season, Always With You',
    desc: 'Regular virtual follow-ups monitor your progress, refine treatment plans, and keep your path to complete wellness on course — season by season, as your health and constitution evolve.',
    image: '/cards/8-followups.jpg',
    accentColor: '#5a8870',
    accentLight: 'rgba(90,136,112,0.12)',
  },
];
