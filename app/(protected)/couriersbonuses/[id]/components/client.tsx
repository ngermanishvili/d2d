"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { useState } from "react";

interface UserClientProps {
  data: ShipmentColumn[];
}

export const CourierShipmentsClient: React.FC<UserClientProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);

  const handleDateRangeChange = (dateRange: DateRange) => {
    const filteredData = data.filter((shipment) => {
      const shipmentDate = shipment.updatedAt;

      return (
        (!dateRange.from || shipmentDate >= dateRange.from) &&
        (!dateRange.to || shipmentDate <= dateRange.to)
      );
    });

    setFilteredData(filteredData);
  };

  return (
    <>
      <div className="flex  w-full justify-between">
        <Heading
          title={`კურიერის ბონუსი : ${data.length * 0.5} ლარი`}
          description={`კურიერის შეკვეთების ოდენობა(${data.length})`}
        />
      </div>
      <Separator />
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />

      <DataTable searchKey="address" columns={columns} data={filteredData} />
    </>
  );
};
