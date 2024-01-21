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

  const [selectedCity, setSelectedCity] = useState<string>("Tbilisi");

  const {
    calculatedPrice,
    setCost,
    packagingUsed,
    setPackagingUsed,
    archeuliQalaqi,
    range,
    setRange,
    whoPays,
    setWhoPays,
    setItemPrice,
    itemPrice,
    isAdded,
    setIsAdded,
    itemPriceForCalc,
    setItemPriceForCalc,
    setIsCalculated,
    isCalculated,
  } = useCalculatorStore();

  useEffect(() => {
    // Check if initialData is true
    if (hasInitialData) {
      // Find the WeightRange object with the matching label
      const initialSelectedRange = weightRanges.find((r) => r.label === range);

      // Set the selected range based on the found object or null
      setSelectedRange(initialSelectedRange || null);

      setSelectedCity(archeuliQalaqi);
      setPackagingUsed(packagingUsed);
      calculateTotalPrice(selectedRange, packagingUsed, selectedCity);
    }
  }, [
    range,
    setRange,
    archeuliQalaqi,
    packagingUsed,
    setPackagingUsed,
    selectedRange,
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
    if (whoPays === "receiver") {
      setCost(parseFloat(calculatedPrice) + 1);
      return;
    }
    calculateTotalPrice(selectedRange, isChecked); // Recalculate total price
  };
  const handleCityChange = (newCity: "Tbilisi" | "Rustavi") => {
    setSelectedCity(newCity);
    calculateTotalPrice(selectedRange, packagingUsed, newCity);
  };
  const calculateTotalPrice = (
    range: WeightRange | null,
    usePackaging: boolean,
    city: string = selectedCity // Default to the current selectedCity state
  ) => {
    let totalPrice = 0;

    if (range) {
      switch (paymentMethod) {
        case "sender":
          totalPrice += city === "Tbilisi" ? range.tbilisiPrice : range.rustaviPrice;
          break;
        case "receiver":
          totalPrice += parseFloat(itemCost); // If receiver pays, add item cost
          break;
        case "unmarked":
          // Do nothing for unmarked, as courier collects the payment
          break;
        default:
          break;
      }
    }

    if (usePackaging) {
      totalPrice += 1; // Add 1 GEL for packaging service
    }

    setCost(totalPrice);
  };


  return (
    <>


      <div className="flex justify-between items-center p-2">
        <label htmlFor="payment-method" className="text-2xl flex flex-col">
          Choose payment method:
        </label>
        <select
          className="text-2xl text-red-400 text-bold"
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="sender">Sender Pays</option>
          <option value="receiver">Receiver Pays</option>
          <option value="unmarked">Unmarked (Courier collects)</option>
        </select>

      </div>
      <div>
        {paymentMethod === "receiver" && (
          <div>
            <label htmlFor="item-cost" className="text-2xl">
              Enter item cost:
            </label>
            <input
              type="number"
              id="item-cost"
              value={itemCost}
              onChange={(e) =>
                setItemCost(parseFloat(e.target.value).toString() || "0")
              }
              className="text-2xl border-2 p-1"
            />
          </div>
        )}
        <div className="flex flex-col">
          <label htmlFor="city-select" className="text-2xl">
            Choose a city:
          </label>
          <select
            className="text-2xl text-red-400 text-bold"
            id="city-select"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value as "Tbilisi" | "Rustavi")}
          >
            <option value="Tbilisi">Tbielisi</option>
            <option value="Rustavi">Rustavi</option>
          </select>
        </div>
      </div>
      <div>
        <select
          value={whoPays}
          onChange={(e) => {
            if (whoPays === "receiver") {
              setCost(parseFloat(calculatedPrice) - itemPriceForCalc);
              setIsAdded(false);
              setItemPriceForCalc(0);
              setIsCalculated(false);
            }
            if (whoPays === "sender") {
              setIsCalculated(true);
            }
            setWhoPays(e.target.value as "sender" | "receiver");
          }}
        >
          <option value="sender">Sender</option>
          <option value="receiver">Receiver</option>
        </select>
        {whoPays === "receiver" ? (
          <>
            <input
              value={itemPrice || ""} // Ensure value is an empty string if itemPrice is falsy (e.g., null or undefined)
              type="number"
              min={0}
              onChange={(e) => {
                const enteredValue = parseFloat(e.target.value);
                if (!isNaN(enteredValue)) {
                  const newPrice = enteredValue < 0 ? 0 : enteredValue;
                  setItemPrice(newPrice);
                } else {
                  setItemPrice(0); // Set itemPrice to an empty string if the entered value is not a valid number
                }
              }}
            />
            <button
              disabled={isAdded}
              onClick={() => {
                setIsCalculated(false);
                setIsAdded(true);
                setCost(parseFloat(calculatedPrice) + itemPrice);
                setItemPriceForCalc(itemPrice);
              }}
            >
              alo kooki datvale
            </button>
            <button
              onClick={() => {
                setIsCalculated(true);
                setIsAdded(false);
              }}
            >
              edit item price
            </button>
          </>
        ) : (
          ""
        )}
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
          გსურთ შეფუთვის სერვისით სარგებლობა? <br /> (შეფუთვის ღირებულება 1 ლარი)
        </label>
      </div>
      <h2 className="text-4xl">ჯამური ფასი: {calculatedPrice} ლარი</h2>
    </>

  );
};
export default ShippingCostGraph;


