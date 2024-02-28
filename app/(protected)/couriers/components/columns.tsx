"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { UserRole } from "@prisma/client";

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
  userType: string;
};

export const columns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: "name",
    header: "სახელი / გვარი ",
  },
  {
    accessorKey: "email",
    header: "ელ-ფოსტა",
  },
  {
    accessorKey: "number",
    header: "ნომერი",
  },

  {
    accessorKey: "role",
    header: "ექაუნთის სტატუსი",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
