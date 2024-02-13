"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEmailStore from "@/hooks/set-courier-for-shipment";
import toast from "react-hot-toast";

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

    const handleConfirm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && emailRegex.test(email)) {
            onConfirm();
            toast.success("კურიერს წარმატებით მიემაგრა შეკვეთა-(ები)");
        } else {
            toast.error("შეიყვანეთ სწორი ელ-ფოსტა");
        }
    };

    return (
        <Modal
            title="შეკვეთების განაწილება"
            description="მონიშნე სასურველი შეკვეთა ჩაწერე კურიერს ელ-ფოსტა და მიამაგრე კურიერს"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <div>

                    <Input onChange={(e) => setEmail(e.target.value)} disabled={loading} placeholder="კურიერის ელ-ფოსტა" />

                </div>
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    დახურვა
                </Button>
                <Button disabled={loading} variant="destructive" onClick={handleConfirm}>
                    შეკვეთების განაწილება
                </Button>
            </div>
        </Modal>
    );
};
