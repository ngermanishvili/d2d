"use client"

import useBillboardData from '@/hooks/use-billboard-data';
import Hero from './_components/_client/hero';


export default function Home() {
  const { imageUrl, loading, label } = useBillboardData();

  return (
    <>

      <div className="">
        <Hero />
      </div>

    </>
  )
}