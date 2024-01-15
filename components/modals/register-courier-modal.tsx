"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEmailStore from "@/hooks/set-courier-for-shipment";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}


export const AlertModalForRegisterCourier: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    const email = useEmailStore((state: any) => state.email);
    const setEmail = useEmailStore((state: any) => state.setEmail);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="დაარეგისრრირე კურიერ"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <div>

                    <Input onChange={(e) => setEmail(e.target.value)} disabled={loading} placeholder="ემაილი" />

                </div>
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continiue
                </Button>
            </div>
        </Modal>
    );
};
