"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { CourierDataTable } from "@/components/ui/date-table-courier";
import { DatePickerWithRange } from "@/components/ui/date-picker-courier";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface ShipmentClientProps {
  data: ShipmentColumn[];
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);

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

  const handleDateRangeChange = (dateRange: DateRange) => {
    const filteredData = data.filter((shipment) => {
      const shipmentDate = new Date(shipment.createdAt);

      return (
        (!dateRange.from || shipmentDate >= dateRange.from) &&
        (!dateRange.to || shipmentDate <= dateRange.to)
      );
    });

    setFilteredData(filteredData);
    calculateTotalPrice(filteredData);
  };

  useEffect(() => {}, [filteredData]);
  const today = new Date();
  const fromto = {
    from: today,
    to: addDays(today, 1),
  };

  useEffect(() => {
    handleDateRangeChange(fromto);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`დღევანდელი შეკვეთები - ${filteredData.length}`}
          description={`ჩემი შეკვეთები სულ - ${data.length}`}
        />
      </div>
      <Separator />
      <p className="text-md">აღებული თანხა: {totalPrice}</p>

      <DatePickerWithRange onDateRangeChange={() => {}} />
      {data.length > 0 ? (
        <>
          <CourierDataTable
            searchKey="name"
            columns={columns}
            data={filteredData}
          />
        </>
      ) : (
        <CourierDataTable
          searchKey="name"
          columns={columns}
          data={filteredData}
        />
      )}
    </>
  );
};
