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
      <div className="h-[250px] flex flex-col gap-8 pt-5">
        {agebis && chabarebis && (
          <>
            <div className="w-full flex justify-between">
              <span className="w-3/4  ">შეკვეთის აღების თარიღი</span>
              <p>:</p> <p className="w-2/4"> {agebis.replace(" ", "-")}</p>
            </div>
            <div className="w-full flex justify-between">
              <span className="w-3/4">შეკვეთის ჩაბარების თარიღი</span>
              <p>:</p>{" "}
              <p className="w-6/12"> 2{chabarebis.replace(" ", "-")}</p>
            </div>
          </>
        )}
        <div className="pt-6 mt-6 space-x-2 flex items-center justify-end w-full">
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