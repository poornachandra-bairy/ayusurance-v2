'use client';

import { useState } from 'react';
import CinematicLoader from './components/CinematicLoader';
import HeroSection from './components/HeroSection';
import HomeFooter from './components/HomeFooter';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';

const HomeContainer = () => {
  const [loaderDone, setLoaderDone] = useState(false);
  const refs = useHeroAnimation(loaderDone);

  return (
    <>
      {!loaderDone && (
        <CinematicLoader onComplete={() => setLoaderDone(true)} />
      )}
      <HeroSection {...refs} />
      <HomeFooter />
    </>
  );
};

export default HomeContainer;
