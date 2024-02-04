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
        <img
          className="w-10 h-10"
          src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
          alt="avatar"
        />
        <p className="w-[100px] h-auto p-2"> {row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "გვარი",
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
    accessorKey: "price",
    header: "ფასი",
  },

  {
    accessorKey: "brittle",
    header: "მსხვრევადი",
  },
  {
    accessorKey: "packaging",
    header: "SHEPUTVA",
  },

  {
    accessorKey: "mimgebisName",
    header: "მიმღების სახელი",
  },
  {
    accessorKey: "mimgebisLastname",
    header: "მიმღების გვარი",
  },
  {
    accessorKey: "mimgebisNumber",
    header: "მიმღების ტელეფონის ნომერი",
    cell: ({ row }) => (
      <div className="w-[150px]">{`+995 ${row.original.mimgebisNumber}`}</div>
    ),
  },
  {
    accessorKey: "mimgebisAddress",
    header: "მიმღების მისამართი",
  },

  {
    accessorKey: "mimgebiQalaqi",
    header: "მიმღების ქალაქი",
  },
  {
    accessorKey: "markedByCourier",
    header: "სტატუსი",
  },
  {
    accessorKey: "createdAt",
    header: "დამატების თარიღი",
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
    accessorKey: "updatedAt",
    header: "შეცვლის თარიღი",
  },
  {
    accessorKey: "agebisDro",
    header: "ამანათის აღების დრო",
  },
  {
    accessorKey: "chabarebisDro",
    header: "ამანათის ჩაბარების დრო",
  },
  {
    accessorKey: "updatedAt",
    header: "შეცვლის თარიღი",
  },
  {
    accessorKey: "agebisDro",
    header: "ამანათის აღების დრო",
  },
  {
    accessorKey: "chabarebisDro",
    header: "ამანათის ჩაბარების დრო",
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
