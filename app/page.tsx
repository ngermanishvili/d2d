"use client"
import { useState, useEffect } from 'react';
import Hero from './_components/_client/hero';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && <Hero />}
    </>
  );
}
