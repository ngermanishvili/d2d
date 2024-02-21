"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { CourierDataTable } from "@/components/ui/date-table-courier";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { useSearchKeyStore } from "@/hooks/search-key-store";

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
          title={`ჩემი შეკვეთები (${data.length})`}
          description="აკონტროლე ყველა შეკვეთა ადმინკადან უსდტ"
        />
      </div>
      <Separator />
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
      {filteredData.length > 0 ? (
        <>
          <CourierDataTable
            searchKey={searchKeyStore}
            columns={columns}
            data={filteredData}
          />
          <Heading title="APIss" description="api calls for shipmensdts" />
        </>
      ) : (
        <CourierDataTable
          searchKey={searchKeyStore}
          columns={columns}
          data={filteredData}
        />
      )}
    </>
  );
};
