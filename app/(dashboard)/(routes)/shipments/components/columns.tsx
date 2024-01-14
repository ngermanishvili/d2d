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
        header: "თრექინგი",

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
        accessorKey: "city",
        header: "ქალაქი",
    },
    {
        accessorKey: "address",
        header: "მისამართი",
    },
    {
        accessorKey: "phoneNumber",
        header: "ტელეფონის ნომერი",
    },

    {
        accessorKey: "price",
        header: "ფასი",
    },


    {
        accessorKey: "brittle",
        header: "მსხვრევადი",
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
        accessorKey: "markedByCourier",
        header: "სტატუსი",

    },


    {
        accessorKey: "createdAt",
        header: "დამატების თარიღი",
    },

    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
