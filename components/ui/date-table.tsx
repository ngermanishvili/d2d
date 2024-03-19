"use client";

import React, { useEffect, useState } from "react";
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
import db from "@/lib/db";
import axios from "axios";
import { AlertModalForRegisterCourier } from "../modals/register-courier-modal";
import useEmailStore from "@/hooks/set-courier-for-shipment";
import { RoleGate } from "../auth/role-gate";
import { useSearchKeyStore } from "@/hooks/search-key-store";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";
import { ShipmentColumn } from "@/hooks/xlsx-shipment-store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userModalStore } from "@/hooks/user-modal-store";

interface DataTableProps<TData extends ShipmentColumn, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData extends ShipmentColumn, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [gatana, setGatana] = useState(false); // Add state for the action
  const [shemotana, setShemotana] = useState(true); // Add state for the action
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
  const { filteredDataxlsx, setFilteredDataxlsx } = useShipmentStoreXLSX();

  const { ids, pushId, deleteId } = useidSetStore();
  useEffect(() => {
    let array = table
      .getFilteredSelectedRowModel()
      .rows.map((item) => item.original);
    setFilteredDataxlsx(array);
  }, [ids, pushId, deleteId]);

  const onDelete = async () => {
    try {
      // Assuming you want to send the IDs in the request body
      await axios.delete("/api/shipments", {
        data: { ids },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateToTrue = async () => {
    try {
      const data = {
        ids,
        variable: "საწყობში",
      };

      await axios.patch("/api/shipments", data);
      // Handle success or any other logic
    } catch (error) {
      console.error("Error updating to false:", error);
    } finally {
      window.location.reload();
    }
  };

  const handleUpdateToFalse = async () => {
    try {
      const data = {
        ids,
        variable: "გატანილი ჩასაბარებლად",
      };

      await axios.patch("/api/shipments", data);
      // Handle success or any other logic
    } catch (error) {
      console.error("Error updating to false:", error);
    } finally {
      window.location.reload();
    }
  };
  const handleUpdateToFalse2 = async () => {
    try {
      const data = {
        ids,
        variable: "გაგზავნილი ფილიალში",
      };

      await axios.patch("/api/shipments", data);
      // Handle success or any other logic
    } catch (error) {
      console.error("Error updating to false:", error);
    } finally {
      window.location.reload();
    }
  };
  const handleUpdateToFalse3 = async () => {
    try {
      const data = {
        ids,
        variable: "მეორედ გატანა",
      };

      await axios.patch("/api/shipments", data);
      // Handle success or any other logic
    } catch (error) {
      console.error("Error updating to false:", error);
    } finally {
      window.location.reload();
    }
  };

  const email = useEmailStore((state: any) => state.email);

  const onUpdate = async () => {
    try {
      console.log(ids, "onupdateIDan");
      const data = {
        ids,
        variable: email,
      };
      console.log(data);
      await axios.patch("/api/shipments/courierupdate", data);
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.error("Error updating to true:", error);
    }
  };
  const { searchKeyStore, setSearchKeyStore } = useSearchKeyStore();

  const shipmentColumnsWithLabels = [
    { value: "id", label: "აიდი" },
    { value: "mimgebiFullName", label: "მიმღების სახელი" },
    { value: "gamgzavniFullName", label: "გამგზავნის სახელი" },
    { value: "phoneNumber", label: "ტელეფონის ნომერი" },
    { value: "address", label: "მისამართი" },
    { value: "city", label: "ქალაქი" },
    { value: "price", label: "ფასი" },
    { value: "brittle", label: "მსხვრევადი" },
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

  const handleChange = (selectedKey: string) => {
    setSearchKeyStore(selectedKey);
    table.reset();
    table.resetColumnFilters();
    table.resetGlobalFilter();
  };

  const { onOpen, onClose, setId } = userModalStore();

  return (
    <>
      <AlertModalForRegisterCourier
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          onUpdate();
          setIsOpen(false);
        }}
        loading={false}
      />
      <div>
        <div
          key={"12"}
          className="flex flex-col md:flex-row items-center py-4 w-full gap-4"
        >
          <div className="flex flex-col justify-center xl:flex-row gap-4">
            <p className="p-2 w-4/5 xl:w-2/5 self-center flex rounded-md justify-center items-center bg-green-400">
              გაფილტრე
            </p>
            <Input
              placeholder="ძებნა"
              value={
                (table.getColumn(searchKeyStore)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) => {
                return table
                  .getColumn(searchKeyStore)
                  ?.setFilterValue(event.target.value);
              }}
              className="max-w-md self-center"
            />
            <select
              value={searchKeyStore}
              onChange={(e) => handleChange(e.target.value)}
              className=" max-sm:w-10/12 p-2 w-4/5 self-center rounded-md outline-none"
            >
              <option value="">აირჩიეთ რითი გსურთ მოძებნა/გაფილტრ</option>
              {shipmentColumnsWithLabels.map((column) => (
                <option key={column.value} value={column.value}>
                  {column.label}
                </option>
              ))}
            </select>
          </div>

          <RoleGate allowedRole="ADMIN">
            <div className="flex flex-wrap justify-center md:w-2/3 max-sm:w-full">
              <Button
                onClick={() => {
                  onDelete();
                  toast.success("შეკვეთები წაიშლა");
                  router.refresh();
                }}
                className="m-2 hidden"
              >
                წაშლა
              </Button>
              <Button
                className="m-2 h-auto text-wrap w-6/12 max-sm:w-4/6 self-center"
                onClick={() => handleUpdateToFalse2()}
              >
                შეცვალე სტატუსი (გაგზავნილი ფილიალში)
              </Button>{" "}
              <Button
                className="m-2 h-auto text-wrap w-6/12 max-sm:w-4/6 self-center"
                onClick={() => handleUpdateToFalse()}
              >
                შეცვალე სტატუსი (გატანილი)
              </Button>{" "}
              <Button
                className="m-2 h-auto text-wrap w-6/12 max-sm:w-4/6 self-center"
                onClick={() => handleUpdateToTrue()}
              >
                შეცვალე სტატუსი (საწყობში)
              </Button>
              <Button
                className="m-2 h-auto text-wrap w-6/12 max-sm:w-4/6 self-center"
                onClick={() => setIsOpen(true)}
              >
                მიამაგრე შეკვეთას კურიერი
              </Button>{" "}
              <Button
                className="m-2 h-auto text-wrap w-6/12 max-sm:w-4/6 self-center"
                onClick={() => handleUpdateToFalse3()}
              >
                მეორედ გატანა
              </Button>
            </div>
          </RoleGate>
          <RoleGate allowedRole="MODERATOR">
            <div className=" self-start">
              <Button className="m-2" onClick={() => setIsOpen(true)}>
                მიამაგრე შეკვეთას კურიერი
              </Button>
            </div>
          </RoleGate>
        </div>

        <div key={"43"} className="rounded-md border overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <TableHead
                      key={header.id}
                      className={`${index === 1 ? "sticky left-0 text-white" : ""
                        } text-white bg-red-600 text-md border-black`}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
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

            <TableBody key={data.toString()}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <RoleGate allowedRole="USER">
                      <TableRow
                        key={row.id + "u"}
                        data-state={row.getIsSelected() && "selected"}
                        onDoubleClick={() => {
                          setId(row.original.id);
                          onOpen();
                        }}
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            className={`${index === 1
                              ? "w-full sticky left-0 bg-white z-99"
                              : "" // Apply sticky style to the first column
                              } p-2 border`}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </RoleGate>
                    <RoleGate allowedRole="ADMIN">
                      <TableRow
                        key={row.id + "p"}
                        data-state={row.getIsSelected() && "selected"}
                        onDoubleClick={() => {
                          router.push(`/shipments/${row.original.id}`);
                        }}
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            className={`${index === 1
                              ? "w-full sticky left-0 bg-white p-"
                              : "" // Apply sticky style to the first column
                              } p-2 border`}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </RoleGate>{" "}
                    <RoleGate allowedRole="MODERATOR">
                      <TableRow
                        key={row.id + "s"}
                        data-state={row.getIsSelected() && "selected"}
                        onDoubleClick={() => {
                          router.push(`/couriershipments/${row.original.id}`);
                        }}
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            className={`${index === 1
                              ? "w-full sticky left-0 bg-white p-"
                              : "" // Apply sticky style to the first column
                              } p-2 border`}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </RoleGate>
                  </React.Fragment>
                ))
              ) : (
                <TableRow key={searchKey}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    ინფორმაცია ვერ მოიძებნა.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div
          key={"54"}
          className="flex items-center justify-end space-x-2 py-4"
        >
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
            შემდეგი
          </Button>
        </div>
      </div>
    </>
  );
}
