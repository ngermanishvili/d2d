// PhotoStore.ts
import create from "zustand";

interface invoiceStore {
  totalDifs: string;
  totaloftotals: string;
  totalWeigtPrices: string;
  totalPackagePrices: string;
  totalCompanyPays: string;
  totalItemPrices: string;
  setTotalDifs: (totalDifs: string) => void;
  setTotalWeightPrices: (totalWeigtPrices: string) => void;
  setTotalPackagePrices: (totalPackagePrices: string) => void;
  setTotalOfTotals: (totaloftotals: string) => void;
  settotalCompanyPays: (totaloftotals: string) => void;
  settotalItemPrices: (totalItemPrices: string) => void;
}

const useInvoiceStore = create<invoiceStore>((set) => ({
  totalDifs: "",
  totaloftotals: "",
  totalWeigtPrices: "",
  totalPackagePrices: "",
  totalCompanyPays: "",
  totalItemPrices: "",
  setTotalDifs: (totalDifs) => set({ totalDifs: totalDifs }),
  setTotalWeightPrices: (totalWeigtPrices) =>
    set({ totalWeigtPrices: totalWeigtPrices }),
  setTotalPackagePrices: (totalPackagePrices) =>
    set({ totalPackagePrices: totalPackagePrices }),
  setTotalOfTotals: (totaloftotals) => set({ totaloftotals: totaloftotals }),
  settotalCompanyPays: (totalCompanyPays) =>
    set({ totalCompanyPays: totalCompanyPays }),
  settotalItemPrices: (totalItemPrices) =>
    set({ totalItemPrices: totalItemPrices }),
}));

export default useInvoiceStore;
