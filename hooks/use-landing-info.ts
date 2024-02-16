"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const useLandingPageData = (): { imageUrl2: string; loading2: boolean, description: string, title: string } => {
    const [imageUrl2, setImageUrl2] = useState<string>('');
    const [loading2, setLoading2] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/landinginfo');
                console.log('Response:', response.data);
                const data = response.data;
                if (data) {
                    setImageUrl2(data[0].imageUrl);
                    setTitle(data[0].title);
                    setDescription(data[0].description);
                }
            } catch (error) {
                console.error('Error fetching landingInfo data:', error);
            }
            finally {
                setLoading2(false);
            }
        }

        fetchData();
    }, []);

    return { imageUrl2, loading2, title, description };
};

export default useLandingPageData;
