import create from "zustand";

export type ShipmentColumn = {
  id: string;
  phoneNumber: string;
  address: string;
  city: string;
  price: string;
  priceDif: string | null;
  itemPrice: string | null;
  whopays: string | null;
  label: string | null;
  weightPrice: string | null;
  packagePrice: string | null;
  companyPays: string | null;
  brittle: string;
  packaging: string;
  createdAt: string | Date;
  updatedAt: string | Date; // Allow both string and Date
  mimgebisNumber: string;
  mimgebisAddress: string;
  markedByCourier: string;
  mimgebiQalaqi: string;
  trackingId: string;
  status: string;
  courierComment: string;
  agebisDro: string | null;
  chabarebisDro: string | null;
  gamgzavnisqalaqi: string;
  mimgebiFullName: string;
  gamgzavniFullName: string;
};

interface ShipmentStore {
  filteredDataxlsx: ShipmentColumn[];
  setFilteredDataxlsx: (data: ShipmentColumn[]) => void;
}

export const useShipmentStoreXLSX = create<ShipmentStore>((set) => ({
  filteredDataxlsx: [],
  setFilteredDataxlsx: (data) => set({ filteredDataxlsx: data }),
}));
