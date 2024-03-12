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
      const shipmentDate = new Date(shipment.updatedAt);

      return (
        (!dateRange.from || shipmentDate >= dateRange.from) &&
        (!dateRange.to || shipmentDate <= dateRange.to)
      );
    });

    setFilteredData(filteredData);
  };
  let bonus = filteredData.filter(
    (i) => i.status === "ჩაბარებული" || i.status === "დასრულებული"
  );

  return (
    <>
      <div className="flex  w-full justify-start flex-col">
        {" "}
        <Heading
          title={`კურიერის ბონუსი : ${bonus.length * 0.5} ₾`}
          description={`კურიერის შეკვეთების ოდენობა(${filteredData.length})`}
        />
        <Heading
          title={``}
          description={`კურიერის შესრულებული შეკვეთების ოდენობა ოდენობა(${bonus.length})`}
        />
        <Heading
          title=""
          description={`კურიერის ბონუსის დასათვლელად დააყენეთ ფილტრი ამ თვის პირველი რიცხვიდან შემდეგი თვის პირველ რიცხვამდე`}
        />
      </div>
      <Separator />
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />

      <DataTable searchKey="address" columns={columns} data={filteredData} />
    </>
  );
};
