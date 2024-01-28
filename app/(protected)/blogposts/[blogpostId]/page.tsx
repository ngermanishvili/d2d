"use client"
import React from 'react';
import Image from 'next/image';
import useBlogPostsData from '@/hooks/use-blogposts-unique-data';



const UniquePosts = (blogpostId: any) => {
    const { blogPostData, loading } = useBlogPostsData(blogpostId);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div key={blogPostData.id}>
            {blogPostData && (
                <div>
                    <Image
                        src={blogPostData.imageUrl}
                        alt={`Picture of ${blogPostData.title}`}
                        width={500}
                        height={500}
                    />
                    <h1>{blogPostData.title}</h1>
                    <h2>{blogPostData.content}</h2>
                </div>
            )}
        </div>
    );
};

export default UniquePosts;