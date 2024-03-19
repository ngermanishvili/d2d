"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const useBillboardData = (): { imageUrl: string; loading: boolean, label: string } => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [label, setLabel] = useState<string>('');


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/billboards');
                const data = response.data;
                if (data) {
                    setImageUrl(data[0].imageUrl);
                    setLabel(data[0].label);
                }
            } catch (error) {
                console.error('Error fetching billboard data:', error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { imageUrl, loading, label };
};

export default useBillboardData;
