"use client";

import {ColumnDef} from "@tanstack/react-table";
import {CellAction} from "./cell-action";
import {UserRole} from "@prisma/client";

export type UsersColumn = {
  id: string;
  name: string | undefined;
  number: string | undefined;
  image: string | undefined;
  email: string | undefined;
  input1: string | undefined;
  input2: string | undefined;
  input3: string | undefined;
  input4: string | undefined;
  input5: string | undefined;
  input6: string | undefined;
  input7: string | undefined;
  input8: string | undefined;
  role: UserRole;
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
    accessorKey: "number",
    header: "Email",
  },
  {
    accessorKey: "image",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Email",
  },
  {
    accessorKey: "id",
    header: "Email",
  },

  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
];
