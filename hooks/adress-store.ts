// PhotoStore.ts
import create from "zustand";

interface addressStore {
  address: string;
  setAddress: (address: string) => void;
}

const useAddressStore = create<addressStore>((set) => ({
  address: "",
  setAddress: (address) => set({ address: address }),
}));

export default useAddressStore;
