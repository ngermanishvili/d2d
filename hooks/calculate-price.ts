// store.ts
import {string} from "zod";
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
}

const useCalculatorStore = create<StoreState>((set) => ({
  calculatedPrice: "0",
  archeuliQalaqi: "Rustavi",
  range: "0-5 kg",
  packagingUsed: false,
  setCost: (newCost) => set({calculatedPrice: newCost.toString()}),
  setPackagingUsed: (used) => set({packagingUsed: used}),
  setSelectedCity: (city: string) => set({archeuliQalaqi: city}),
  setRange: (WeightRange: string) => set({range: WeightRange}),
}));

export default useCalculatorStore;
