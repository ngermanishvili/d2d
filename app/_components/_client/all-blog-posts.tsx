"use client";

import React from "react";
import {
    Button,
    Typography,
    Card,
    CardBody,
} from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AllBlogPostCard from "./all-blog-post-card";
import useBlogPostsData from "@/hooks/use-blogposts-data";



export function AllBlogPosts() {
    const { blogPostsData } = useBlogPostsData();

    return (
        <section className="py-40 px-8">
            <div className="container mx-auto mb-12">
                <Typography placeholder="" variant="h3" color="blue-gray">
                    Check my latest blog posts
                </Typography>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {blogPostsData?.map((item: any) => (
                    <AllBlogPostCard key={item.id} img={item.imageUrl} title={item.title} desc={item.content} blogpostId={item.id} />
                ))}
            </div>
        </section>
    );
}


export default AllBlogPosts;


