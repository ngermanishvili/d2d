"use client"
// 
import dynamic from 'next/dynamic';

const ProgressBar = dynamic(
    () => import('next-nprogress-bar').then((module) => module.AppProgressBar),
    // { ssr: false }
);

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProgressBar
                height="4px"
                color="#FE595E"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </>
    );
};

export default Providers;
