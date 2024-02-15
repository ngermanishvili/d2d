import React from "react";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa";
import { FaTruckArrowRight } from "react-icons/fa6";
import Image from "next/image";
import TeamImage from '@/assets/images/avatar1.jpg'



import Features from "./features";
import TrackingSearchContainer from "./tracking-search";
import TopText from "./hero-top-text";

import useBillboardData from '@/hooks/use-billboard-data';
import BillBoardUi from "@/components/billboard/billboard-ui";
import LatestBlogPosts from "./blog-posts";



export default function Landing() {

    const { imageUrl, loading, label } = useBillboardData();
    return (
        <>
            <div>
                <div className="relative pt-16 pb-32  content-center items-center justify-center min-h-screen-75">
                    <div className="mt-[20px] max-w-[1500px] mx-auto w-full bg-center ">
                        <BillBoardUi label={label} imageUrl={imageUrl} loading={loading} />

                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                    <h1 className="text-white font-semibold text-5xl">

                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200">

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <TopText />


                <section className="pb-20 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                            <TbTruckDelivery />

                                        </div>
                                        <h6 className="text-xl font-semibold">რას გთავაზობს D2D?</h6>
                                        <div>
                                            <p className="mt-2 mb-4 text-blueGray-500">
                                                სანდო სერვისი, სწრაფი მიწოდება, მარტივი გადახდა, კურიერებზე მორგებული ფასები
                                            </p>
                                            <Link href="/about">გაიგე მეტი ჩვენს შესახებ</Link>
                                        </div>

                                    </div>
                                </div>

                            </div>



                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black">
                                            <TbTruckDelivery />

                                        </div>
                                        <h6 className="text-xl font-semibold">რას გთავაზობს D2D?</h6>
                                        <div>
                                            <p className="mt-2 mb-4 text-blueGray-500">
                                                სანდო სერვისი, სწრაფი მიწოდება, მარტივი გადახდა, კურიერებზე მორგებული ფასები
                                            </p>
                                            <Link href="/about">გაიგე მეტი ჩვენს შესახებ</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                            <TbTruckDelivery />

                                        </div>
                                        <h6 className="text-xl font-semibold">რას გთავაზობს D2D?</h6>
                                        <div>
                                            <p className="mt-2 mb-4 text-blueGray-500">
                                                სანდო სერვისი, სწრაფი მიწოდება, მარტივი გადახდა, კურიერებზე მორგებული ფასები
                                            </p>
                                            <Link href="/about">გაიგე მეტი ჩვენს შესახებ</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center mt-32">
                            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                                    <TbTruckDelivery />

                                </div>
                                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                                    Working with us is a pleasure
                                </h3>
                                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                                    Don&apos;t let your uses guess by attaching tooltips and popoves to
                                    any element. Just make sure you enable them first via
                                    JavaScript.
                                </p>
                                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                                    The kit comes with three pre-built pages to help you get
                                    started faster. You can change the text and images and you&apos;re
                                    good to go. Just make sure you enable them first via
                                    JavaScript.
                                </p>
                                <Link href="/">
                                    <p className="font-bold text-blueGray-700 mt-8">
                                        Check Notus NextJS!
                                    </p>
                                </Link>
                            </div>

                            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                                    <Image
                                        alt="..."
                                        width={600}
                                        height={600}
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                                        className="w-full align-middle rounded-t-lg"
                                    />
                                    <blockquote className="relative p-8 mb-4">
                                        <svg
                                            preserveAspectRatio="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 583 95"
                                            className="absolute left-0 w-full block h-95-px -top-94-px"
                                        >
                                            <polygon
                                                points="-30,95 583,95 583,65"
                                                className="text-blueGray-700 fill-current"
                                            ></polygon>
                                        </svg>
                                        <h4 className="text-xl font-bold text-white">
                                            Top Notch Services
                                        </h4>
                                        <p className="text-md font-light mt-2 text-white">
                                            The Arctic Ocean freezes every winter and much of the
                                            sea-ice then thaws every summer, and that process will
                                            continue whatever happens.
                                        </p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-[800px] w-full h-[4px] bg-red-500 flex justify-between items-end relative">
                </div>

                <LatestBlogPosts />

                <section className="pb-20 relative block bg-blueGray-800">
                    <div
                        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-800 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>

                </section>

            </div >
        </>
    );
}
