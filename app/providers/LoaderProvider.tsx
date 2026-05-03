'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import CinematicLoader from '../components/CinematicLoader';

interface LoaderContextType {
  loaderDone: boolean;
}

const LoaderContext = createContext<LoaderContextType>({ loaderDone: false });

export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <LoaderContext.Provider value={{ loaderDone }}>
      {!loaderDone && <CinematicLoader onComplete={handleComplete} />}
      {children}
    </LoaderContext.Provider>
  );
}
