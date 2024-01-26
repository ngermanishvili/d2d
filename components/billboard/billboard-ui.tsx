// components/Billboard.tsx
import React from 'react';
import Image from 'next/image';

interface BillboardProps {
    imageUrl: string;
    label: string;
    loading: boolean;
}

const BillBoardUi: React.FC<BillboardProps> = ({ imageUrl, loading, label }) => {
    const imageWidth = 800;
    const imageHeight = 400;

    return (
        <>
            <h2 className='flex items-center justify-center p-2 mb-4 font-bold text-xl uppercase '>{label}</h2>
            <div className="w-full p-4 rounded-lg h-[400px] bg-transparent ">
                {loading ? 'Loading...' : (
                    <Image
                        src={imageUrl}
                        alt="Billboard"
                        className="w-full h-full object-cover"
                        width={imageWidth}
                        height={imageHeight}
                    />
                )}
            </div>
        </>
    );
};

export default BillBoardUi;
