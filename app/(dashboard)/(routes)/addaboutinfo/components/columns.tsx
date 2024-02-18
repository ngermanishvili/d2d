"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type AboutPageColumn = {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    boxImageUrl: string;
    boxTitle: string;
    boxDescription: string;
    panjara1Description: string;
    freqAskedQuestionsTitle: string;
    freqAskedQuestionsDescription: string;
    freqAskedQuestions2Title: string;
    freqAskedQuestions2Description: string;
    freqAskedQuestions3Title: string;
    freqAskedQuestions3Description: string;
    freqAskedQuestions4Title: string;
    freqAskedQuestions4Description: string;
    whatWeOfferTitle: string;
    whatWeOfferDescription: string;
    whatWeOffer2Title: string;
    whatWeOffer2Description: string;
    whatWeOffer3Title: string;
    whatWeOffer3Description: string;
    whatWeOfferToCourierTitle: string;
    whatWeOfferToCourierDescription: string;

}

export const columns: ColumnDef<AboutPageColumn>[] = [
    {
        accessorKey: "title",
        header: "სათაური",
    },
    {
        accessorKey: "description",
        header: "აღწერა",
    },

    {
        accessorKey: "coverImageUrl",
        header: "სურათი",
    },

    {
        accessorKey: "boxImageUrl",
        header: "სურათი",
    },

    {
        accessorKey: "boxTitle",
        header: "სათაური",
    },

    {
        accessorKey: "boxDescription",
        header: "აღწერა",
    },

    {
        accessorKey: "panjara1Description",
        header: "აღწერა",
    },

    {
        accessorKey: "freqAskedQuestionsTitle",
        header: "სათაური",
    },

    {
        accessorKey: "freqAskedQuestionsDescription",
        header: "აღწერა",
    },

    {
        accessorKey: "freqAskedQuestions2Title",
        header: "სათაური",
    },

    {
        accessorKey: "freqAskedQuestions2Description",
        header: "აღწერა",
    },

    {
        accessorKey: "freqAskedQuestions3Title",
        header: "სათაური",
    },

    {
        accessorKey: "freqAskedQuestions3Description",
        header: "აღწერა",
    },

    {
        accessorKey: "freqAskedQuestions4Title",
        header: "სათაური",
    },

    {
        accessorKey: "freqAskedQuestions4Description",
        header: "აღწერა",
    },

    {
        accessorKey: "whatWeOfferTitle",
        header: "სათაური",
    },

    {
        accessorKey: "whatWeOfferDescription",
        header: "აღწერა",
    },

    {
        accessorKey: "whatWeOffer2Title",
        header: "სათაური",
    },

    {
        accessorKey: "whatWeOffer2Description",
        header: "აღწერა",
    },

    {
        accessorKey: "whatWeOffer3Title",
        header: "სათაური",
    },

    {
        accessorKey: "whatWeOffer3Description",
        header: "აღწერა",
    },

    {
        accessorKey: "whatWeOfferToCourierTitle",
        header: "სათაური",
    },

    {
        accessorKey: "whatWeOfferToCourierDescription",
        header: "აღწერა",
    },



    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
