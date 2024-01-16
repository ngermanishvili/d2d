"use client"

import useBillboardData from '@/hooks/use-billboard-data';
import BillBoardUi from "@/components/billboard/billboard-ui";
import HomeLayoutNavigation from "./_components/home-layout-navbar";


export default function Home() {
  const { imageUrl, loading, label } = useBillboardData();

  return (
    <>

      <div className="w-full h-[400px] bg-white mt-50">
        <BillBoardUi label={label} imageUrl={imageUrl} loading={loading} />
      </div>

    </>
  )
}

//