"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/date-table-accountant";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { useSearchKeyStore } from "@/hooks/search-key-store";
import ShipmentFormXLSX from "../../shipments/[shipmentId]/components/shipment-xlsx";

interface ShipmentClientProps {
  data: ShipmentColumn[];
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);

  const handleDateRangeChange = (dateRange: DateRange) => {
    const filteredData = data.filter((shipment) => {
      const shipmentDate = new Date(shipment.createdAt);

      return (
        (!dateRange.from || shipmentDate >= dateRange.from) &&
        (!dateRange.to || shipmentDate <= dateRange.to)
      );
    });

    setFilteredData(filteredData);
  };

  const { searchKeyStore, setSearchKeyStore } = useSearchKeyStore();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`დასრულებული შეკვეთები (${data.length})`}
          description="აკონტროლე ყველა შეკვეთა ადმინკადან უსდტ"
        />
        <div>
          <ShipmentFormXLSX />
        </div>
      </div>
      <Separator />
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
      {filteredData.length > 0 ? (
        <>
          <DataTable
            searchKey={searchKeyStore}
            columns={columns}
            data={filteredData}
          />
        </>
      ) : (
        <DataTable
          searchKey={searchKeyStore}
          columns={columns}
          data={filteredData}
        />
      )}
    </>
  );
};
