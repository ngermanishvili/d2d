import { string } from 'zod';
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const useLandingPageData = (): {
    imageUrl2: string; loading2: boolean, description: string, title: string, panjara1Title: string, panjara1Description: string, panjara2Title: string, panjara2Description: string,
    panjara3Title: string, panjara3Description: string, InformationText: string


} => {
    const [imageUrl2, setImageUrl2] = useState<string>('');
    const [loading2, setLoading2] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [panjara1Title, setPanjara1Title] = useState<string>('');
    const [panjara1Description, setPanjara1Description] = useState<string>('');
    const [panjara2Title, setPanjara2Title] = useState<string>('');
    const [panjara2Description, setPanjara2Description] = useState<string>('');
    const [panjara3Title, setPanjara3Title] = useState<string>('');
    const [panjara3Description, setPanjara3Description] = useState<string>('');
    const [InformationText, setInformationText] = useState<string>('');


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/landinginfo');
                const data = response.data;
                if (data) {
                    setImageUrl2(data[0].imageUrl);
                    setTitle(data[0].title);
                    setDescription(data[0].description);
                    setPanjara1Title(data[0].panjara1Title);
                    setPanjara1Description(data[0].panjara1Description);
                    setPanjara2Title(data[0].panjara2Title);
                    setPanjara2Description(data[0].panjara2Description);
                    setPanjara3Title(data[0].panjara3Title);
                    setPanjara3Description(data[0].panjara3Description);
                    setInformationText(data[0].InformationText);

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

    return {
        imageUrl2, loading2, title, description, panjara1Title, panjara1Description, panjara2Title, panjara2Description, panjara3Title, panjara3Description, InformationText

    };
};

export default useLandingPageData;
