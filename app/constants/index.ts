// ─── Site ────────────────────────────────────────────────────────────────────
export const SITE_NAME = 'Ayusurance';

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_CTA_LABEL = 'Book Consultation';

export const NAV_LINKS = [
  { label: 'Home',            href: '/'                },
  { label: 'About',           href: '/about'           },
  { label: 'Offerings',       href: '/offerings'       },
  { label: 'Patient Journey', href: '/patient-journey' },
  { label: 'Contact',         href: '/contact'         },
] as const;

// ─── Home — Hero ─────────────────────────────────────────────────────────────
export const HOME_HERO_HEADLINE_LINE1 = 'Ancient Wisdom';
export const HOME_HERO_HEADLINE_LINE2 = 'Modern Assurance';
export const HOME_HERO_BODY =
  'Ayusurance connects you with certified Ayurvedic practitioners worldwide, offering personalised teleconsultations, concierge services, and holistic wellness solutions.';
export const HOME_HERO_CTA_PRIMARY   = 'Begin Your Wellness Journey';
export const HOME_HERO_CTA_SECONDARY = 'Explore Our Offerings';

// ─── Home — Final CTA overlay ────────────────────────────────────────────────
export const HOME_FINAL_HEADING = 'Begin Your Wellness Journey';
export const HOME_FINAL_BODY    = 'Connect with certified Ayurvedic practitioners and experience the transformative power of ancient healing wisdom.';
export const HOME_FINAL_CTA     = 'Explore Patient Journey';

// ─── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER_COPYRIGHT   = '© 2024 Ayusurance. All rights reserved.';
export const FOOTER_CREDIT_TEXT = 'Designed and developed by';
export const FOOTER_CREDIT_LINK = '@aghoralabs.com';
export const FOOTER_CREDIT_HREF = '#';

// ─── Patient Journey page ────────────────────────────────────────────────────
export const JOURNEY_EYEBROW      = '8 Steps · Your Healing Path';
export const JOURNEY_HEADLINE_L1  = 'Your Healing';
export const JOURNEY_HEADLINE_L2  = 'Journey';
export const JOURNEY_SUBHEAD      = 'Scroll to travel through your path — each step approached from a different angle.';
export const JOURNEY_SCROLL_LABEL = 'Scroll to begin';
export const JOURNEY_HINT_LABEL   = 'Scroll to journey';

export const JOURNEY_HUD_BRAND = 'Ayusurance · Patient Journey';
export const JOURNEY_HUD_STEP  = 'Step';

export const JOURNEY_CTA_EYEBROW  = 'Begin Today';
export const JOURNEY_CTA_HEADLINE = 'Take Your First Step';
export const JOURNEY_CTA_BODY     = 'Your path to complete wellness begins with a single moment of intention. Our Vaidyas are ready to guide you.';
export const JOURNEY_CTA_LABEL    = 'Start Registration';
export const JOURNEY_CTA_HREF     = '/';
export const JOURNEY_CTA_FOOTER   = '© 2024 Ayusurance · Ancient Wisdom Modern Assurance';

// ─── Loader ──────────────────────────────────────────────────────────────────
export const LOADER_BRAND_AYU     = 'ayu';
export const LOADER_BRAND_SUFFIX  = 'surance';
export const LOADER_TAGLINE       = 'Ancient Wisdom\u00a0·\u00a0Modern Assurance';

// ─── Shlokas ─────────────────────────────────────────────────────────────────
export interface ShlokaData {
  text: string;
  line2: string;
  attr: string;
}

export const SHLOKAS: ShlokaData[] = [
  {
    text:  'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् |',
    line2: 'मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते',
    attr:  'Charaka Samhita\u00a0·\u00a01.41',
  },
  {
    text:  'समदोषः समाग्निश्च समधातुमलक्रियः ।',
    line2: 'प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते',
    attr:  'Sushruta Samhita\u00a0·\u00a015.41',
  },
];

// Keep named exports for any code that still references them directly
export const SHLOKA_1_TEXT = SHLOKAS[0].text;
export const SHLOKA_1_LINE2 = SHLOKAS[0].line2;
export const SHLOKA_1_ATTR  = SHLOKAS[0].attr;
export const SHLOKA_2_TEXT  = SHLOKAS[1].text;
export const SHLOKA_2_LINE2 = SHLOKAS[1].line2;
export const SHLOKA_2_ATTR  = SHLOKAS[1].attr;
