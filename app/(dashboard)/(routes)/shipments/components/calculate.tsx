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
import SpaceImage from "@/assets/images/space.png";
import { select } from "@material-tailwind/react";
import useAssignedCouriersStore from "@/hooks/assigned-couriers-store";
import { RoleGate } from "@/components/auth/role-gate";

interface WeightRange {
  label: string;
  prices: Record<string, number>;
}

interface ShippingCostGraphProps {
  hasInitialData: boolean;
  isCompany: boolean;
}

const ShippingCostGraph: React.FC<ShippingCostGraphProps> = ({
  hasInitialData,
  isCompany,
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
    calculated,
    setCalculated,
    weightPrice,
    setWeightPrice,
    ranges,
    setRanges,
    setCitiesNames,
    citiesNames,
  } = useCalculatorStore();
  let companyPayment: number = 0;
  let weightCost: any;
  useEffect(() => {
    // Check if initialData is true
    if (hasInitialData || calculated) {
      // Find the WeightRange object with the matching label
      const selectedRange = ranges.find((rang) => rang.label === range) || null;
      setSelectedRange(selectedRange);
      if (!selectedRange) return;
      setRange(selectedRange.label);
      setCity(selectedCity);
      weightCost = selectedRange?.prices[selectedCity].toString();

      if (!weightCost) return;
      setWeightPrice(weightCost);
      setPackagingUsed(packagingUsed);
    }
  }, [selectedCity]);
  const handleCheckboxChange = (range: WeightRange) => {
    const newRange =
      selectedRange && selectedRange.label === range.label ? null : range;
    setSelectedRange(newRange);
    weightCost = weightCost = selectedRange?.prices[selectedCity].toString();
    if (!weightCost) return;
    setWeightPrice(weightCost);
    calculateTotalPrice(newRange, packagingUsed);
    setRange(range.label);
  };

  const handlePackagingServiceChange = (isChecked: boolean) => {
    setPackagingUsed(isChecked); // Update the global state
    calculateTotalPrice(selectedRange, isChecked); // Recalculate total price
  };

  const calculateTotalPrice = (
    range: WeightRange | null,
    usePackaging: boolean,
    city: string = selectedCity,
    selectedPartyParam: "Sender" | "Receiver" | "Invoice" | "" = selectedParty,
    itemPrice: number = useCalculatorStore.getState().itemPrice === ""
      ? 0
      : parseFloat(useCalculatorStore.getState().itemPrice)
  ) => {
    let shipmentPrice = 0;

    if (range) {
      shipmentPrice += range.prices[city];
    }

    if (usePackaging) {
      shipmentPrice += 5; // Add 1 GEL for packaging service
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
      ranges.find((range) => range.label === selectedLabel) || null;
    setSelectedRange(selectedRange);
    weightCost = weightCost = selectedRange?.prices[selectedCity];

    if (!weightCost) return;
    setWeightPrice(weightCost);
    calculateTotalPrice(selectedRange, packagingUsed);
    setRange(selectedLabel);
  };

  const handlePartyChange = (newParty: "Sender" | "Receiver" | "Invoice") => {
    setSelectedParty(newParty);
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
    const selectedWeightRange = ranges.find((r) => r.label === range) || null;
    setSelectedRange(selectedWeightRange);
    weightCost = weightCost = selectedRange?.prices[selectedCity];
    calculateTotalPrice(
      selectedWeightRange,
      packagingUsed,
      selectedCity,
      selectedParty,
      parseFloat(itemPrice)
    );
  }, [selectedCity, range, itemPrice]);
  useEffect(() => {
    if (calculated) {
      const initialSelectedRange = ranges.find((r) => r.label === range);
      if (!initialSelectedRange) return;
      // Set the selected range based on the found object or null

      setSelectedRange(initialSelectedRange);
      weightCost = weightCost = selectedRange?.prices[selectedCity];

      if (!weightCost) return;
      setWeightPrice(weightCost);
      handleWeightRangeChange(range);
      setSelectedParty(selectedParty);
      calculateTotalPrice(
        initialSelectedRange,
        packagingUsed,
        selectedCity,
        selectedParty,
        parseFloat(itemPrice)
      );
    }
  }, [calculated, setCalculated]);
  companyPayment = packagingUsed
    ? parseFloat(itemPrice) - parseFloat(weightPrice) - 5
    : parseFloat(itemPrice) - parseFloat(weightPrice);
  useEffect(() => {
    companyPayment > 0
      ? (companyPayment = companyPayment - 2 * companyPayment)
      : (companyPayment = companyPayment);
  }, [companyPayment]);
  const { assignedCouriers } = useAssignedCouriersStore();
  console.log("🚀 ~ assignedCouriers:", assignedCouriers);
  return (
    <>
      <div className="w-full self-center flex flex-row xl:gap-2 mx-4 rounded-sm justify-center">
        <div className="  xl:flex xl:w-1/2 justify-center xl:p-6 rounded-s-md">
          <div className="w-11/12 flex justify-center items-center ">
            {/* <Image
              className="hidden lg:hidden"
              src={SpaceImage}
              alt="space"
              width={500}
              height={500}
            /> */}
            <RoleGate allowedRole="ADMIN">
              <div className="flex flex-col">
                {assignedCouriers.map((item: any) => {
                  return <p>{item}</p>;
                })}
              </div>
            </RoleGate>
          </div>
        </div>
        <Divider
          type="vertical"
          className="h-auto bg-transparent w-1.5 mt-4 border-none hidden xl:block"
        />
        <div className="w-4/5 self-center max-[410px]:w-full md:w-full md:self-auto rounded-2xl flex flex-col xl:w-1/2 xl:self-end md:p-2 xl:pb-2 bg-slate-200 mt-2 ">
          <div>
            <h2 className="w-full p-4 mt-10 scroll-m-20 border-b pb-6 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
              გამოთვლა
            </h2>
          </div>
          <div className="w-4/5 self-center md:w-full md:self-auto flex flex-col md:flex-row xl:gap-8 justify-center gap-8  mb-8">
            <div className="w-full md:w-2/5 xl:w-2/5">
              <div className="w-full flex gap-4 md:gap-8 flex-col">
                <div>
                  <div className="flex w-full flex-col sm:flex-row justify-between gap-4 mt-4">
                    <div className="w-full self-center sm:self-auto rounded-md">
                      <Select
                        value={selectedParty || ""}
                        onValueChange={(value) =>
                          handlePartyChange(
                            value as "Sender" | "Receiver" | "Invoice"
                          )
                        }
                      >
                        <SelectTrigger className=" bg-white">
                          <SelectValue placeholder="გადამხდელი მხარე" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sender">გამგზავნი</SelectItem>
                          <SelectItem value="Receiver">მიმღები</SelectItem>
                          {isCompany ? (
                            <SelectItem value="Invoice">ინვოისი</SelectItem>
                          ) : null}
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
                    value={Number.isNaN(parseFloat(itemPrice)) ? "" : itemPrice}
                    placeholder="COD ნივთის საფასური"
                    onChange={(e) => {
                      handleItemPriceChange(Number(e.target.value));
                    }}
                  />
                </div>

                <div className="flex w-full flex-col sm:flex-row justify-between gap-4">
                  <div className="w-full self-center sm:self-auto min-w-[116px] bg-white">
                    <Select
                      value={range}
                      onValueChange={handleWeightRangeChange}
                    >
                      <SelectTrigger value={range}>
                        <SelectValue placeholder={range} />
                      </SelectTrigger>
                      <SelectContent>
                        {ranges.map((range) => (
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

            <div className="w-auto mt-4 md:mt-0 ">
              <div className="w-full flex flex-col justify-between">
                <div className="flex w-full text-center md:text-start flex-col gap-10 text-wh md:ml-4">
                  <div className="flex md:justify-start text-center mt-4">
                    <div className=" text-base md:text-lg xl:text-xl  leading-5 text-black text-primary">
                      <Typography.Title
                        level={5}
                        style={{ marginTop: "4px", marginRight: "10px" }}
                      >
                        შეფუთვის სერვისი +5 ლარი
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
                        count={
                          Number.isNaN(parseFloat(itemPrice)) ? 0 : itemPrice
                        }
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
                message="მომსახურების თანხის გადახდა უნდა მოხდეს შეკვეთის აღების დროს"
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
              count={`${Number.isNaN(totalPrice) ? 0 : totalPrice} ₾`}
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
            {selectedParty === "Invoice" ? (
              <>
                <Typography.Title level={3} style={{ margin: "10px" }}>
                  {companyPayment > 0
                    ? "კომმპანიას ერიცხება"
                    : "კომპანია რიცხავს"}
                </Typography.Title>
                <Badge
                  color="gray"
                  className="text-md mt-3"
                  status="success"
                  count={`${companyPayment > 0 ? "+" : ""}${companyPayment} ₾`}
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
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ShippingCostGraph;
