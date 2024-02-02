"use client";
import useCalculatorStore from "@/hooks/calculate-price"; // Adjust the path as
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { string } from "zod";

interface WeightRange {
  label: string;
  tbilisiPrice: number;
  rustaviPrice: number;
}

const weightRanges: WeightRange[] = [
  { label: "0-5 kg", tbilisiPrice: 4, rustaviPrice: 6 },
  { label: "5-10 kg", tbilisiPrice: 7, rustaviPrice: 10 },
  { label: "10-15 kg", tbilisiPrice: 8, rustaviPrice: 11 },
  { label: "15-20 kg", tbilisiPrice: 9, rustaviPrice: 13 },
  { label: "20-25 kg", tbilisiPrice: 11, rustaviPrice: 15 },
  { label: "25-30 kg", tbilisiPrice: 12, rustaviPrice: 16 },
  { label: "30-40 kg", tbilisiPrice: 13, rustaviPrice: 17 },
  { label: "40-50 kg", tbilisiPrice: 16, rustaviPrice: 21 },
  { label: "50-75 kg", tbilisiPrice: 28, rustaviPrice: 35 },
  { label: "75-100 kg", tbilisiPrice: 38, rustaviPrice: 47 },
  { label: "100-150 kg", tbilisiPrice: 50, rustaviPrice: 62 },
];
interface ShippingCostGraphProps {
  hasInitialData: boolean;
}

const ShippingCostGraph: React.FC<ShippingCostGraphProps> = ({
  hasInitialData,
}) => {
  const [selectedRange, setSelectedRange] = useState<WeightRange | null>(null);

  const {
    selectedParty,
    setSelectedParty,
    itemPrice,
    setItemPrice,
    shipmentCost,
    setShipmentCost,
    packagingUsed,
    setPackagingUsed,
    selectedCity,
    range,
    setRange,
    setCity,
    totalPrice,
    setTotalPrice,
  } = useCalculatorStore();

  useEffect(() => {
    // Check if initialData is true
    if (hasInitialData) {
      // Find the WeightRange object with the matching label
      const initialSelectedRange = weightRanges.find((r) => r.label === range);

      // Set the selected range based on the found object or null
      setSelectedRange(initialSelectedRange || null);
      console.log("calculates LOG");
      setCity(selectedCity);
      setPackagingUsed(packagingUsed);
      calculateTotalPrice(selectedRange, packagingUsed, selectedCity);
    }
  }, [
    range,
    setRange,
    selectedCity,
    packagingUsed,
    setPackagingUsed,
    selectedRange,
    selectedParty,
    setSelectedParty,
  ]);
  const handleCheckboxChange = (range: WeightRange) => {
    const newRange =
      selectedRange && selectedRange.label === range.label ? null : range;
    setSelectedRange(newRange);
    calculateTotalPrice(newRange, packagingUsed);
    setRange(range.label);
  };

  const handlePackagingServiceChange = (isChecked: boolean) => {
    setPackagingUsed(isChecked); // Update the global state
    calculateTotalPrice(selectedRange, isChecked); // Recalculate total price
  };
  const handleCityChange = (newCity: "Tbilisi" | "Rustavi") => {
    setCity(newCity);
    calculateTotalPrice(selectedRange, packagingUsed, newCity);
  };
  const calculateTotalPrice = (
    range: WeightRange | null,
    usePackaging: boolean,
    city: string = selectedCity,
    selectedPartyParam: "Sender" | "Receiver" = selectedParty,
    itemPrice: number = useCalculatorStore.getState().itemPrice === ""
      ? 0
      : parseFloat(useCalculatorStore.getState().itemPrice)
  ) => {
    let shipmentPrice = 0;

    if (range) {
      shipmentPrice +=
        city === "Tbilisi" ? range.tbilisiPrice : range.rustaviPrice;
    }

    if (usePackaging) {
      shipmentPrice += 1; // Add 1 GEL for packaging service
    }

    let totalPrice = shipmentPrice;

    if (selectedPartyParam === "Receiver") {
      // Add item price if the receiver is paying
      totalPrice += itemPrice;
    }

    // Update the cost and total price in the global state
    setShipmentCost(shipmentPrice);
    setItemPrice(itemPrice);
    setTotalPrice(totalPrice);
  };

  const handleWeightRangeChange = (selectedLabel: string) => {
    const selectedRange =
      weightRanges.find((range) => range.label === selectedLabel) || null;
    setSelectedRange(selectedRange);
    calculateTotalPrice(selectedRange, packagingUsed);
    setRange(selectedLabel);
  };

  const handlePartyChange = (newParty: "Sender" | "Receiver") => {
    setSelectedParty(newParty);
    calculateTotalPrice(selectedRange, packagingUsed, selectedCity, newParty);
  };

  const handleItemPriceChange = (newItemPrice: number) => {
    setItemPrice(newItemPrice);
    calculateTotalPrice(
      selectedRange,
      packagingUsed,
      selectedCity,
      selectedParty,
      newItemPrice
    );
  };

  return (
    <>
      <div className="container w-full pt-4 pb-4 flex flex-col bg-slate-200 gap-4 justify-center">
        <h2 className="w-full mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
          კალკულატორი
        </h2>
        <div className="w-full flex flex-row gap-8 mb-8">
          <div className="w-1/2">
            <div className="w-full flex gap-8 flex-col">
              <div>
                <div className="flex w-full justify-between gap-1">
                  <p className=" text-2xl leading-8 [&:not(:first-child)]:mt-6 w-2/5">
                    გადამხდელი მხარე
                  </p>
                  <p className=" text-2xl leading-9 :mt-6">:</p>
                  <div className="w-1/2">
                    <Select
                      value={selectedParty || ""}
                      onValueChange={(value) =>
                        handlePartyChange(value as "Sender" | "Receiver")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="აირჩიეთ გადამხდელი მხარე" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sender">გამგზავნი</SelectItem>
                        <SelectItem value="Receiver">მიმღები</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {selectedParty === "Receiver" && (
                <div className="flex w-full justify-between align-middle gap-1">
                  <label
                    htmlFor="item-price"
                    className="text-2xl leading-8 [&:not(:first-child)]:mt-6 w-2/5"
                  >
                    ნივთის საფასური
                  </label>
                  <p className=" text-2xl leading-9 :mt-6">:</p>
                  <input
                    className="w-1/2 bg-transparent rounded-md border text-popover-foreground shadow-md pl-[2px] "
                    type="text"
                    id="item-price"
                    value={itemPrice}
                    onChange={(e) => {
                      handleItemPriceChange(Number(e.target.value));
                    }}
                  />
                </div>
              )}
              <div className="flex w-full justify-between gap-1">
                <p className=" text-2xl leading-8 [&:not(:first-child)]:mt-6 w-2/5">
                  გზავნილის წონა
                </p>
                <p className=" text-2xl leading-9 :mt-6">:</p>

                <div className="w-1/2">
                  <Select
                    value={selectedRange?.label || ""}
                    onValueChange={handleWeightRangeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight range" />
                    </SelectTrigger>
                    <SelectContent>
                      {weightRanges.map((range) => (
                        <SelectItem key={range.label} value={range.label}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex w-full justify-between gap-1">
                <p className=" text-2xl leading-8 [&:not(:first-child)]:mt-6 w-2/5">
                  შეკვეთის ქალაქი
                </p>
                <p className=" text-2xl leading-9 :mt-6">:</p>
                <div className="w-1/2">
                  <Select
                    value={selectedCity || ""}
                    onValueChange={(value) =>
                      handleCityChange(value as "Tbilisi" | "Rustavi")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="აირჩიეთ ქალაქი" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tbilisi">თბილისი</SelectItem>
                      <SelectItem value="Rustavi">რუსთავი</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 ml-8">
            <div className="w-full flex flex-col gap-8">
              <div className="flex justify-start align-baseline gap-3 h-[36px] pt-1.5 ml-4">
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  id="packaging-service"
                  checked={packagingUsed}
                  onChange={(e) =>
                    handlePackagingServiceChange(e.target.checked)
                  }
                />
                <label
                  htmlFor="packaging-service"
                  className="text-xl leading-5 text-black text-primary"
                >
                  შეფუთის სერვისი (ღირებულება 1ლარი)
                </label>
              </div>
              <div className="flex justify-start flex-col h-[36px] ml-4">
                <div className="flex flex-col gap-8">
                  <h2 className="text-2xl h-[36px] pb-1 pt-1">
                    შიპმენტის ფასი: {shipmentCost} ლარი
                  </h2>
                  {selectedParty === "Receiver" && (
                    <>
                      <h2 className="text-2xl h-[36px] pb-1 pt-1">
                        ნივთის ღირებულება: {itemPrice === "" ? 0 : itemPrice}{" "}
                        ლარი
                      </h2>
                      <h2 className="text-2xl h-[36px] pb-1 pt-1">
                        ჯამური ფასი: {totalPrice} ლარი
                      </h2>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShippingCostGraph;
