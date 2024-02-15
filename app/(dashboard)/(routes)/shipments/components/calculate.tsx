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
import { Alert, Badge, Card, Divider, Typography } from "antd";
import Image from "next/image";

interface WeightRange {
  label: string;
  tbilisiPrice: number;
  rustaviPrice: number;
}

const weightRanges: WeightRange[] = [
  { label: "0-5 კგ", tbilisiPrice: 5, rustaviPrice: 6 },
  { label: "5-10 კგ", tbilisiPrice: 7, rustaviPrice: 10 },
  { label: "10-15 კგ", tbilisiPrice: 8, rustaviPrice: 11 },
  { label: "15-20 კგ", tbilisiPrice: 9, rustaviPrice: 13 },
  { label: "20-25 კგ", tbilisiPrice: 11, rustaviPrice: 15 },
  { label: "25-30 კგ", tbilisiPrice: 12, rustaviPrice: 16 },
  { label: "30-40 კგ", tbilisiPrice: 13, rustaviPrice: 17 },
  { label: "40-50 კგ", tbilisiPrice: 16, rustaviPrice: 21 },
  { label: "50-75 კგ", tbilisiPrice: 28, rustaviPrice: 35 },
  { label: "75-100 კგ", tbilisiPrice: 38, rustaviPrice: 47 },
  { label: "100-150 კგ", tbilisiPrice: 50, rustaviPrice: 62 },
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
    selectedPartyParam: "Sender" | "Receiver" | "" = selectedParty,
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
      <div className="w-full self-center flex flex-row gap-2 mx-4 rounded-sm justify-center">
        <div className=" hidden xl:flex xl:w-1/2 justify-center xl:p-6 rounded-s-md">
          <div className=" w-11/12 flex justify-center items-center"></div>
        </div>
        <Divider
          type="vertical"
          className="h-auto bg-transparent w-1.5 mt-4 border-none"
        />
        <div className="w-4/5 self-center max-[410px]:w-full md:w-full md:self-auto rounded-2xl flex flex-col xl:w-1/2 xl:self-end md:p-2 xl:pb-2 bg-slate-200 mt-2 ">
          <div>
            <h2 className="w-full p-4 mt-10 scroll-m-20 border-b pb-6 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
              გამოთვლა
            </h2>
          </div>
          <div className="w-4/5 self-center md:w-full md:self-auto flex flex-col md:flex-row xl:gap-8 justify-between gap-8  mb-8">
            <div className="w-full md:w-2/5 xl:w-2/5">
              <div className="w-full flex gap-4 md:gap-8 flex-col">
                <div>
                  <div className="flex w-full flex-col sm:flex-row justify-between gap-4 mt-4">
                    <div className="w-full self-center sm:self-auto rounded-md">
                      <Select
                        value={selectedParty || ""}
                        onValueChange={(value) =>
                          handlePartyChange(value as "Sender" | "Receiver")
                        }
                      >
                        <SelectTrigger className=" bg-white">
                          <SelectValue placeholder="გადამხდელი მხარე" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sender">გამგზავნი</SelectItem>
                          <SelectItem value="Receiver">მიმღები</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col sm:flex-row justify-between align-middle gap-4">
                  <input
                    className="w-full self-center sm:self-auto min-w-[116px] h-[36px] bg-transparent rounded-md border text-popover-foreground shadow-md text-md md:text-base bg-white focus:border-transparent focus:outline-none"
                    type="text"
                    id="item-price"
                    value={itemPrice === "0" ? "" : itemPrice}
                    placeholder="COD ნივთის საფასური"
                    disabled={
                      selectedParty === "Receiver" || selectedParty === "Sender"
                        ? false
                        : true
                    }
                    onChange={(e) => {
                      handleItemPriceChange(Number(e.target.value));
                    }}
                  />
                </div>

                <div className="flex w-full flex-col sm:flex-row justify-between gap-4">
                  <div className="w-full self-center sm:self-auto min-w-[116px] bg-white">
                    <Select
                      value={selectedRange?.label || ""}
                      onValueChange={handleWeightRangeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="გზავნილის წონა" />
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

            <div className="w-full md:w-6/12 xl:w-3/5 mt-4 md:mt-0 ">
              <div className="w-full flex flex-col justify-between">
                <div className="flex w-full text-center md:text-start flex-col gap-10 text-wh md:ml-4">
                  <div className="flex md:justify-start text-center mt-4">
                    <div className=" text-base md:text-lg xl:text-xl  leading-5 text-black text-primary">
                      <Typography.Title
                        level={5}
                        style={{ marginTop: "4px", marginRight: "10px" }}
                      >
                        შეფუთვის სერვისი +1 ლარი
                      </Typography.Title>
                    </div>
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
                  <div className="flex gap-2">
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      ფასი წონის მიხედვით -
                    </Typography.Title>
                    <Badge
                      color="gray"
                      className="text-md self-center"
                      status="processing"
                      count={shipmentCost}
                      showZero
                      overflowCount={99999}
                      style={{
                        width: "70px",
                        height: "25px",
                        maxWidth: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                  <>
                    <div className="flex gap-2">
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        ნივთის საფასური -
                      </Typography.Title>
                      <Badge
                        color="gray"
                        className="text-md self-center"
                        status="processing"
                        count={itemPrice === "" ? 0 : itemPrice}
                        showZero
                        overflowCount={99999}
                        style={{
                          width: "70px",
                          height: "25px",
                          maxWidth: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          {selectedParty === "Sender" ? (
            <div className="w-full text-center flex justify-center">
              <Alert
                className="w-[600px] max-w-[100%] px-4 my-8 self-center"
                message="თანხის გადახდა უნდა მოხდეს შეკვეთის აღების დროს"
                type="error"
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex gap-4 self-end text-sm sm:text-2xl">
            <Typography.Title level={3} style={{ margin: "10px" }}>
              ჯამი
            </Typography.Title>
            <Badge
              color="gray"
              className="text-md mt-3"
              status="success"
              count={`${totalPrice} ₾`}
              showZero
              overflowCount={99999}
              style={{
                width: "150px",
                height: "35px",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShippingCostGraph;
