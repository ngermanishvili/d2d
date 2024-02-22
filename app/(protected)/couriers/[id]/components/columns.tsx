"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { UserRole } from "@prisma/client";

export type InvoiceColumn = {
  id: string;
  name: string;
  url: string;
  userId: string;
};

export const columns: ColumnDef<InvoiceColumn>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "url",
    header: "url",
  },
  {
    accessorKey: "userId",
    header: "userId",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
