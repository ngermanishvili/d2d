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
import { UsersColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import { DeleteUser } from "@/actions/delete-user";

interface CellActionProps {
  data: UsersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, set2Open] = useState(false);

  const onUpdate = async (id: string | null) => {
    router.push(`/couriersbonuses/${id}`);
  };

  const onDelete = async (id: string) => {
    await DeleteUser(id);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (!data.id) {
            return;
          }
          onDelete(data.id);
        }}
        loading={loading}
      />
      <AlertModal
        isOpen={open2}
        onClose={() => set2Open(false)}
        onConfirm={() => {
          if (!data.id) {
            return;
          }
          onUpdate(data.id);
        }}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => set2Open(true)}>
            <Edit className="mr-2 h-4 w-4" />
            დეტალების ნახვა
          </DropdownMenuItem>
          <DropdownMenuItem hidden onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            წაშლა
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
