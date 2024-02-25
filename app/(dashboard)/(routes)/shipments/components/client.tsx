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
import ShipmentFormXLSX from "../[shipmentId]/components/shipment-xlsx";
import useInvoiceStore from "@/hooks/invoice-store";

interface ShipmentClientProps {
  data: ShipmentColumn[];
  formattedCosts: {
    id: string;
    city: string;
    village: string;
    weightRange: string;
    price: string;
    villagePrice: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
interface Cost {
  id: string;
  city: string;
  village: string;
  weightRange: string;
  price: string;
  villagePrice: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GroupedCosts {
  [key: string]: {
    weightRanges: {
      weightRange: string;
      price: string;
      villagePrice: string;
    }[];
    villages?: {
      name: string;
      weightRanges: {
        weightRange: string;
        price: string;
        villagePrice: string;
      }[];
    }[];
  };
}

export const ShipmentClient: React.FC<ShipmentClientProps> = ({
  data,
  formattedCosts,
}) => {
  const groupCostsByCity = (formattedCosts: Cost[]): GroupedCosts => {
    return formattedCosts.reduce<GroupedCosts>((acc, cost) => {
      const { city, village, weightRange, price, villagePrice } = cost;
      const key = city;

      if (!acc[key]) {
        acc[key] = { weightRanges: [], villages: [] };
      }

      if (village) {
        const existingVillage = acc[key].villages?.find(
          (v) => v.name === village
        );
        if (existingVillage) {
          existingVillage.weightRanges.push({
            weightRange,
            price,
            villagePrice,
          });
        } else {
          acc[key].villages?.push({
            name: village,
            weightRanges: [{ weightRange, price, villagePrice }],
          });
        }
      } else {
        acc[key].weightRanges.push({ weightRange, price, villagePrice });
      }

      return acc;
    }, {});
  };
  // Usage
  const groupedCosts: GroupedCosts = groupCostsByCity(formattedCosts);
  console.log(groupedCosts);
  const router = useRouter();
  const params = useParams();
  const {
    totalDifs,
    setTotalDifs,
    setTotalPackagePrices,
    setTotalWeightPrices,
    setTotalOfTotals,
  } = useInvoiceStore();
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
  const amountInTotalOfDifs = filteredData
    .filter((shipmentsTofilter) => {
      return shipmentsTofilter.status === "ჩაბარებული";
    })
    .map((shipmentToMap) =>
      shipmentToMap.priceDif ? shipmentToMap.priceDif : "0"
    );
  const amountInTotalOfWeightPrices = filteredData
    .filter((shipmentsTofilter) => {
      return shipmentsTofilter.status === "ჩაბარებული";
    })
    .map((shipmentToMap) => {
      return shipmentToMap.weightPrice ? shipmentToMap.weightPrice : "0";
    });
  const amountInTotalOfPackagePrices = filteredData
    .filter((shipmentsTofilter) => {
      return shipmentsTofilter.status === "ჩაბარებული";
    })
    .map((shipmentToMap) => {
      return shipmentToMap.packagePrice ? shipmentToMap.packagePrice : "0";
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
  const sumOfDifs = sumOfNumbersInArray(amountInTotalOfDifs);
  const sumOfWeightPrices = sumOfNumbersInArray(amountInTotalOfWeightPrices);
  const sumOfPackagePrices = sumOfNumbersInArray(amountInTotalOfPackagePrices);
  const handleSearchKeyChange = () => {
    // Reset the filteredData whenever the searchKey changes
    setFilteredData(initialData);
  };

  useEffect(() => {
    // Listen for changes in the searchKey and reset filteredData
    handleSearchKeyChange();
  }, [searchKeyStore]); // Add any other dependencies as needed
  useEffect(() => {
    setTotalDifs(sumOfDifs.toString());
    setTotalPackagePrices(sumOfPackagePrices.toString());
    setTotalWeightPrices(sumOfWeightPrices.toString());
    setTotalOfTotals(sumOfTotals.toString());
  }, [filteredData]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`შეკვეთები (${filteredData.length})`}
          description="შეკვეთების ისტორია"
        />
        {/* <Button onClick={() => router.push(`/shipments/new`)}>
          <Plus className="mr-2 h-4 w-4 " />
          შეკვეთის დამატება
        </Button> */}
        <div>
          <ShipmentFormXLSX />
        </div>
      </div>

      <Separator />
      <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
      <Heading
        title={`${sumOfTotals},${sumOfDifs},${sumOfPackagePrices},${sumOfWeightPrices} -დროის ამ მონაკვეთში  სრული საფასურის ჯამია:${sumOfTotals}, სრულ საფასურს მინუს ნივთის საფასურების ჯამია: ${sumOfDifs}, წონის საფასურის ჯამი: ${sumOfWeightPrices}, შეფუთვის სერვისის საფასურის ჯამია: ${sumOfPackagePrices} `}
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

// useEffect(() => {
//   const sumOfDifs = sumOfNumbersInArray(
//     filteredData
//       .filter((shipmentsTofilter) => {
//         return shipmentsTofilter.status === "ჩაბარებული";
//       })
//       .map((shipmentToMap) => shipmentToMap.price)
//   );
//   // Calculate the sum of totals whenever filteredData or dateRange changes
//   const sumOfTotals = sumOfNumbersInArray(
//     filteredData
//       .filter((shipmentsTofilter) => {
//         return shipmentsTofilter.status === "ჩაბარებული";
//       })
//       .map((shipmentToMap) => shipmentToMap.price)
//   );
// }, [filteredData]);
