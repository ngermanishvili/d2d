
"use client";
// NProgressWrapper.tsx
// NProgressWrapper.tsx
import React, { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/nprogress.css';


const NProgressWrapper: React.FC = () => {
    useEffect(() => {
        NProgress.configure({ showSpinner: false, speed: 250, trickleSpeed: 800, });

        let timeout: NodeJS.Timeout | null = null;

        const handleStart = () => {
            NProgress.start();
            if (timeout) {
                clearTimeout(timeout);
            }
        };

        const handleStop = () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            // Set a shorter timeout duration, e.g., 500 milliseconds
            timeout = setTimeout(() => {
                NProgress.done();
            }, 500);
        };

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleStop);
        Router.events.on('routeChangeError', handleStop);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleStop);
            Router.events.off('routeChangeError', handleStop);
        };
    }, []);

    return null;
};

export default NProgressWrapper;
