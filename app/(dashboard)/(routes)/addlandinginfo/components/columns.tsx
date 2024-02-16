"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type BillboardColumn = {
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    panjara1Title: String,
    panjara1Description: String,
    panjara2Title: String,
    panjara2Description: String,
    panjara3Title: String,
    panjara3Description: String,
    InformationText: String,

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
        accessorKey: "panjara1Title",
        header: "პირველი ბლოკის სათაური",
        cell: ({ row }) => (
            <div className="w-[150px]">
                <p className="text-gray-900 font-semibold">{`${row.original.panjara1Title}`}</p>
            </div>
        ),
    },

    {
        accessorKey: "panjara1Description",
        header: "პირველი ბლოკის აღწერა",
        cell: ({ row }) => (
            <div className="w-[350px]">
                <p className="text-gray-900 font-semibold">{`${row.original.panjara1Description}`}</p>
            </div>
        ),
    },

    {
        accessorKey: "panjara2Title",
        header: "მეორე ბლოკის სათაური",
        cell: ({ row }) => (
            <div className="w-[150px]">
                <p className="text-gray-900 font-semibold">{`${row.original.panjara2Title}`}</p>
            </div>
        ),
    },

    {
        accessorKey: "panjara2Description",
        header: "მეორე  ბლოკის აღწერა",
        cell: ({ row }) => (
            <div className="w-[350px]">
                <p className="text-gray-900 font-semibold">{`${row.original.panjara2Description}`}</p>
            </div>
        ),
    },

    {
        accessorKey: "panjara3Title",
        header: "მესამე ბლოკის სათაური",
        cell: ({ row }) => (
            <div className="w-[150px]">
                <p className="text-gray-900 font-semibold">{`${row.original.panjara3Title}`}</p>
            </div>
        ),
    },

    {
        accessorKey: "panjara3Description",
        header: "მესამე ბლოკის აღწერა",
        cell: ({ row }) => (
            <div className="w-[350px]">
                <p className="text-gray-900 font-semibold">{`${row.original.panjara3Description}`}</p>
            </div>
        ),
    },

    {
        accessorKey: "InformationText",
        header: "მთავარი გვერდის ინფორმაცია D2D GEORGIA-ს დაბლა.",
        cell: ({ row }) => (
            <div className="w-[350px]">
                <p className="text-gray-900 font-semibold">{`${row.original.InformationText}`}</p>
            </div>
        ),
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
