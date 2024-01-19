import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Shipment, ShipmentStatusHistory } from "@prisma/client";
import moment from 'moment';


interface ShipmentDetailsProps {
    shipmentData: Shipment;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipmentData }) => (
    <div>
        <p>Name: {shipmentData.name}</p>
        <p>Lastname: {shipmentData.lastName}</p>
        <p>Tracking ID: {shipmentData.trackingId}</p>
        <p>Status: {shipmentData.status}</p>
    </div>
);

interface StatusHistoryProps {
    statusHistory: ShipmentStatusHistory[];
}

const StatusHistory: React.FC<StatusHistoryProps> = ({ statusHistory }) => (
    <div>
        <p>Shipment Status History:</p>
        <ul>
            {statusHistory.slice().reverse().map((status) => (
                <li key={status.id}>
                    <span className="status-text">{status.status}</span>
                    <span className="status-date">
                        {moment(status.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);


interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    shipmentData: Shipment | null;
    statusHistory: ShipmentStatusHistory[] | null;
    onConfirm: () => void;
    loading: boolean;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
    isOpen,
    onClose,
    shipmentData,
    statusHistory,
    onConfirm,
    loading,
}) => {
    return (
        <Modal title="TRACKING" description="tracking status" isOpen={isOpen} onClose={onClose}>
            {shipmentData ? (
                <ShipmentDetails shipmentData={shipmentData} />
            ) : (
                <p>Loading...</p>
            )}

            {statusHistory && statusHistory.length > 0 && (
                <StatusHistory statusHistory={statusHistory} />
            )}

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>

            <style jsx>{`
                /* Add your custom styles here */
                .status-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }

                .status-text {
                    font-weight: bold;
                }

                .status-date {
                    color: #666;
                }
            `}</style>
        </Modal>
    );
};
