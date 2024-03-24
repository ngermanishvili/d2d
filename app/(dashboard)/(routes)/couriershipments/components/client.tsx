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

  useEffect(() => {
    function addDays(date: any, days: any) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    // Get today's date
    const today = new Date();
    // Set time to 00:00:00 for today
    today.setHours(0, 0, 0, 0);

    // Get tomorrow's date
    const tomorrow = addDays(today, 1);

    // Create the 'fromto' object
    const fromto = {
      from: today,
      to: tomorrow,
    };

    console.log(fromto);

    const filterData = data.filter((shipment) => {
      let shipmentDate = new Date(shipment.createdAt);

      return (
        (!fromto.from || shipmentDate >= fromto.from) &&
        (!fromto.to || shipmentDate <= fromto.to)
      );
    });
    console.log("🚀 ~ filterData ~ filterData:", filterData);

    setFilteredData(filterData);
    calculateTotalPrice(filteredData);
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
