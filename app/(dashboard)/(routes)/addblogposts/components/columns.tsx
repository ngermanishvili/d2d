"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type BillboardColumn = {
    id: string
    title: string
    content: string
    slug: string
    createdAt: string
    qvesatauri: string
    qvesatauri2: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "title",
        header: "სათაური",
    },
    {
        accessorKey: "slug",
        header: "აბზაცი1",
    },
    {
        accessorKey: "content",
        header: "აბზაცი2",
    },

    {
        accessorKey: "createdAt",
        header: "დამატების თარიღი",
    },
    {
        accessorKey: "qvesatauri",
        header: "ქვესათაური აბზაცი 1",
    },
    {
        accessorKey: "qvesatauri2",
        header: "ქვესათაური აბზაცი 2",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
