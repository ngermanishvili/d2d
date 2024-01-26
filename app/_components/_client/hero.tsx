"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import Background from '@/assets/images/courier-hero.png'
import Background2 from '@/assets/images/courier-hero-2.png'
import TrackingSearchContainer from "./tracking-search";
import useBillboardData from '@/hooks/use-billboard-data';
import BillBoardUi from "@/components/billboard/billboard-ui";



export const Hero = () => {
    const { imageUrl, loading, label } = useBillboardData();

    return (
        <div className="relative min-h-screen w-full">
            <header className="grid !min-h-[30rem] bg-black px-8">
                <BillBoardUi label={label} imageUrl={imageUrl} loading={loading} />

                <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
                    <div className="col-span-1">
                        {/* <Typography placeholder='' variant="h1" color="white" className="mb-4">
                            D2D <br /> Fastest Delivery
                        </Typography>
                        <Typography
                            placeholder=''
                            variant="lead"
                            className="mb-7 !text-white md:pr-16 xl:pr-28"
                        >
                            D2D is a fast, easy, and reliable way to get anything you want delivered in minutes.
                        </Typography>
                        <Typography placeholder=''
                            className="mb-4" color="white" variant="h6">
                            Get the app
                        </Typography> */}
                        {/* <div className="flex flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">
                            <Button
                                placeholder=''
                                size="lg"
                                color="white"
                                className="flex justify-center items-center gap-3"
                            >
                                <Image
                                    width={256}
                                    height={256}
                                    src="/assets/images/d2d.jpg"
                                    alt="metamask"
                                    className="w-6 h-6"
                                />
                                შესვლა
                            </Button>
                            <Button
                                placeholder=''

                                size="lg"
                                color="white"
                                className="flex justify-center items-center gap-3"
                            >
                                <Image
                                    width={256}
                                    height={256}
                                    src="/assets/images/d2d.jpg"
                                    alt="metamask"
                                    className="w-6 h-6"
                                />
                                რეგისტრაცია
                            </Button>
                        </div> */}
                    </div>
                    {/* <Image
                        width={600}
                        height={400}
                        src={Background}
                        alt="team work"
                        className=" object-fill col-span-1 my-20 h-full max-h-[30rem] -translate-y-32 md:max-h-[36rem] lg:my-0 lg:ml-auto lg:max-h-[40rem] lg:translate-y-0"
                    /> */}
                </div>
            </header>
            <div className="mx-8 lg:mx-16 -mt-14 rounded-xl bg-white p-5 md:p-14 shadow-md ">
                <div>
                    <Typography placeholder=''
                        variant="h3" color="blue-gray" className="mb-3">
                        ადევნე თვალი შენს ამანათს
                    </Typography>
                    <TrackingSearchContainer />

                </div>
            </div>
        </div>
    );
}
export default Hero;
