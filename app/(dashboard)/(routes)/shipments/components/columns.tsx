/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint no-use-before-define: 0 */  // --> OFF

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { useidSetStore } from "@/hooks/select-store";
import { Badge, Alert, Tag } from "antd";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";

export type ShipmentColumn = {
  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  price: string;
  brittle: string;
  packaging: string;
  createdAt: string | Date;
  updatedAt: string | Date; // Allow both string and Date
  mimgebisName: string;
  mimgebisLastname: string;
  mimgebisNumber: string;
  mimgebisAddress: string;
  markedByCourier: string;
  mimgebiQalaqi: string;
  trackingId: string;
  status: string;
  courierComment: string;
  agebisDro: string | null;
  chabarebisDro: string | null;
};

const colors = [
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
];

export const columns: ColumnDef<ShipmentColumn>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { filteredDataxlsx, setFilteredDataxlsx } = useShipmentStoreXLSX();

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
                setFilteredDataxlsx(arr);
                table.toggleAllPageRowsSelected(!!value);

                // Do something with arr
              }
            } else {
              table.toggleAllPageRowsSelected(!!value);

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
      <Tag className="p-2" color="geekblue">
        {row.original.trackingId}
      </Tag>
    ),
  },
  {
    accessorKey: "name",
    header: "სახელი",
    cell: ({ row }) => (
      <div className="p-2" style={{ display: "flex" }}>
        <p > {row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "გვარი",
    cell: ({ row }) => (
      <div className="p-2" style={{ display: "flex" }}>
        <p > {row.original.lastName}</p>
      </div>
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
    accessorKey: "phoneNumber",
    header: "ტელეფონის ნომერი",
    cell: ({ row }) => (
      <div className="w-[150px]">{`+995 ${row.original.phoneNumber}`}</div>
    ),
  },
  {
    accessorKey: "mimgebisName",
    header: "მიმღების სახელი",
    cell: ({ row }) => (
      <div className="w-[120px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold"> {row.original.mimgebisName}</p>
      </div>
    )
  },
  {
    accessorKey: "mimgebisLastname",
    header: "მიმღების გვარი",
    cell: ({ row }) => (
      <div className="w-[120px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold"> {row.original.mimgebisLastname}</p>
      </div>
    )
  },
  {
    accessorKey: "mimgebisNumber",
    header: "მიმღების ნომერი",
    cell: ({ row }) => (
      <div className="w-[120px]">
        <p className="text-gray-900 font-semibold">{`+995 ${row.original.mimgebisNumber}`}</p>

      </div>
    ),
  },
  {
    accessorKey: "mimgebisAddress",
    header: "მიმღების მისამართი",
    cell: ({ row }) => (
      <div className="w-[150px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold"> {row.original.mimgebisAddress}</p>
      </div>
    )
  },

  {
    accessorKey: "mimgebiQalaqi",
    header: "მიმღების ქალაქი",
    cell: ({ row }) => (
      <div className="w-[120px]" style={{ display: "flex" }}>
        <p className="text-gray-900 font-semibold"> {row.original.mimgebiQalaqi}</p>
      </div>
    )
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
    accessorKey: "price",
    header: "ფასი",
  },
  {
    accessorKey: "markedByCourier",
    header: "სტატუსი",
  },
  {
    accessorKey: "createdAt",
    header: "დამატების თარიღი",
    cell: ({ row }) => (
      <div className="w-[120px]">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
    ),
  },

  {
    accessorKey: "agebisDro",
    header: "ამანათის აღების დრო",
  },



  {
    accessorKey: "courierComment",
    header: "კურიერის კომენტარი",
    cell: ({ row }) => (
      <Tag className="p-2" color="geekblue">
        {row.original.courierComment}
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
