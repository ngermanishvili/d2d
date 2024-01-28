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
            {/* <div className="text-center pb-12 md:pb-2 ">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xl mt-6 text-gray-600 " data-aos="zoom-y-out" data-aos-delay="150"> { } </p>

                </div>
            </div> */}
            <div className="w-full mb-4  h-[300px] rounded-sm p-2 object-contain ">
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
