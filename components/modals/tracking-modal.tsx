import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    trackingId: string; // Add trackingId as a prop
}

interface ShipmentData {
    id: string;
    name: string;
    lastName: string;
    trackingId: string;
    status: string;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    trackingId,
}) => {
    const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);

    useEffect(() => {
        // Fetch data when the component mounts or when trackingId changes
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/shipments?trackingId=${trackingId}`);
                const data = await response.json();

                // Assuming you want the first shipment from the response
                if (data && data.length > 0) {
                    setShipmentData(data[0]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [trackingId]); // Dependency array includes trackingId to refetch data when it changes

    return (
        <Modal
            title="TRACKING"
            description="tracking status"
            isOpen={isOpen}
            onClose={onClose}
        >
            {shipmentData ? (
                <div>
                    <p>Name: {shipmentData.name}</p>
                    <p>Lastname: {shipmentData.lastName}</p>
                    <p>Tracking ID: {shipmentData.trackingId}</p>
                    <p>Status: {shipmentData.status}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    );
};
