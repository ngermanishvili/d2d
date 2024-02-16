"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type BillboardColumn = {
    id: string,
    title: String,
    description: String,
    imageUrl: String,
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "title",
        header: "სათაური",
    },
    {
        accessorKey: "description",
        header: "აღწერა",
    },
    {
        accessorKey: "imageUrl",
        header: "ფოტო",
    },

    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
