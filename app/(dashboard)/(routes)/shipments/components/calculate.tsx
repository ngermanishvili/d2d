"use client";
import useCalculatorStore from "@/hooks/calculate-price"; // Adjust the path as
import React, { useState } from "react";
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

const ShippingCostGraph: React.FC = (initialData: any) => {
  const [selectedRange, setSelectedRange] = useState<WeightRange | null>(null);

  const [selectedCity, setSelectedCity] = useState<"Tbilisi" | "Rustavi">(
    "Tbilisi"
  );
  const [usePackagingService, setUsePackagingService] =
    useState<boolean>(false);
  const { calculatedPrice, setCost, packagingUsed, setPackagingUsed } =
    useCalculatorStore();

  const handleCheckboxChange = (range: WeightRange) => {
    const newRange =
      selectedRange && selectedRange.label === range.label ? null : range;
    setSelectedRange(newRange);
    calculateTotalPrice(newRange, packagingUsed);
  };

  const handlePackagingServiceChange = (isChecked: boolean) => {
    setPackagingUsed(isChecked); // Update the global state
    calculateTotalPrice(selectedRange, isChecked); // Recalculate total price
  };
  const handleCityChange = (newCity: "Tbilisi" | "Rustavi") => {
    setSelectedCity(newCity);
    calculateTotalPrice(selectedRange, packagingUsed, newCity);
  };
  const calculateTotalPrice = (
    range: WeightRange | null,
    usePackaging: boolean,
    city: "Tbilisi" | "Rustavi" = selectedCity // Default to the current selectedCity state
  ) => {
    let totalPrice = 0;
    if (range) {
      totalPrice +=
        city === "Tbilisi" ? range.tbilisiPrice : range.rustaviPrice;
    }
    if (usePackaging) {
      totalPrice += 1; // Add 1 GEL for packaging service
    }
    setCost(totalPrice); // Update the cost in the global state
  };
  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `$${value}`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ₾${context.parsed.y}`,
        },
      },
    },
  };

  return (
    <>
      <div>
        <label htmlFor="city-select" className="text-2xl">
          Choose a city:{" "}
        </label>
        <select
          className="text-2xl text-red-400 text-bold"
          id="city-select"
          value={selectedCity}
          onChange={(e) =>
            handleCityChange(e.target.value as "Tbilisi" | "Rustavi")
          }
        >
          <option value="Tbilisi">Tbilisi</option>
          <option value="Rustavi">Rustavi</option>
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
      <h2 className="text-4xl">ჯამური ფასი: {calculatedPrice} ლარი</h2>
    </>
  );
};
export default ShippingCostGraph;
