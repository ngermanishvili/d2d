// components/Billboard.tsx
import React from 'react';
import Image from 'next/image';

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
            {/* <div className="text-center pb-12 md:pb-2 ">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xl mt-6 text-gray-600 " data-aos="zoom-y-out" data-aos-delay="150"> {label} </p>
                </div>
            </div> */}
            <div className="mb-4 max-w-[1500px] mx-auto h-[300px] rounded-sm">
                {loading ? 'Loading...' : (
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
