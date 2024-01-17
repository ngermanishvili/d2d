// TrackingModal.tsx

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Shipment } from "@prisma/client";

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    shipmentData: Shipment | null;
    onConfirm: () => void; // Add onConfirm prop
    loading: boolean; // Use boolean instead of any for loading prop
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
    isOpen,
    onClose,
    shipmentData,
    onConfirm,
    loading, // Use boolean instead of any
}) => {
    return (
        <Modal title="TRACKING" description="tracking status" isOpen={isOpen} onClose={onClose}>
            {shipmentData ? (
                <div>
                    <p>Name: {shipmentData.name}</p>
                    <p>Lastname: {shipmentData.lastName}</p>
                    <p>Tracking ID: {shipmentData.trackingId}</p>
                    <p>Status: {shipmentData.status}</p>
                    {/* Add other shipment details as needed */}
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
