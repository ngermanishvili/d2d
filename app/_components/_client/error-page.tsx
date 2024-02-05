"use client"
import { Result } from 'antd';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorPage404: React.FC = () => {


    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="სამწუხაროდ გვერდი ვერ მოიძებნა"
                extra={<Button className='text-white bg-black'>
                    <Link href='/'>
                        მთავარი გვერდი
                    </Link>
                </Button>}
            />

        </>
    );
};

// Export the component for both server and client
export default process.browser ? ErrorPage404 : () => null;
