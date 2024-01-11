// store.ts
import {string} from "zod";
import create from "zustand";

interface StoreState {
  calculatedPrice: string;
  packagingUsed: boolean;
  setCost: (newCost: number) => void;
  setPackagingUsed: (used: boolean) => void;
}

const useCalculatorStore = create<StoreState>((set) => ({
  calculatedPrice: "0",
  packagingUsed: false,
  setCost: (newCost) => set({calculatedPrice: newCost.toString()}),
  setPackagingUsed: (used) => set({packagingUsed: used}),
}));

export default useCalculatorStore;
