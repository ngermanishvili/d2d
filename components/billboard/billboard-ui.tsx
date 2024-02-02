// components/Billboard.tsx
import React from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/app/_components/_client/loading-spinner';

interface BillboardProps {
    imageUrl: string;
    label: string;
    loading: boolean;
}

const BillBoardUi: React.FC<BillboardProps> = ({ imageUrl, loading, label }) => {
    const imageWidth = 1500;
    const imageHeight = 400;

    return (
        <>

            <div className="mb-4 max-w-[1500px] mx-auto h-[300px] rounded-sm">
                {loading ? <LoadingSpinner /> : (
                    <Image
                        src={imageUrl}
                        alt="Billboard"
                        className="w-full h-full object-cover rounded-md"
                        width={imageWidth}
                        height={imageHeight}
                    />
                )}
            </div>
        </>
    );
};

export default BillBoardUi;
