"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ShipmentColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/date-table-accountant";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { useSearchKeyStore } from "@/hooks/search-key-store";
import ShipmentFormXLSX from "../../shipments/[shipmentId]/components/shipment-xlsx";
import useInvoiceStore from "@/hooks/invoice-store";
import { useidSetStore } from "@/hooks/select-store";
import { useShipmentStoreXLSX } from "@/hooks/xlsx-shipment-store";

interface ShipmentClientProps {
  data: ShipmentColumn[];
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [initialData, setInitialData] = useState<ShipmentColumn[]>(data);

  const [filteredData, setFilteredData] = useState<ShipmentColumn[]>(data);
  const {
    totalDifs,
    setTotalDifs,
    setTotalPackagePrices,
    setTotalWeightPrices,
    setTotalOfTotals,
    settotalCompanyPays,
    settotalItemPrices,
  } = useInvoiceStore();
  const { ids } = useidSetStore();
  const amountInTotal = filteredData
    .filter((shipmentsTofilter) => {
      return (
        shipmentsTofilter.status === "ჩაბარებული" &&
        ids.includes(shipmentsTofilter.id)
      );
    })
    .map((shipmentToMap) => shipmentToMap.price);
  const amountInTotalOfDifs = filteredData
    .filter((shipmentsTofilter) => {
      return (
        shipmentsTofilter.status === "ჩაბარებული" &&
        ids.includes(shipmentsTofilter.id)
      );
    })
    .map((shipmentToMap) =>
      shipmentToMap.priceDif ? shipmentToMap.priceDif : "0"
    );
  const amountInTotalOfWeightPrices = filteredData
    .filter((shipmentsTofilter) => {
      return (
        shipmentsTofilter.status === "ჩაბარებული" &&
        ids.includes(shipmentsTofilter.id)
      );
    })
    .map((shipmentToMap) => {
      return shipmentToMap.weightPrice ? shipmentToMap.weightPrice : "0";
    });
  const amountInTotalOfPackagePrices = filteredData
    .filter((shipmentsTofilter) => {
      return (
        shipmentsTofilter.status === "ჩაბარებული" &&
        ids.includes(shipmentsTofilter.id)
      );
    })
    .map((shipmentToMap) => {
      return shipmentToMap.packagePrice ? shipmentToMap.packagePrice : "0";
    });
  const amountInTotalOfCompanyPays = filteredData
    .filter((shipmentsTofilter) => {
      return (
        shipmentsTofilter.status === "ჩაბარებული" &&
        ids.includes(shipmentsTofilter.id)
      );
    })
    .map((shipmentToMap) => {
      return shipmentToMap.companyPays ? shipmentToMap.companyPays : "0";
    });
  const amountInTotalOfitemPrices = filteredData
    .filter((shipmentsTofilter) => {
      return (
        shipmentsTofilter.status === "ჩაბარებული" &&
        ids.includes(shipmentsTofilter.id)
      );
    })
    .map((shipmentToMap) => {
      return shipmentToMap.itemPrice ? shipmentToMap.itemPrice : "0";
    });
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
      return shipmentToFilter.status === "ჩაბარებული";
    })
    .map((shipmentToMap) => shipmentToMap.price);
  const sumOfTotals = sumOfNumbersInArray(amountInTotal);
  const sumOfToday = sumOfNumbersInArray(amount);
  const sumOfDifs = sumOfNumbersInArray(amountInTotalOfDifs);
  const sumOfWeightPrices = sumOfNumbersInArray(amountInTotalOfWeightPrices);
  const sumOfPackagePrices = sumOfNumbersInArray(amountInTotalOfPackagePrices);
  const sumOfCompanyPays = sumOfNumbersInArray(amountInTotalOfCompanyPays);
  const sumOfItemPrices = sumOfNumbersInArray(amountInTotalOfitemPrices);
  const handleSearchKeyChange = () => {
    // Reset the filteredData whenever the searchKey changes
    setFilteredData(initialData);
  };
  const { filteredDataxlsx, setFilteredDataxlsx } = useShipmentStoreXLSX();

  useEffect(() => {
    // Listen for changes in the searchKey and reset filteredData
    handleSearchKeyChange();
  }, [searchKeyStore]); // Add any other dependencies as needed
  useEffect(() => {
    setTotalDifs(sumOfDifs.toString());
    setTotalPackagePrices(sumOfPackagePrices.toString());
    setTotalWeightPrices(sumOfWeightPrices.toString());
    setTotalOfTotals(sumOfTotals.toString());
    settotalCompanyPays(sumOfCompanyPays.toString());
    settotalItemPrices(sumOfItemPrices.toString());
    setFilteredDataxlsx(filteredData.filter((item) => ids.includes(item.id)));
  }, [ids, filteredData]);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`ჩაბარებული შეკვეთები (${data.length})`}
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
