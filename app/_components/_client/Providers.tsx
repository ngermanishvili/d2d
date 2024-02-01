"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

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