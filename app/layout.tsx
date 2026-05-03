import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Caveat } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import BotanicalBackground from './components/BotanicalBackground';
import { LoaderProvider } from './providers/LoaderProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-handwritten',
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
    className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} antialiased font-body`}
    suppressHydrationWarning
  >
    <body className='min-h-full flex flex-col' suppressHydrationWarning>
      <LoaderProvider>
        <BotanicalBackground />
        <SmoothScroll />
        {children}
      </LoaderProvider>
    </body>
  </html>
);

export default RootLayout;
