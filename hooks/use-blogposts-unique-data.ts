"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';


const useBlogPostsData = (blogpostId: string) => {
    const params = useParams()

    const [loading, setLoading] = useState<boolean>(true);
    const [blogPostData, setBlogPostData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/blogposts/${params?.blogpostId}`);
                const data = response.data;

                // Set the data in the state variable
                setBlogPostData(data);
            } catch (error) {
                console.error('Error fetching blog post data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [blogpostId]);

    return { loading, blogPostData };
};

export default useBlogPostsData;
