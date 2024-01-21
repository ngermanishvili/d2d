"use client";

import {ColumnDef} from "@tanstack/react-table";
import {CellAction} from "./cell-action";
import {Checkbox} from "@/components/ui/checkbox";
import {idSetStore} from "@/hooks/select-store";
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
  createdAt: string | Date; // Allow both string and Date
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

export const columns: ColumnDef<ShipmentColumn>[] = [
  {
    id: "select",
    header: ({table}) => <div>Select</div>,
    cell: ({row}) => {
      const {pushId, ids, deleteId} = idSetStore();

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              const id = row.original.id;
              if (!ids.includes(id)) {
                pushId(id);
                console.log(ids);
              }
            }
            if (!value) {
              const id = row.original.id;

              deleteId(id);
              console.log(ids);
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
  },
  {
    accessorKey: "name",
    header: "სახელი",
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
    cell: ({row}) => <span>{row.original.courierComment}</span>,
  },
  {
    accessorKey: "status",
    header: "სტატუსიიიი",
    cell: ({row}) => <span>{row.original.status}</span>,
  },

  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
];
