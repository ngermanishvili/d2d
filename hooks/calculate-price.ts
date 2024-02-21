// Inside useCalculatorStore.ts

import create from "zustand";
interface CalculatorStore {
  shipmentCost: number;
  setShipmentCost: (cost: number) => void;
  packagingUsed: boolean;
  setPackagingUsed: (packagingUsed: boolean) => void;
  selectedCity: "თბილისი" | "რუსთავი";
  range: string;
  setRange: (range: string) => void;
  setCity: (city: "თბილისი" | "რუსთავი") => void;
  selectedParty: "Sender" | "Receiver" | "";
  setSelectedParty: (party: "Sender" | "Receiver" | "") => void;
  itemPrice: string;
  setItemPrice: (itemPrice: number) => void;
  totalPrice: number; // New state for the total price (shipment + item price)
  setTotalPrice: (totalPrice: number) => void; // Add setTotalPrice function
  calculated: boolean;
  setCalculated: (isit: boolean) => void;
}

const useCalculatorStore = create<CalculatorStore>((set) => ({
  calculated: false,
  setCalculated: (isit) => set({ calculated: isit }),
  shipmentCost: 0,
  setShipmentCost: (cost) => set({ shipmentCost: cost }),
  packagingUsed: false,
  setPackagingUsed: (packagingUsed) => set({ packagingUsed }),
  selectedCity: "თბილისი",
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
