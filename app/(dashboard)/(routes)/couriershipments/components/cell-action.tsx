"use client"
import axios from "axios"
import { useState } from "react"

import {
    Copy,
    Edit,
    MoreHorizontal,
    Trash
} from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ShipmentColumn } from "./columns"
import { AlertModal } from "@/components/modals/alert-modal"
import Link from "next/link"

interface CellActionProps {
    data: ShipmentColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard ID copied to the clipboard.")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/shipments/${data.id}`);
            router.refresh();
            toast.success('Billboard deleted.')

        } catch (error) {
            toast.error('Make sure you removed all categories using this billboard first.')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="p-2">
                <Link className="bg-black text-white w-full p-2 rounded-sm" href={`/couriershipments/${data.id}`}> შეცვალე სტატუსი </Link>

            </div>

        </>
    )
}


