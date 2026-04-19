'use client';

import { useState } from 'react';
import CinematicLoader from './components/CinematicLoader';
import Navbar from './components/Navbar';
import HeroSection from './components/home/HeroSection';
import HomeFooter from './components/HomeFooter';
import { useHeroAnimation } from './hooks/useHeroAnimation';

const Home = () => {
  const [loaderDone, setLoaderDone] = useState(false);
  const refs = useHeroAnimation(loaderDone);

  return (
    <>
      {!loaderDone && (
        <CinematicLoader onComplete={() => setLoaderDone(true)} />
      )}

      <Navbar />
      <HeroSection {...refs} />
      <HomeFooter />
    </>
  );
};

export default Home;
