"use client"

import useBillboardData from '@/hooks/use-billboard-data';
import BillBoardUi from "@/components/billboard/billboard-ui";
import HomeLayoutNavigation from "./_components/home-layout-navbar";
import TrackingSearchContainer from './_components/_client/tracking-search';
import Hero from './_components/_client/hero';
import Footer from '@/components/ui/footer';
import AboutHome from './_components/_client/about-hero-component';
import Landing from './_components/_client/landing-page';


export default function Home() {
  const { imageUrl, loading, label } = useBillboardData();

  return (
    <>

      <div className="">
        <Hero />
        <Landing />

        <BillBoardUi label={label} imageUrl={imageUrl} loading={loading} />
        <Footer />
      </div>

    </>
  )
}