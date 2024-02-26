"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useidSetStore } from "@/hooks/select-store";
import { db } from "@/lib/db";
import axios from "axios";
import { AlertModalForRegisterCourier } from "../modals/register-courier-modal";
import useEmailStore from "@/hooks/set-courier-for-shipment";
import toast from "react-hot-toast";
import { useSearchKeyStore } from "@/hooks/search-key-store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function CourierDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [gatana, setGatana] = useState(false); // Add state for the action
  const [shemotana, setShemotana] = useState(true); // Add state for the action
  const [isOpen, setIsOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const { ids } = useidSetStore();

  const email = useEmailStore((state: any) => state.email);

  const onUpdate = async () => {
    try {
      const data = {
        ids,
        variable: email,
      };
      await axios.patch("/api/shipments/courierupdate", data);
      toast.success("Courier has been updated");
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.error("Error updating to true:", error);
    }
  };
  const shipmentColumnsWithLabels = [
    { value: "id", label: "აიდი" },
    { value: "mimgebiFullName", label: "მიმღების სახელი" },
    { value: "gamgzavniFullName", label: "გამგზავნის სახელი" },
    { value: "phoneNumber", label: "ტელეფონის ნომერი" },
    { value: "address", label: "მისამართი" },
    { value: "city", label: "ქალაქი" },
    { value: "price", label: "ფასი" },
    { value: "brittle", label: "ბრიტლი" },
    { value: "packaging", label: "შეფუთვა" },
    { value: "createdAt", label: "დამატებულია" },
    { value: "updatedAt", label: "დააფდეითებულია" },
    { value: "mimgebisNumber", label: "მიმღების ნომერი" },
    { value: "mimgebisAddress", label: "მიმღების მისამართი" },
    { value: "markedByCourier", label: "მონიშნული კურიერის მიერ" },
    { value: "mimgebiQalaqi", label: "მიმღების ქალაქი" },
    { value: "trackingId", label: "თრექინგ აიდი" },
    { value: "status", label: "სტატუსი" },
    { value: "courierComment", label: "კურიერის კომენტარი" },
    { value: "agebisDro", label: "აღების დრო" },
    { value: "chabarebisDro", label: "ჩაბარების დრო" },
  ];
  const { searchKeyStore, setSearchKeyStore } = useSearchKeyStore();
  const handleChange = (selectedKey: string) => {
    setSearchKeyStore(selectedKey);
    table.reset();
    table.resetColumnFilters();
    table.resetGlobalFilter();
  };

  return (
    <>
      <AlertModalForRegisterCourier
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          setIsOpen(false);
          onUpdate();
        }}
        loading={false}
      />
      <div>
        <div className="flex items-center py-4 w-full">
          <Input
            placeholder="Search"
            value={
              (table.getColumn(searchKeyStore)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) => {
              return table
                .getColumn(searchKeyStore)
                ?.setFilterValue(event.target.value);
            }}
            className="max-w-md"
          />

          <select
            value={searchKeyStore}
            onChange={(e) => handleChange(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Select Search Key</option>
            {shipmentColumnsWithLabels.map((column) => (
              <option key={column.value} value={column.value}>
                {column.label}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <TableHead
                      key={header.id}
                      className={`${index === 0 || index === 1 ? "sticky left-0 text-white" : ""} text-white bg-red-600 text-md border-black`}
                      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`${index === 0 || index === 1 ? "sticky left-0 text-white" : ""} text-white bg-red-600 text-md border-black`}
                        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}

                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    მონაცემები არ მოიძებნა.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            უკან
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            შემდეგი გვერდი
          </Button>
        </div>
      </div>
    </>
  );
}
