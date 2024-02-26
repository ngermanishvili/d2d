// Inside useCalculatorStore.ts

import create from "zustand";
interface WeightRanges {
  label: string;
  prices: Record<string, number>;
}
interface CalculatorStore {
  shipmentCost: number;
  setShipmentCost: (cost: number) => void;
  packagingUsed: boolean;
  setPackagingUsed: (packagingUsed: boolean) => void;
  selectedCity: string;
  range: string;
  setRange: (range: string) => void;
  weightPrice: string;
  setWeightPrice: (weightPrice: string) => void;
  setCity: (city: string) => void;
  selectedParty: "Sender" | "Receiver" | "";
  setSelectedParty: (party: "Sender" | "Receiver" | "") => void;
  itemPrice: string;
  setItemPrice: (itemPrice: number) => void;
  totalPrice: number; // New state for the total price (shipment + item price)
  setTotalPrice: (totalPrice: number) => void; // Add setTotalPrice function
  calculated: boolean;
  setCalculated: (isit: boolean) => void;
  ranges: WeightRanges[];
  citiesNames: string[];
  setCitiesNames: (cities: string[]) => void;
  setRanges: (ranges: WeightRanges[]) => void;
}

const useCalculatorStore = create<CalculatorStore>((set) => ({
  citiesNames: [],
  setCitiesNames: (cities) => set({ citiesNames: cities }),
  ranges: [],
  setRanges: (ranges) => set({ ranges: ranges }),
  weightPrice: "0",
  setWeightPrice: (weightPrice) => set({ weightPrice }),
  calculated: false,
  setCalculated: (isit) => set({ calculated: isit }),
  shipmentCost: 0,
  setShipmentCost: (cost) => set({ shipmentCost: cost }),
  packagingUsed: false,
  setPackagingUsed: (packagingUsed) => set({ packagingUsed }),
  selectedCity: "",
  setCity: (city) => set({ selectedCity: city }),
  range: "",
  setRange: (range) => set({ range }),
  selectedParty: "",
  setSelectedParty: (party) => set({ selectedParty: party }),
  itemPrice: "",
  setItemPrice: (itemPrice) => set({ itemPrice: itemPrice.toString() }),
  totalPrice: 0, // Initialize the total price state
  setTotalPrice: (totalPrice) => set({ totalPrice }), // Implementation for setTotalPrice
}));

export default useCalculatorStore;
