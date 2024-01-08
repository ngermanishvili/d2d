// components/Billboard.tsx
import React from 'react';

interface BillboardProps {
    imageUrl: string;
    label: string;
    loading: boolean;
}

const BillBoardUi: React.FC<BillboardProps> = ({ imageUrl, loading, label }) => (
    <>
        <h2 className='flex items-center justify-center p-4 font-bold text-xl uppercase '>{label}</h2>
        <div className="w-full p-4 rounded-md h-[400px] bg-white">
            {loading ? 'Loading...' : <img src={imageUrl} alt="Billboard" className="w-full h-full object-cover" />}
        </div>

    </>
);

export default BillBoardUi;
