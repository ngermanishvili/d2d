import BgImage from '@/assets/images/register_bg_2.webp';
import Image from 'next/image';
import { z } from 'zod';

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const bgStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 11111,
        backgroundColor: '#000000',
        opacity: '0.9',
        width: '100%'

    };

    return (
        <div style={bgStyle}>
            <Image
                className='z-[-999]'
                src={BgImage}
                alt="Background"
                layout="fill"
            />
            {children}
        </div>
    );
};

export default AuthLayout;
