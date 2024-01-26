import React from "react";
import { RoleGate } from "../auth/role-gate";
import { Button } from "@/components/ui/button";

interface ShipmentActionsProps {
    onDelete: () => void;
    handleUpdateToTrue: () => void;
    handleUpdateToFalse: () => void;
    setIsOpen: (isOpen: boolean) => void;
}

const ShipmentActions: React.FC<ShipmentActionsProps> = ({
    onDelete,
    handleUpdateToTrue,
    handleUpdateToFalse,
    setIsOpen,
}) => {
    return (
        <RoleGate allowedRole="ADMIN">
            <Button onClick={onDelete} className="m-2">
                წაშლა
            </Button>
            <Button className="m-2" onClick={handleUpdateToTrue}>
                შეცვალე სტატუსი (გატანილი)
            </Button>
            <Button className="m-2" onClick={handleUpdateToFalse}>
                შეცვალე სტატუსი (საწყობში)
            </Button>
            <Button className="m-2" onClick={() => setIsOpen(true)}>
                მიამაგრე შეკვეთას კურიერი
            </Button>
        </RoleGate>
    );
};

export default ShipmentActions;
