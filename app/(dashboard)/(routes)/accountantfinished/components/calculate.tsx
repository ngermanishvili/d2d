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
  const handleCityChange = (newCity: "თბილისი" | "რუსთავი") => {
    setCity(newCity);
    calculateTotalPrice(selectedRange, packagingUsed, newCity);
  };
  const calculateTotalPrice = (
    range: WeightRange | null,
    usePackaging: boolean,
    city: string = selectedCity,
    selectedPartyParam: "Sender" | "Receiver" | "Invoice" | "" = selectedParty,
    itemPrice: number = parseInt(useCalculatorStore.getState().itemPrice)
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

  const handlePartyChange = (newParty: "Sender" | "Receiver"|"Invoice") => {
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
      <div>
        <label htmlFor="party-select" className="text-2xl">
          Choose who pays:{" "}
        </label>
        <select
          className="text-2xl text-red-400 text-bold"
          id="party-select"
          value={selectedParty}
          onChange={(e) =>
            handlePartyChange(e.target.value as "Sender" | "Receiver"|"Invoice")
          }
        >
          <option value="Sender">Sender</option>
          <option value="Receiver">Receiver</option>
        </select>
      </div>
      {selectedParty === "Receiver" && (
        <div>
          <label htmlFor="item-price" className="text-2xl">
            Enter item price:{" "}
          </label>
          <input
            type="number"
            id="item-price"
            value={itemPrice}
            onChange={(e) => handleItemPriceChange(Number(e.target.value))}
          />
        </div>
      )}
      <div>
        <label htmlFor="city-select" className="text-2xl">
          Choose a city:{" "}
        </label>
        <select
          className="text-2xl text-red-400 text-bold"
          id="city-select"
          value={selectedCity}
          onChange={(e) =>
            handleCityChange(e.target.value as "თბილისი" | "რუსთავი")
          }
        >
          <option value="თბილისი">Tbilisi</option>
          <option value="რუსთავი">Rustavi</option>
        </select>
      </div>
      <div>
        {weightRanges.map((range) => (
          <div key={range.label}>
            <input
              type="checkbox"
              id={range.label}
              checked={selectedRange?.label === range.label}
              onChange={() => handleCheckboxChange(range)}
            />
            <label htmlFor={range.label}>{range.label}</label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          className="w-8 h-8"
          type="checkbox"
          id="packaging-service"
          checked={packagingUsed}
          onChange={(e) => handlePackagingServiceChange(e.target.checked)}
        />
        <label htmlFor="packaging-service" className="text-xl text-red-600">
          გსურთ შეფუთვის სერვისით სარგებლობა? <br /> (შეფუთვის ღირებულება 1
          ლარი)
        </label>
      </div>
      <h2 className="text-4xl">შიპმენტის ფასი: {shipmentCost} ლარი</h2>
      {/* Display item price if the party is the Receiver */}
      {selectedParty === "Receiver" && (
        <>
          <h2 className="text-4xl">ნივთის ღირებულება: {itemPrice} ლარი</h2>
          <h2 className="text-4xl">ჯამური ფასი: {totalPrice} ლარი</h2>
        </>
      )}{" "}
    </>
  );
};
export default ShippingCostGraph;
