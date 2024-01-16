import React, { useState } from 'react';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { TrackingModal } from '@/components/modals/tracking-modal';

const TrackingSearchContainer: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const validTrackingId = '23757157-3874';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        console.log("Input Value:", value);
    };

    const handleSearchClick = () => {
        // Check if the input value matches the valid tracking ID before opening the modal
        if (inputValue === validTrackingId) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Container>
                <div className='rounded-md w-full bg-slate-300 flex justify-between p-4'>
                    <Input onKeyDown={handleKeyDown} />
                    <SearchIcon onClick={handleSearchClick} className='ml-2 flex justify-center items-center' />
                </div>
            </Container>

            {/* Render the TrackingModal with isOpen state from isModalOpen */}
            {isModalOpen && (
                <TrackingModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={() => { }} loading={false} trackingId={validTrackingId} />
            )}
        </>
    );
}

export default TrackingSearchContainer;
