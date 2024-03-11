"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { CourierDataTable } from "@/components/ui/date-table-courier";
import { DatePickerWithRange } from "@/components/ui/date-picker-courier";
import { DateRange } from "react-day-picker";

interface ShipmentClientProps {
  data: ShipmentColumn[];
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = (data: ShipmentColumn[]) => {
    let sum = 0;
    data.forEach((shipment) => {
      if (shipment.status === "აღებული" || shipment.status === "ჩაბარებული") {
        const price = parseFloat(shipment.price);
        if (!isNaN(price)) {
          sum += price;
        }
      }
    });
    setTotalPrice(sum);
  };
  useEffect(() => {
    calculateTotalPrice(data);
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`ჩემი შეკვეთები (${data.length})`}
          description="შენი ყველა აქტიური შეკვეთა"
        />
      </div>
      <Separator />
      <p className="text-md">აღებული თანხა: {totalPrice}</p>

      <DatePickerWithRange onDateRangeChange={() => {}} />
      {data.length > 0 ? (
        <>
          <CourierDataTable searchKey="name" columns={columns} data={data} />
        </>
      ) : (
        <CourierDataTable searchKey="name" columns={columns} data={data} />
      )}
    </>
  );
};
