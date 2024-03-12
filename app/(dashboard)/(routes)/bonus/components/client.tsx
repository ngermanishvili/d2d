"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { CourierDataTable } from "@/components/ui/date-table-courier";
import { DatePickerWithRange } from "./date-picker-courier";
import { DateRange } from "react-day-picker";
import { Tag } from "antd";

interface ShipmentClientProps {
  data: ShipmentColumn[];
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = (data: ShipmentColumn[]) => {
    setTotalPrice(data.length * 0.5);
  };
  useEffect(() => {
    calculateTotalPrice(filteredData);
  }, [filteredData]);

  return (
    <>
      <div className="flex items-center justify-start">
        <Tag color="blue" className="p-2 text-md">
          ასაღები ბონუსი: {data.length * 0.5} ₾
        </Tag>
      </div>
      <Separator />

      <DatePickerWithRange />
      {filteredData.length > 0 ? (
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
