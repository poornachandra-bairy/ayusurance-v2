import type { Metadata } from 'next';
import { Cormorant_Garamond, Courier_Prime, Manrope, Eczar } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import GlobalAtmosphere from './components/GlobalAtmosphere';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});
const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
});

// Eczar — Roman serif co-designed with Devanagari strokes, ideal for Sanskrit-feel English headings
const eczar = Eczar({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sanskrit',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'Ayusurance — Ancient Wisdom Modern Assurance',
  description:
    'Ayusurance connects you with certified Ayurvedic practitioners worldwide, offering personalized teleconsultations, concierge services, and holistic wellness solutions.',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang='en'
  className={`${cormorant.variable} ${manrope.variable} ${courierPrime.variable} ${eczar.variable} antialiased font-body`}
    suppressHydrationWarning
  >
    <body className='min-h-full flex flex-col' suppressHydrationWarning>
      <GlobalAtmosphere />
      <SmoothScroll />
      {children}
    </body>
  </html>
);

export default RootLayout;
