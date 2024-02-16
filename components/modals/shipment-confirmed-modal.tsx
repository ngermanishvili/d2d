"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import QRCodeGenerator from "../ui/qr-code";
import { Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleClose = () => {
    router.push("/shipments"); // Navigate to shipments page
    onClose(); // Close the modal
  };

  return (
    <>
      <div>
        <Modal

          title="ინფორმაცია"
          description="გთხოვთ თრექინგი და ქიუ არ კოდი გადაიტანოთ გზავნილზე"
          isOpen={isOpen}
          onClose={handleClose}
        >
          <div className="h-[300px] flex flex-col gap-4 relative">
            <div className="pb-6 mt-6 space-x-2 flex flex-col items-center justify-end w-full ">
              <div className="text-md font-bold flex justify-between gap-2 ">
                თრექინგის კოდი - <span className="text-red-500"> {text}</span>
              </div>

              <QRCodeGenerator text={text} />

              <Button className="absolute bottom-0 w-full" disabled={loading} variant="destructive" onClick={onConfirm}>
                <Link href="/shipments">დახურვა</Link>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
