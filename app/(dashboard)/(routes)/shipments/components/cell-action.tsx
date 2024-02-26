"use client";
import axios from "axios";
import { useState, useCallback } from "react";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShipmentColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { RoleGate } from "@/components/auth/role-gate";
import { UserShimpmentModal } from "./user-shipment-modal";
import { Shipment } from "@prisma/client";
import { ShipmentStatusHistory } from "@prisma/client";
import usePhoneStore from "@/hooks/user-shipment-phone";

interface CellActionProps {
  data: ShipmentColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
  const [statusHistory, setStatusHistory] = useState<
    ShipmentStatusHistory[] | null
  >(null);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to the clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/shipments/${data.id}`);
      router.refresh();
      toast.success("შეკვეთა წაშლილია");
    } catch (error) {
      toast.error(
        "დაფიქსირდა შეცდომა შეკვეთის წაშლისას"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const fetchData = async (data: string) => {
    try {
      setLoading(true);
      const trimmedInputValue = inputValue.trim();

      const response = await axios.get(`/api/shipments/${data}`);
      setShipmentData(response.data);
      console.log("🚀 ~ fetchData ~ res:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlePhoneChange = async (id: string, phone: string) => {
    try {
      const data = {
        phoneNumber: phone,
      };

      await axios.patch(`/api/shipments/${id}`, data);
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.error("Error updating to true:", error);
    }
  };
  const { phone } = usePhoneStore();

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <UserShimpmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setLoading(true);
          handlePhoneChange(data.id, phone);
          setTimeout(() => {
            setLoading(false);
            setIsModalOpen(false);
            router.refresh();
          }, 2000);
        }}
        shipmentData={shipmentData}
        loading={false}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">გახსენი მენიუ</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <RoleGate allowedRole="ADMIN">
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
              <Copy className="mr-2 h-4 w-4" />
              დააკოპირე ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/shipments/${data.id}`);
                router.refresh();
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              შეცვლა
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className="mr-2 h-4 w-4" />
              წაშლა
            </DropdownMenuItem>
          </DropdownMenuContent>
        </RoleGate>
        <RoleGate allowedRole="USER">
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setIsModalOpen(true);
                fetchData(data.id);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </RoleGate>
      </DropdownMenu>
    </>
  );
};
