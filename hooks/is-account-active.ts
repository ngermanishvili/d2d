import create from "zustand";

interface activeStore {
  active: boolean;
  setActive: (active: boolean) => void;
}

const useAccountActiveStore = create<activeStore>((set) => ({
  active: false,
  setActive: (active) => set({ active: active }),
}));

export default useAccountActiveStore;
