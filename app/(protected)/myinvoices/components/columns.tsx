"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { UserRole } from "@prisma/client";

export type InvoiceColumn = {
  id: string;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  sruliPasebisjami: string;
  sruliPasebisMinusJami: string;
  wonisPasebisJami: string;
  servisisPasebisJami: string;
  invoiceNumber: string

};


export const columns: ColumnDef<InvoiceColumn>[] = [

  {
    accessorKey: "name",
    header: "ჩემი ინვოისები ",
  },



  {
    accessorKey: "createdAt",
    header: "შექმნის თარიღი",
    cell: ({ row }) => (
      <div className="w-[140px]">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
    ),

  },


  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
