"use client";

import React from "react";
import {
    Button,
    Typography,
    Card,
    CardBody,
} from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import BlogPostCard from "./blog-post-card";
import AvatarImage from "@/assets/images/avatar1.jpg";
import AvatarImage2 from "@/assets/images/avatar2.jpg";
import AvatarImage3 from "@/assets/images/avatar3.jpg";

const BLOG_POSTS = [
    {
        img: AvatarImage,
        title: "Hydrogen-Powered Vehicles",
        desc: "This article delves into the cutting-edge technology behind hydrogen fuel cells and their environmental benefits.",
    },
    {
        img: AvatarImage2,
        title: "Mental Health in the Digital Age",
        desc: "This article explores the intricate relationship between social media usage and mental health",
    },
    {
        img: AvatarImage3,
        title: "Mars Colonization and Beyond",
        desc: "This article takes readers on a journey through the latest developments in space exploration.",
    },
];

export function LatestBlogPosts() {
    return (
        <section className="py-40 px-8">
            <div className="container mx-auto mb-12">
                <Typography placeholder="" variant="h3" color="blue-gray">
                    Check my latest blog posts
                </Typography>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {BLOG_POSTS.map((props, idx) => (
                    <BlogPostCard key={idx} {...props} />
                ))}
                <Card
                    placeholder=""
                    className="relative grid h-full w-full place-items-center overflow-hidden
            bg-black"
                >
                    <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
                    <CardBody placeholder="" className="relative w-full">
                        <Typography placeholder="" variant="h3" className="mt-4" color="white">
                            Discover all my articles
                        </Typography>
                        <Typography placeholder="" color="white" className="py-4 font-normal">
                            I am a versatile writer who explores a wide range of genres and
                            topics.
                        </Typography>
                        <Button
                            placeholder=""
                            variant="text"
                            color="white"
                            className="flex items-center gap-2"
                        >
                            read more
                            <ArrowRightIcon
                                strokeWidth={3}
                                className="h-3.5 w-3.5 text-white"
                            />
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}


export default LatestBlogPosts;