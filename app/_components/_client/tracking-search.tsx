"use client"
import React, { useState, useCallback } from 'react';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { TrackingModal } from '@/components/modals/tracking-modal';
import { Shipment, ShipmentStatusHistory } from '@prisma/client';
import { useRouter } from 'next/navigation';

const TrackingSearchContainer: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
    const [statusHistory, setStatusHistory] = useState<ShipmentStatusHistory[] | null>(null);


    const router = useRouter();


    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const trimmedInputValue = inputValue.trim();

            const response = await fetch(`/api/shipments?trackingId=${trimmedInputValue}`);
            if (!response.ok) {
                console.error(`Error fetching data. Status: ${response.status}`);
                return;
            }

            const data = await response.json();
            console.log("Fetched Data:", data);

            if (data && data.length > 0) {
                const matchingShipment = data.find((shipment: any) => shipment.trackingId === trimmedInputValue);

                if (matchingShipment) {
                    // Fetch the status history separately
                    const statusHistoryResponse = await fetch(`/api/shipments/${matchingShipment.id}/statushistory`);
                    const statusHistoryData = await statusHistoryResponse.json();
                    // console.log("Status History Data:", statusHistoryData);

                    setShipmentData({
                        ...matchingShipment,
                    });
                    // Set the status history in the state
                    setStatusHistory(statusHistoryData);

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
    }, [inputValue]);

    const handleSearchClick = () => {
        fetchData();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Container>
                <div className='rounded-md  bg-transparent flex justify-between p-4  '>
                    <Input placeholder='ადევნე თვალი შენს ამანათს' className='border-2 h-[50px] border-white bg-white outine-none md:flex-col' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <SearchIcon onClick={handleSearchClick} className=' absolute right-[40px] mt-3 lg:right-[120px] text-black rounded-md w-6 h-6 ml-4  flex justify-center items-center ' />
                </div>
            </Container>
            {isModalOpen && shipmentData && (
                <TrackingModal
                    statusHistory={statusHistory || []}
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
};

export default TrackingSearchContainer;
