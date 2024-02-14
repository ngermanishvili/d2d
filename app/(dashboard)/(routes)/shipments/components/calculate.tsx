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
} from "chart.js";
import photo from "../../../../../assets/images/d2d.jpg";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { string } from "zod";
import { Alert, Card } from "antd";
import Image from "next/image";

interface WeightRange {
  label: string;
  tbilisiPrice: number;
  rustaviPrice: number;
}

const weightRanges: WeightRange[] = [
  { label: "0-5 kg", tbilisiPrice: 5, rustaviPrice: 6 },
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
    setCity,
    packagingUsed,
    setPackagingUsed,
    selectedRange,
    selectedParty,
    setSelectedParty,
    itemPrice,
    setItemPrice,
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
  // const handleCityChange = (newCity: "Tbilisi" | "Rustavi") => {
  //   setCity(newCity);
  //   calculateTotalPrice(selectedRange, packagingUsed, newCity);
  // };
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

    let TotalPrice = shipmentPrice;

    // Update the cost and total price in the global state
    setShipmentCost(shipmentPrice);
    setItemPrice(itemPrice);
    setTotalPrice(TotalPrice);

    if (itemPrice !== 0) {
      setTotalPrice(TotalPrice + itemPrice);
    }
  };

  const handleWeightRangeChange = (selectedLabel: string) => {
    const selectedRange =
      weightRanges.find((range) => range.label === selectedLabel) || null;
    setSelectedRange(selectedRange);
    calculateTotalPrice(selectedRange, packagingUsed);
    setRange(selectedLabel);
  };

  const handlePartyChange = (newParty: "Sender" | "Receiver") => {
    if (selectedParty === "Sender" && newParty === "Receiver") {
      setTotalPrice(totalPrice - parseFloat(itemPrice));
      setItemPrice(0);
      setSelectedParty(newParty);
      return;
    }
    setSelectedParty(newParty);
    calculateTotalPrice(selectedRange, packagingUsed, selectedCity, newParty);
  };

  const handleItemPriceChange = (newItemPrice: number) => {
    setItemPrice(newItemPrice);
    setTotalPrice(parseFloat(itemPrice) + shipmentCost);
    calculateTotalPrice(
      selectedRange,
      packagingUsed,
      selectedCity,
      selectedParty,
      newItemPrice
    );
  };
  useEffect(() => {
    calculateTotalPrice(selectedRange, packagingUsed, selectedCity);
  }, [setCity, selectedCity]);

  return (
    <>
      <div className="w-full flex flex-row gap-4 rounded-sm justify-center ">
        <div className=" hidden xl:flex xl:w-1/2 justify-center xl:p-6 rounded-s-md">
          <div className=" w-11/12 flex justify-center items-center">
            <Image
              className="w-full rounded-lg"
              alt="alo"
              height={500}
              src={photo}
            />
          </div>
        </div>
        <div className="w-full  bg-slate-300 xl:w-1/2 xl:self-end xl:pl-10 xl:pb-2 ">
          {" "}
          <h2 className="w-full mt-10 scroll-m-20 border-b pb-6 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
            კალკულატორი
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="w-full md:w-1/2">
              <div className="w-full flex gap-4 md:gap-8 flex-col">
                <div>
                  <div className="flex w-full flex-col sm:flex-row justify-between gap-1">
                    <h4 className=" relative rounded bg-blue-100 w-full px-[0.3rem] py-[6px] font-mono text-md font-semibold flex items-center justify-center text-md">
                      გადამხდელი მხარე
                    </h4>
                    <div className="w-4/5 self-center sm:self-auto rounded-md bg-white">
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

                <div className="flex w-full flex-col sm:flex-row justify-between align-middle gap-1">
                  <label
                    htmlFor="item-price"
                    className="text-md flex items-center justify-center relative rounded bg-blue-100 w-full px-[0.3rem] py-[6px] font-mono text-md font-semibold"
                  >
                    ნივთის საფასური
                  </label>

                  <input
                    className="w-4/5 self-center sm:self-auto min-w-[116px] h-[36px] bg-transparent rounded-md border text-popover-foreground shadow-md text-md md:text-base bg-white"
                    type="text"
                    id="item-price"
                    value={itemPrice}
                    disabled={selectedParty === "Receiver" ? true : false}
                    onChange={(e) => {
                      handleItemPriceChange(Number(e.target.value));
                    }}
                  />
                </div>

                <div className="flex w-full flex-col sm:flex-row justify-between gap-1">
                  <h4 className="relative rounded bg-blue-100 w-full px-[0.3rem] py-[6px] font-mono text-md font-semibold flex items-center justify-center text-md">
                    გზავნილის წონა
                  </h4>
                  <div className="w-4/5 self-center sm:self-auto min-w-[116px] bg-white">
                    <Select
                      value={selectedRange?.label || ""}
                      onValueChange={handleWeightRangeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="წონა" />
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
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="w-full flex flex-col justify-center">
                <div className="flex w-full text-center md:text-start flex-col gap-8 text-wh md:ml-4">
                  <div className="flex md:justify-start text-center justify-center gap-2">
                    <label
                      htmlFor="packaging-service"
                      className="text-base md:text-lg xl:text-xl  leading-5 text-black text-primary"
                    >
                      <p className=" rounded-sm leading-7 [&:not(:first-child)]:mt-6 md:text-lg xl:text-xl">
                        შეფუთის სერვისი <br /> (+1 ლარი)
                      </p>
                    </label>
                    <input
                      className="w-5 h-5 mt-2 "
                      type="checkbox"
                      id="packaging-service"
                      checked={packagingUsed}
                      onChange={(e) =>
                        handlePackagingServiceChange(e.target.checked)
                      }
                    />
                  </div>
                  <h2 className="text-base h-[36px] pb-1 pt-1 md:text-lg xl:text-xl">
                    შეკვეთის ფასი - {shipmentCost} ლარი
                  </h2>

                  <>
                    <h2 className="text-base h-[36px] pb-1 pt-1 md:text-lg xl:text-xl">
                      ნივთის ღირებულება - {itemPrice === "" ? 0 : itemPrice}{" "}
                      ლარი
                    </h2>
                    <h2 className="text-base md:text-lg xl:text-xl h-[36px] pb-1 pt-1">
                      ჯამური ფასი - {totalPrice} ლარი
                    </h2>
                  </>
                </div>
              </div>
            </div>
          </div>
          {selectedParty === "Sender" ? (
            <div className="w-full text-center">
              <Alert
                className="w-5/6 sm:w-1/2 mx-auto"
                message="თანხის გადახდა უნდა მოხდეს შეკვეთის აღების დროს"
                type="info"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default ShippingCostGraph;
{
}
