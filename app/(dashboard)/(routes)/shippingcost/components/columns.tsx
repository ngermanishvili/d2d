"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ShippingPriceColumn = {
  id: String;
  city: String;
  village: String | null;
  weightRange: String;
  price: Number;
  villagePrice: Number | null;
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
