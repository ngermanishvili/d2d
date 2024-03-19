import { useReducer, useEffect } from 'react';
import axios from 'axios';

interface AboutPageData {
    loading: boolean;
    title: string;
    description: string;
    coverImageUrl: string;
    boxImageUrl: string;
    boxTitle: string;
    boxDescription: string;
    panjara1Description: string;
    freqAskedQuestionsTitle: string;
    freqAskedQuestionsDescription: string;
    freqAskedQuestions2Title: string;
    freqAskedQuestions2Description: string;
    freqAskedQuestions3Title: string;
    freqAskedQuestions3Description: string;
    freqAskedQuestions4Title: string;
    freqAskedQuestions4Description: string;
    whatWeOfferTitle: string;
    whatWeOfferDescription: string;
    whatWeOffer2Title: string;
    whatWeOffer2Description: string;
    whatWeOffer3Title: string;
    whatWeOffer3Description: string;
    whatWeOfferToCourierTitle: string;
    whatWeOfferToCourierDescription: string;
}

type Action =
    | { type: 'FETCH_SUCCESS'; payload: Partial<AboutPageData> }
    | { type: 'FETCH_FAILURE' };

const initialState: AboutPageData = {
    loading: true,
    title: '',
    description: '',
    coverImageUrl: '',
    boxImageUrl: '',
    boxTitle: '',
    boxDescription: '',
    panjara1Description: '',
    freqAskedQuestionsTitle: '',
    freqAskedQuestionsDescription: '',
    freqAskedQuestions2Title: '',
    freqAskedQuestions2Description: '',
    freqAskedQuestions3Title: '',
    freqAskedQuestions3Description: '',
    freqAskedQuestions4Title: '',
    freqAskedQuestions4Description: '',
    whatWeOfferTitle: '',
    whatWeOfferDescription: '',
    whatWeOffer2Title: '',
    whatWeOffer2Description: '',
    whatWeOffer3Title: '',
    whatWeOffer3Description: '',
    whatWeOfferToCourierTitle: '',
    whatWeOfferToCourierDescription: '',
};

const reducer = (state: AboutPageData, action: Action): AboutPageData => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                ...action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

const useAboutPageData = (): AboutPageData => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/aboutinfo');
                const data = response.data;
                if (data) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data[0] });
                }
            } catch (error) {
                console.error('Error fetching landingInfo data:', error);
                dispatch({ type: 'FETCH_FAILURE' });
            }
        }

        fetchData();
    }, []);

    return state;
};

export default useAboutPageData;
