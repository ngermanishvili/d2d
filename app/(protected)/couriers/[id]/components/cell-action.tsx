"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { InvoiceColumn } from "./columns";
import { InvoiceModal } from "@/components/modals/invoice-modal";

interface CellActionProps {
  data: InvoiceColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, set2Open] = useState(false);

  const onUpdate = async (id: string | null) => {
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/invoices/${data.id}`);
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    }
  }



  return (
    <>
      <InvoiceModal
        data={data}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (!data.id) {
            return;
          }
          onUpdate(data.id);
        }}
        loading={loading}
        onUpdate={function
          (updatedData: InvoiceColumn): void {
          throw new Error("Function not implemented.");
        }} />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="ml-4 w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>ინვოისის ნახვა  </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete()}>წაშლა</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
