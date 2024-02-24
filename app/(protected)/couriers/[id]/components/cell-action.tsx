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
    console.log(id);
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
            console.log("araris id");
            return;
          }
          onUpdate(data.id);
        }}
        loading={loading}
        onUpdate={function
          (updatedData: InvoiceColumn): void {
          throw new Error("Function not implemented.");
        }} />

      {/* <DropdownMenu>
        <DropdownMenuTrigger onClick={() => setOpen(true)}>
          <span className=" ml-8 w-full inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md px-6 bg-primary text-primary-foreground shadow hover:bg-primary/90 self-center">
            ინვოისის ნახვა
          </span>

        </DropdownMenuTrigger>
      </DropdownMenu> */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="ml-4 w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>რედაქტირება</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete()}>წაშლა</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
