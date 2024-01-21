// store.ts
import { string } from "zod";
import create from "zustand";

interface StoreState {
  calculatedPrice: string;
  packagingUsed: boolean;
  setCost: (newCost: number) => void;
  setSelectedCity: (city: string) => void;
  setRange: (range: string) => void;
  setPackagingUsed: (used: boolean) => void;
  archeuliQalaqi: string;
  range: string;
  whoPays: "sender" | "receiver";
  itemPrice: number;
  itemPriceForCalc: number;
  setWhoPays: (payer: "sender" | "receiver") => void;
  setItemPrice: (price: number) => void;
  setItemPriceForCalc: (price: number) => void;
  isAdded: boolean;
  isCalculated: boolean;
  setIsCalculated: (calc: boolean) => void
  setIsAdded: (added: boolean) => void;
}

const useCalculatorStore = create<StoreState>((set) => ({
  isCalculated: false,
  setIsCalculated: (calc) => set({ isCalculated: calc }),
  calculatedPrice: "0",
  archeuliQalaqi: "Rustavi",
  range: "0-5 kg",
  packagingUsed: false,
  isAdded: false,
  setCost: (newCost) => set({ calculatedPrice: newCost.toString() }),
  setPackagingUsed: (used) => set({ packagingUsed: used }),
  setSelectedCity: (city: string) => set({ archeuliQalaqi: city }),
  setRange: (WeightRange: string) => set({ range: WeightRange }),
  whoPays: "sender",
  itemPrice: 0,
  itemPriceForCalc: 0,
  setWhoPays: (payer) => set({ whoPays: payer }),
  setItemPrice: (price) => set({ itemPrice: price }),
  setItemPriceForCalc: (price) => set({ itemPriceForCalc: price }),
  setIsAdded: (added) => set({ isAdded: added }),
}));

export default useCalculatorStore;