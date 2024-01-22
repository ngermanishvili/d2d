// searchKeyStore.ts
import create from 'zustand';

interface SearchKeyStore {
  searchKey: string;
  setSearchKey: (key: string) => void;
}

export const useSearchKeyStore = create<SearchKeyStore>((set) => ({
  searchKey: '',
  setSearchKey: (key) => set({ searchKey: key }),
}));
