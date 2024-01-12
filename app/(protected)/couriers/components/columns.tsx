"use client";

import {ColumnDef} from "@tanstack/react-table";
import {CellAction} from "./cell-action";

export type UsersColumn = {
  id: string | null;
  name: string | null;
  email: string | null;
};

export const columns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
];
