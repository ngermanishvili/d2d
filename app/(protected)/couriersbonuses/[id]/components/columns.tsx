/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint no-use-before-define: 0 */ // --> OFF

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useidSetStore } from "@/hooks/select-store";
import { Tag } from "antd";

export type ShipmentColumn = {
  id: string;
  phoneNumber: string;
  address: string;
  city: string;
  price: string;
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
};

export const columns: ColumnDef<ShipmentColumn>[] = [
  {
    id: "select",
    header: ({ table }) => {
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
                const arr = filteredRowModel.rows.map((i) => i.original);
                table.toggleAllPageRowsSelected(!!value);

                // Do something with arr
              }
            } else {
              table.toggleAllPageRowsSelected(!!value);
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
      <Tag className="p-2" color="geekblue">
        {row.original.trackingId}
      </Tag>
    ),
  },
  {
    accessorKey: "status",
    header: "სტატუსიიიი",
    cell: ({ row }) => (
      <div>
        {/* <Alert message={row.original.status} type="success" /> */}
        <Tag className="p-2" color="green">
          {row.original.status}
        </Tag>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "ფასი",
  },

  {
    accessorKey: "mimgebiFullName",
    header: "მიმღების სახელი და გვარი",
    cell: ({ row }) => (
      <div className="w-[200px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold">
          {" "}
          {row.original.mimgebiFullName}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "შეკვეთის თარიღი",
    cell: ({ row }) => (
      <div className="w-[140px]">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
    ),
  },
  {
    accessorKey: "markedByCourier",
    header: "თანხა",
  },
  {
    accessorKey: "gamgzavnisqalaqi",
    header: "გამგზავნის ქალაქი",
    cell: ({ row }) => (
      <div className="w-[140px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold">
          {" "}
          {row.original.gamgzavnisqalaqi}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "mimgebisNumber",
    header: "მიმღების ნომერი",
    cell: ({ row }) => (
      <div className="w-[150px]">
        <p className="text-gray-900 font-semibold">{`+995 ${row.original.mimgebisNumber}`}</p>
      </div>
    ),
  },
  {
    accessorKey: "mimgebiQalaqi",
    header: "მიმღების ქალაქი",
    cell: ({ row }) => (
      <div className="w-[120px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold">
          {" "}
          {row.original.mimgebiQalaqi}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "mimgebisAddress",
    header: "მიმღების მისამართი",
    cell: ({ row }) => (
      <div className="w-[200px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold">
          {" "}
          {row.original.mimgebisAddress}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "gamgzavniFullName",
    header: "სახელი და გვარი",
    cell: ({ row }) => (
      <div className="p-2 w-[200px]" style={{ display: "flex" }}>
        <p> {row.original.gamgzavniFullName}</p>
      </div>
    ),
  },

  {
    accessorKey: "phoneNumber",
    header: "ტელეფონის ნომერი",
    cell: ({ row }) => (
      <div className="w-[150px]">{`+995 ${row.original.phoneNumber}`}</div>
    ),
  },

  {
    accessorKey: "city",
    header: "ქალაქი",
  },
  {
    accessorKey: "address",
    header: "მისამართი",
  },

  {
    accessorKey: "brittle",
    header: "მსხვრევადი",
  },

  {
    accessorKey: "packaging",
    header: "D2D შეფუთვა",
    cell: ({ row }) => (
      <div className="w-[100px]">{`${row.original.packaging}`}</div>
    ),
  },

  {
    accessorKey: "agebisDro",
    header: "ამანათის აღების დრო",
    cell: ({ row }) => (
      <Tag className="p-2 w-[150px]" color="geekblue">
        {row.original.agebisDro}
      </Tag>
    ),
  },


  {
    accessorKey: "courierComment",
    header: "მომხმარებლის კომენტარი",
    cell: ({ row }) => (
      <Tag className="p-2" color="geekblue">
        {row.original.courierComment}
      </Tag>
    ),
  },

 
];
