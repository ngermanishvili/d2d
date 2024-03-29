/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint no-use-before-define: 0 */ // --> OFF

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { useidSetStore } from "@/hooks/select-store";
import { Badge, Alert, Tag } from "antd";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";
import { RoleGate } from "@/components/auth/role-gate";
import { getUserByEmail } from "@/data/user";

export type ShipmentColumn = {
  id: string;
  phoneNumber: string;
  address: string;
  city: string;
  price: string;
  priceDif: string | null;
  itemPrice: string | null;
  whopays: string | null;
  label: string | null;
  weightPrice: string | null;
  packagePrice: string | null;
  companyPays: string | null;
  brittle: string;
  packaging: string;
  createdAt: string | Date;
  updatedAt: string | Date; // Allow both string and Date
  mimgebisNumber: string;
  mimgebisAddress: string;
  markedByCourier: string;
  mimgebiQalaqi: string;
  trackingId: string;
  status: string;
  courierComment: string;
  agebisDro: string | null;
  chabarebisDro: string | null;
  gamgzavnisqalaqi: string;
  mimgebiFullName: string;
  gamgzavniFullName: string;
  courierComment2: string;
  assignedCourier: string;
};

export const columns: ColumnDef<ShipmentColumn>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { filteredDataxlsx, setFilteredDataxlsx } = useShipmentStoreXLSX();
      const { pushId, emptyId } = useidSetStore();
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            if (value === true) {
              const filteredRowModel = table.getFilteredRowModel();

              if (filteredRowModel) {
                const arr = filteredRowModel.rows.map((i) => {
                  pushId(i.original.id);
                  return i.original;
                });

                setFilteredDataxlsx(arr);
                table.toggleAllPageRowsSelected(!!value);

                // Do something with arr
              }
            } else {
              table.toggleAllPageRowsSelected(!!value);
              emptyId();
              setFilteredDataxlsx([]);
            }
          }}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const { pushId, ids, deleteId } = useidSetStore();
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              const id = row.original.id;
              if (!ids.includes(id)) {
                pushId(id);
              }
            }
            if (!value) {
              const id = row.original.id;

              deleteId(id);
            }
            return row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
  },

  {
    accessorKey: "trackingId",
    header: "თრექინგი",

    cell: ({ row }) => (
      <Tag className="p-2 -z-10  text-md w-[88px]" color="purple">
        {row.original.trackingId}
      </Tag>
    ),
  },
  {
    accessorKey: "status",
    header: "სტატუსი",
    cell: ({ row }) => {
      const statusColors: { [key: string]: string } = {
        ჩაბარებული: "green",
        მიმდინარე: "orange",
        "უარი ჩაბარებაზე": "red",
        "გაუქმებულია გამგზავნის მიერ": "red",
        "ვერ ხერხდება დაკავშირება": "blue",
        ასაღები: "orange",
      };

      const color = statusColors[row.original.status] || "blue";

      return (
        <div>
          <Tag className="p-2 -z-10 -z-10" color={color}>
            {row.original.status}
          </Tag>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "შეკვეთის თარიღი",
    cell: ({ row }) => (
      <div>
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "გამგზავნის მისამართი",
  },
  {
    accessorKey: "mimgebiQalaqi",
    header: "მიმღების ქალაქი",
    cell: ({ row }) => (
      <div style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold">
          {row.original.mimgebiQalaqi}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "mimgebisAddress",
    header: "მიმღების მისამართი",
    cell: ({ row }) => (
      <div style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold">
          {row.original.mimgebisAddress}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "mimgebisNumber",
    header: "მიმღების ნომერი",
    cell: ({ row }) => (
      <div>
        <p className="text-gray-900 font-semibold">{`+995 ${row.original.mimgebisNumber}`}</p>
      </div>
    ),
  },
  {
    accessorKey: "gamgzavniFullName",
    header: "გამგზავნის სახელი და გვარი",
    cell: ({ row }) => (
      <div style={{ display: "flex" }}>
        <p> {row.original.gamgzavniFullName}</p>
      </div>
    ),
  },
  {
    accessorKey: "gamgzavnisqalaqi",
    header: "გამგზავნის ქალაქი",
    cell: ({ row }) => (
      <div>
        <p className="text-gray-900 font-semibold">
          {row.original.gamgzavnisqalaqi}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "agebisDro",
    header: "ამანათის აღების დრო",
    cell: ({ row }) => (
      <Tag className="p-2 -z-10 w-full" color="green">
        {row.original.agebisDro}
      </Tag>
    ),
  },
  {
    accessorKey: "chabarebisDro",
    header: "ამანათის ჩაბარების დრო",
    cell: ({ row }) => (
      <Tag className="p-2 -z-10 w-full" color="green">
        {row.original.chabarebisDro}
      </Tag>
    ),
  },
  {
    accessorKey: "mimgebiFullName",
    header: "მიმღების სახელი და გვარი",
    cell: ({ row }) => (
      <div className="w-full">
        <p className="text-gray-900 font-semibold w-full">
          {" "}
          {row.original.mimgebiFullName}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "ფასი",
  },

  {
    accessorKey: "phoneNumber",
    header: "გამგზავნის ნომერი",
    cell: ({ row }) => <div>{`+995 ${row.original.phoneNumber}`}</div>,
  },
  {
    accessorKey: "city",
    header: "ქალაქი",
  },

  {
    accessorKey: "brittle",
    header: "მსხვრევადი",
  },

  {
    accessorKey: "packaging",
    header: "D2D შეფუთვა",
    cell: ({ row }) => <div>{`${row.original.packaging}`}</div>,
  },

  {
    accessorKey: "markedByCourier",
    header: "მონიშვნა",
  },

  {
    accessorKey: "agebisDro",
    header: "ამანათის აღების დრო",
    cell: ({ row }) => (
      <Tag className="p-2 -z-10 w-full" color="green">
        {row.original.agebisDro}
      </Tag>
    ),
  },

  {
    accessorKey: "courierComment",
    header: "ჩემი კომენტარი",
    cell: ({ row }) => (
      <Tag className="p-2 -z-10 w-full" color="orange">
        {row.original.courierComment === ""
          ? "კომენტარის გარეშე"
          : row.original.courierComment}
      </Tag>
    ),
  },
  {
    accessorKey: "courierComment2",
    header: "კურიერის კომენტარი",
    cell: ({ row }) => (
      <Tag className="p-2 -z-10" color="geekblue">
        {row.original.courierComment2 === ""
          ? "არ მოიძებნა"
          : row.original.courierComment2}
      </Tag>
    ),
  },

  {
    accessorKey: "assignedCourier",
    header: "მომსახურე კურიერი",

    cell: ({ row }) => (
      <>
        <RoleGate allowedRole="USER">
          <Tag className="p-2 -z-10" color="geekblue">
            {row.original.assignedCourier}
          </Tag>
        </RoleGate>
        <RoleGate allowedRole="ADMIN">
          <Tag className="p-2 -z-10" color="geekblue">
            D2D კურიერი
          </Tag>
        </RoleGate>
      </>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
