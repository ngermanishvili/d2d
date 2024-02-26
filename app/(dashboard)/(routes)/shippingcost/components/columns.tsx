"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ShippingPriceColumn = {
  id: string;
  city: string;
  village: string | null;
  weightRange: string;
  price: string;
  villagePrice: string | null;
};

export const columns: ColumnDef<ShippingPriceColumn>[] = [
  {
    accessorKey: "city",
    header: "ქალაქი",
  },
  {
    accessorKey: "price",
    header: "ფასი",
  },
  {
    accessorKey: "village",
    header: "სოფელი",
  },
  {
    accessorKey: "weightRange",
    header: "წონა",
  },
  {
    accessorKey: "villagePrice",
    header: "სოფლის ფასი",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
