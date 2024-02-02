"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  agebis: string | undefined;
  chabarebis: string | undefined;
}
export const CreateModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  agebis,
  chabarebis,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="შეკვეთის გასაფორმებლად დაადასტურეთ ინფორმაცია"
      description="შეკვეთის გასაფორმებლად დაადასტურეთ ინფორმაცია"
      isOpen={isOpen}
      onClose={onClose}
    >
      {agebis && chabarebis && (
        <div className="w-full">
          {agebis}
          {chabarebis}
        </div>
      )}
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
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
