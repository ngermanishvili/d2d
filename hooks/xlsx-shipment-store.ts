import create from "zustand";

export type ShipmentColumn = {
  id: string;
  mimgebiFullName: string;
  gamgzavniFullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  price: string;
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
  courierComment: string | null | undefined;
  orderComment: string | null | undefined;
  agebisDro: string | null;
  chabarebisDro: string | null;
};

interface ShipmentStore {
  filteredDataxlsx: ShipmentColumn[];
  setFilteredDataxlsx: (data: ShipmentColumn[]) => void;
}

export const useShipmentStoreXLSX = create<ShipmentStore>((set) => ({
  filteredDataxlsx: [],
  setFilteredDataxlsx: (data) => set({ filteredDataxlsx: data }),
}));
