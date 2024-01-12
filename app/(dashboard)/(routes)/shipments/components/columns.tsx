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
    createdAt: string | Date; // Allow both string and Date
    mimgebisName: string
    mimgebisLastname: string
    mimgebisNumber: string
    mimgebisAddress: string
    markedByCourier: string
    mimgebiQalaqi: string
    trackingId: string


}

export const columns: ColumnDef<ShipmentColumn>[] = [

    {
        accessorKey: "trackingId",
        header: "ტრეკინგ ნომერი",
    },
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
        accessorKey: "mimgebisName",
        header: "მიმღების სახელი",
    },
    {
        accessorKey: "mimgebisLastname",
        header: "მიმღების გვარი",
    },
    {
        accessorKey: "mimgebisNumber",
        header: "მიმღების ტელეფონის ნომერი",
    },
    {
        accessorKey: "mimgebisAddress",
        header: "მიმღების მისამართი",
    },


    {
        accessorKey: "mimgebiQalaqi",
        header: "მიმღების ქალაქი",
    },
    {
        accessorKey: "markedByCourier",
        header: "markedByCourier",

    },

    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
