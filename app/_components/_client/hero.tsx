"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import Background from '@/assets/images/courier-hero.png'
import Background2 from '@/assets/images/courier-hero-2.png'
import TrackingSearchContainer from "./tracking-search";
import useBillboardData from '@/hooks/use-billboard-data';
import BillBoardUi from "@/components/billboard/billboard-ui";
import Banner from "./banner";
import TopText from "./hero-top-text";
import Features from "./features";
import Landing from "./landing-page";
import LatestBlogPosts from "./blog-posts";



export const Hero = () => {

    return (
        <>

            <div className="relative min-h-screen w-full">
                <div className="grid !min-h-[30rem] px-8">
                    <Landing />
                    <Banner />
                </div>
            </div>
        </>
    );
}
export default Hero;
