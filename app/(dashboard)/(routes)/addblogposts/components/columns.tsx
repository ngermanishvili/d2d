"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type BillboardColumn = {
    id: string
    title: string
    content: string
    slug: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "title",
        header: "title",
    },
    {
        accessorKey: "slug",
        header: "slug",
    },
    {
        accessorKey: "content",
        header: "Content",
    },

    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
