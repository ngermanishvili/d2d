"use client";

import {useState, useEffect} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

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
import {idSetStore} from "@/hooks/select-store";
import {db} from "@/lib/db";
import axios from "axios";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [gatana, setGatana] = useState(false); // Add state for the action
  const [shemotana, setShemotana] = useState(true); // Add state for the action

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

  const {ids} = idSetStore();
  const onDelete = async () => {
    try {
      // Assuming you want to send the IDs in the request body
      await axios.delete("/api/shipments", {
        data: {ids},
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateToTrue = async () => {
    try {
      const data = {
        ids,
        variable: shemotana,
      };

      await axios.patch("/api/shipments", data);
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.error("Error updating to true:", error);
    }
  };

  const handleUpdateToFalse = async () => {
    try {
      const data = {
        ids,
        variable: gatana,
      };

      await axios.patch("/api/shipments", data);
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.error("Error updating to false:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center py-4 w-full">
        <Input
          placeholder="Search"
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-md"
        />
        <Button
          onClick={() => {
            // Toggle the state of isActionEnabled on each click
            onDelete();
          }}
        >
          Delete
        </Button>{" "}
        <Button onClick={() => handleUpdateToTrue()}>update to true</Button>
        <Button onClick={() => handleUpdateToFalse()}>update to false</Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={`${
                      index === 0 ? "sticky left-0 text-blue-400" : "" // Apply sticky style to the first column
                    } bg-red-200 p-2 font-semibold border `}
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
                      className={`${
                        index === 0 ? "sticky left-0 bg-white p-" : "" // Apply sticky style to the first column
                      } p-2 border`}
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
                  No results.
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
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
