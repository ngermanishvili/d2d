"use client"
import React from 'react';
import Image from 'next/image';
import useBlogPostsData from '@/hooks/use-blogposts-unique-data';
import LoadingSpinner from '@/app/_components/_client/loading-spinner';



const UniquePosts = (blogpostId: any) => {
    const { blogPostData, loading } = useBlogPostsData(blogpostId);



    const formatCreatedAtDate = (createdAt: string | Date) => {
        const monthNames = [
            "იანვარი", "თებერვალი", "მარტი",
            "აპრილი", "მაისი", "ივნისი", "ივლისი",
            "აგვისტო", "სექტემბერი", "ოქტომბერი",
            "ნოემბერი", "დეკემბერი"
        ];

        const createdAtDate = new Date(createdAt);
        const day = createdAtDate.getDate();
        const monthIndex = createdAtDate.getMonth();
        const formattedDate = `${day} ${monthNames[monthIndex]}`;
        return formattedDate;
    }

    if (loading) {
        return (
            <>
                <LoadingSpinner />
            </>
        )
    }

    return (
        <div key={blogPostData.id}>
            {blogPostData && (
                <div>
                    <h1 className=" flex justify-center items-center mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {blogPostData.title}
                    </h1>
                    <div className='flex justify-center items-center'>

                        <Image
                            src={blogPostData.imageUrl}
                            alt={`Picture of ${blogPostData.title}`}
                            width={600}
                            height={600}
                            className='rounded-md mt-8'
                        />
                    </div>

                    { /* {პირველი აბზაცი} */}
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        {blogPostData.qvesatauri}
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {blogPostData.content}
                    </p>
                    <h3 className=" mt-10 scroll-m-20 text-2xl font-semibold tracking-tight">
                        {blogPostData.qvesatauri2}
                    </h3>
                    {/* {მეორე აბზაცი} */}
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {blogPostData.slug}
                    </p>

                </div>
            )}
            <div className='absolute right-[50px] mt-4'>
                <div className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    გამოვეყნების თარიღი {formatCreatedAtDate(blogPostData.createdAt)}
                </div>

            </div>
        </div>
    );
};

export default UniquePosts;
