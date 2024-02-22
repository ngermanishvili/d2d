import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { InvoiceColumn } from "@/app/(protected)/couriers/[id]/components/columns";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: InvoiceColumn;
}
export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data,
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
      title="ინვოისი"
      description="ინვოისის აღწერა"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex w-4/5 items-center flex-col text-center justify-end ">
        კონტენტი
        <span className="w-5/6">{data.name}</span>
        <a className="w-5/6" href={data.url}>
          გადმოწერა
        </a>
        <span className="w-5/6">{data.userId}</span>
      </div>
    </Modal>
  );
};
