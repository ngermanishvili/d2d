"use client"
import { useState, useEffect } from 'react';

const hasAcceptedCookies = () => {
    if (typeof document !== 'undefined') {
        return document.cookie.includes('acceptedCookies=true');
    }
    return false; // Default to false if document is not available
};

export default function Banner() {
    const [bannerOpen, setBannerOpen] = useState<boolean>(!hasAcceptedCookies());

    const handleAccept = () => {
        if (typeof document !== 'undefined') {
            document.cookie = 'acceptedCookies=true; max-age=31536000';
        }
        setBannerOpen(false);
    };

    useEffect(() => {
        if (hasAcceptedCookies()) {
            setBannerOpen(false);
        }
    }, []);


    return (
        <>
            {bannerOpen && (
                <div className="w-full md:bottom-8 md:right-12 md:w-auto z-50">
                    <div className="bg-slate-800 text-slate-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
                        <div className='text-slate-500 inline-flex'>
                            <p className="font-medium hover:underline text-slate-50" rel="noreferrer">D2D</p>
                            <span className="italic px-1.5">|</span>
                            <p className="font-medium hover:underline text-emerald-400" rel="noreferrer">ვებსაიტი იყენებს Cookie ფაილებს.</p>
                        </div>
                        <div className="flex items-center">
                            <button className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-gray-700" onClick={handleAccept}>
                                Accept
                            </button>
                            <button className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-gray-700" onClick={() => setBannerOpen(false)}>
                                <span className="sr-only">Close</span>
                                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 16 16">
                                    <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
