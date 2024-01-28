"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const useBlogPostsData = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogPostsData, setBlogPostsData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/blogposts');
                console.log('Response:', response.data);
                const data = response.data;
                console.log(data);

                // Set the data in the state variable
                setBlogPostsData(data);
            } catch (error) {
                console.error('Error fetching blog posts data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    return { loading, blogPostsData };
};

export default useBlogPostsData;
