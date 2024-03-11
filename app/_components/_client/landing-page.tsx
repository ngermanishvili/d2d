"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";

import Image from "next/image";

import TopText from "./hero-top-text";

import useBillboardData from "@/hooks/use-billboard-data";
import BillBoardUi from "@/components/billboard/billboard-ui";
import LatestBlogPosts from "./blog-posts";
import useLandingPageData from "@/hooks/use-landing-info";

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { imageUrl, loading, label } = useBillboardData();
  const {
    title,
    loading2,
    description,
    imageUrl2,
    panjara1Title,
    panjara1Description,
    panjara2Title,
    panjara2Description,
    panjara3Title,
    panjara3Description,
    InformationText,
  } = useLandingPageData();

  return (
    <>
      <div>
        <div className="relative pt-16 pb-32  content-center items-center justify-center min-h-screen-75">
          <div className="mt-[20px] max-w-[1500px] mx-auto w-full bg-center ">
            <BillBoardUi label={label} imageUrl={imageUrl} loading={loading} />
          </div>
          <div className="relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl"></h1>
                  <p className="mt-4 text-lg text-blueGray-200"></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TopText />

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="mx-auto ">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto h-[250px]">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black">
                      <TbTruckDelivery />
                    </div>
                    <h6 className="text-xl font-semibold">{panjara1Title}</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {panjara1Description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto h-[250px]">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <TbTruckDelivery />
                    </div>
                    <h6 className="text-xl font-semibold">{panjara2Title}</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      {panjara2Description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto h-[250px]">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <TbTruckDelivery />
                    </div>
                    <h6 className="text-xl font-semibold">{panjara3Title}</h6>
                    <div>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        {panjara3Description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-28">
              <div className="w-full md:w-5/12 px-4 mb-[100px]  ml-auto">

                <div className="flex gap-4 mb-4">
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    {title}
                  </h3>
                  <div className="text-blueGray-500  text-center inline-flex items-center justify-center w-12 h-12 mb-6 shadow-lg rounded-full bg-white">
                    <TbTruckDelivery />
                  </div>
                </div>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  {description}
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <Image
                    alt="..."
                    width={600}
                    height={600}
                    src={imageUrl2}
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

        <div className="max-w-[800px] w-full h-[4px] bg-red-500 flex justify-between items-end relative"></div>

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
      </div>
    </>
  );
}
