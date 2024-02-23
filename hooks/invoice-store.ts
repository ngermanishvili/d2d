// PhotoStore.ts
import create from "zustand";

interface invoiceStore {
  totalDifs: string;
  totaloftotals: string;
  totalWeigtPrices: string;
  totalPackagePrices: string;
  setTotalDifs: (totalDifs: string) => void;
  setTotalWeightPrices: (totalWeigtPrices: string) => void;
  setTotalPackagePrices: (totalPackagePrices: string) => void;
  setTotalOfTotals: (totaloftotals: string) => void;
}

const useInvoiceStore = create<invoiceStore>((set) => ({
  totalDifs: "",
  totaloftotals: "",
  totalWeigtPrices: "",
  totalPackagePrices: "",
  setTotalDifs: (totalDifs) => set({ totalDifs: totalDifs }),
  setTotalWeightPrices: (totalWeigtPrices) =>
    set({ totalWeigtPrices: totalWeigtPrices }),
  setTotalPackagePrices: (totalPackagePrices) =>
    set({ totalPackagePrices: totalPackagePrices }),
  setTotalOfTotals: (totaloftotals) => set({ totaloftotals: totaloftotals }),
}));

export default useInvoiceStore;
