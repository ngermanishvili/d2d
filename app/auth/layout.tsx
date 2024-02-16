import BgImage from '@/assets/images/register_bg_2.webp';
import Image from 'next/image';
import { z } from 'zod';

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const bgStyle = {
        background: 'linear-gradient(5deg, black 65%, #d33939 50%)',
    };

    return (
        <div style={bgStyle}>
            {children}
        </div>
    );
};

export default AuthLayout;
