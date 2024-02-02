"use client"
import { useState, useEffect } from 'react';
import Hero from './_components/_client/hero';
import LoadingSpinner from './_components/_client/loading-spinner';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsClient(true);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isClient && <Hero />
      )}
    </>
  );
}
