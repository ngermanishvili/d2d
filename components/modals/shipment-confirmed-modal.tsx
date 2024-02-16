"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import QRCodeGenerator from "../ui/qr-code";
import { QrCodeComponent } from "@/app/(dashboard)/(routes)/shipments/[shipmentId]/components/qr-card";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  text: string;
}
export const ConfirmModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  text,
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
      title="CONFIRMMODAL"
      description="CONFIRMMODAL"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="h-[350px] flex flex-col gap-8 pt-5">
        <div className="pb-6 mt-6 space-x-2 flex flex-col items-center justify-end w-full">
          <p>
            თრექინგის კოდია {text}, გთხოვთ თრექინგი და ქიუ არ კოდი გადაიტანოთ
            გზავნილზე
          </p>
          <QRCodeGenerator text={text} />
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continiue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
