// searchKeyStore.ts
import create from "zustand";

interface SearchKeyStore {
  searchKeyStore: string;
  setSearchKeyStore: (key: string) => void;
}

export const useSearchKeyStore = create<SearchKeyStore>((set) => ({
  searchKeyStore: "name",
  setSearchKeyStore: (key) => set({searchKeyStore: key}),
}));
