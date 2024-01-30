// PhotoStore.ts
import create from 'zustand';

interface PhoneStoreProps {
  phone: string;
  setPhone: (url: string) => void;
}

const usePhoneStore = create<PhoneStoreProps>((set) => ({
  phone: '',
  setPhone: (url) => set({ phone: url }),
}));

export default usePhoneStore;
