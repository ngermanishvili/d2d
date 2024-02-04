"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/date-table";
import { ApiList } from "@/components/ui/api-list";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { useSearchKeyStore } from "@/hooks/search-key-store";
import { set } from "nprogress";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";

interface ShipmentClientProps {
  data: ShipmentColumn[];
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [initialData, setInitialData] = useState<ShipmentColumn[]>(data);
  const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);
  useState<ShipmentColumn[]>(data);
  const { searchKeyStore, setSearchKeyStore } = useSearchKeyStore();

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
  const amountInTotal = filteredData
    .filter((shipmentsTofilter) => {
      return shipmentsTofilter.status === "ჩაბარებული";
    })
    .map((shipmentToMap) => shipmentToMap.price);
  const sumOfNumbersInArray = (numberStrings: string[]): number => {
    let total = 0;

    for (const numStr of numberStrings) {
      try {
        const num = parseFloat(numStr); // Convert the string to a floating-point number
        if (!isNaN(num)) {
          total += num;
        }
      } catch (error) {
        console.error(`Skipping non-numeric value: ${numStr}`);
      }
    }

    return total;
  };

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    20,
    0,
    0
  );

  const amount = data
    .filter((shipmentToFilter) => {
      const updatedWithinToday =
        shipmentToFilter.updatedAt &&
        new Date(shipmentToFilter.updatedAt) >= startOfDay &&
        new Date(shipmentToFilter.updatedAt) <= endOfDay;

      return shipmentToFilter.status === "ჩაბარებული" && updatedWithinToday;
    })
    .map((shipmentToMap) => shipmentToMap.price);
  const sumOfTotals = sumOfNumbersInArray(amountInTotal);
  const sumOfToday = sumOfNumbersInArray(amount);
  console.log(
    "🚀 ~ ShipmentPage ~ sumofTotal:",
    sumOfTotals,
    "sum of this day",
    sumOfToday
  );
  useEffect(() => {
    // Calculate the sum of totals whenever filteredData or dateRange changes
    const sumOfTotals = sumOfNumbersInArray(
      filteredData
        .filter((shipmentsTofilter) => {
          return shipmentsTofilter.status === "ჩაბარებული";
        })
        .map((shipmentToMap) => shipmentToMap.price)
    );
  }, [filteredData]); // Add any dependencies that might change and trigger the effect

  const handleSearchKeyChange = () => {
    // Reset the filteredData whenever the searchKey changes
    setFilteredData(initialData);
  };

  useEffect(() => {
    // Listen for changes in the searchKey and reset filteredData
    handleSearchKeyChange();
  }, [searchKeyStore, ]); // Add any other dependencies as needed

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`შეკვეთები (${filteredData.length})`}
          description="შეკვეთების ისტორია"
        />
        <Button onClick={() => router.push(`/shipments/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          Add New
        </Button>
      </div>
      <Separator />
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
      <Heading
        title={`დროის ამ მონაკვეთში ჩაბარებული შეკვეთებით აღებული თანხა შეადგენს ${sumOfTotals} ლარს`}
        description="დროის მონაკვეთის შეცვლით იხილავთ ამ მონაკვეთში დაგროვებულ თანხას"
      />

      {filteredData.length > 0 ? (
        <>
          <DataTable
            searchKey={searchKeyStore}
            columns={columns}
            data={filteredData}
          />

          <Heading title="APIss" description="api calls for shipmensdts" />
          <Separator />
          <ApiList entityName="shipments" entityIdName="shipmentId" />
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
