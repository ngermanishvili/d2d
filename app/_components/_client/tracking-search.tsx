// TrackingSearchContainer.jsx

import React, { useState } from 'react';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { TrackingModal } from '@/components/modals/tracking-modal';
import { Shipment } from '@prisma/client';

const TrackingSearchContainer: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
    const [loading, setLoading] = useState(false);


    const handleSearchClick = async () => {
        try {
            setLoading(true);
            const trimmedInputValue = inputValue.trim();

            const response = await fetch(`/api/shipments?trackingId=${trimmedInputValue}`);
            if (!response.ok) {
                console.error(`Error fetching data. Status: ${response.status}`);
                return;
            }
            const data = await response.json();

            if (data && data.length > 0) {
                const matchingShipment = data.find((shipment: any) => shipment.trackingId === trimmedInputValue);

                if (matchingShipment) {
                    setShipmentData(matchingShipment);
                    setIsModalOpen(true);
                } else {
                    console.error("No matching shipment data found for the provided tracking ID");
                }
            } else {
                console.error("No shipment data found for the provided tracking ID");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Container>
                <div className='rounded-md w-full bg-slate-300 flex justify-between p-4'>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <SearchIcon onClick={handleSearchClick} className='ml-2 flex justify-center items-center' />
                </div>
            </Container>
            {isModalOpen && shipmentData && (
                <TrackingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    shipmentData={shipmentData}
                    loading={loading}
                    onConfirm={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            setIsModalOpen(false);
                        }, 2000);
                    }}
                />
            )}
        </>
    );
}

export default TrackingSearchContainer;
