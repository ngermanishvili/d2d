"use client";

import React from "react";
import Image from "next/image";
import InfoCard from "@/app/_components/_client/info-card"
import { Typography, Card, CardBody } from "@material-tailwind/react";
import CourierLogo from '@/assets/images/courier-hero-2.png'

const OPTIONS = [
    {
        title: "100",
        description: "Test",
    },
    {
        title: "500+",
        description: "Test",
    },
    {
        title: "24/7",
        description: "Test",
    },
    {
        title: "5/5",
        description: "Test",
    },
];

export function AboutHome() {
    return (
        <section className="py-20 px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                <Image
                    width={300}
                    height={150}
                    src={CourierLogo}
                    className="col-span-1 w-1/2 mx-auto lg:w-10/12"
                    alt="iphone-photo"
                />
                <div className="col-span-1 mx-auto max-w-lg px-4 lg:px-0">
                    <Typography placeholder="" variant="h2" color="red" className="mb-4">
                        D2D
                    </Typography>
                    <Typography
                        placeholder=""
                        variant="lead"
                        className="mb-5 px-4 text-left  text-xl !text-gray-500 lg:px-0  "
                    >
                        ყველაზე სწრაფი მიწოდება თბილისის მაშტაბით
                    </Typography>

                    <div className="col-span-2 grid gap-5 grid-cols-2 ">
                        {OPTIONS.map(({ title, description }) => (
                            <InfoCard key={title} title={title}>
                                {description}
                            </InfoCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AboutHome;
