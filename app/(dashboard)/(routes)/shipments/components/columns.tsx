"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type ShipmentColumn = {
    id: string
    name: string
    lastName: string
    phoneNumber: string
    address: string
    city: string
    price: string
    brittle: string
    createdAt: string
}

export const columns: ColumnDef<ShipmentColumn>[] = [
    {
        accessorKey: "name",
        header: "სახელი",
    },
    {
        accessorKey: "lastName",
        header: "გვარი",
    },
    {
        accessorKey: "phoneNumber",
        header: "ტელეფონის ნომერი",
    },
    {
        accessorKey: "address",
        header: "მისამართი",
    },
    {
        accessorKey: "price",
        header: "ფასი",
    },
    {
        accessorKey: "city",
        header: "ქალაქი",
    },
    {
        accessorKey: "brittle",
        header: "მსხვრევადი",
    },
    {
        accessorKey: "createdAt",
        header: "დამატების თარიღი",
    },
    {
        accessorKey: "markedByCourier",
        header: "markedByCourier",
    },
    {
        accessorKey: "id",
        header: "id",
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
