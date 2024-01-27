import create, { SetState } from "zustand";

interface ShipmentStore {
  shipments: number;
  setShipments: (amount: number) => void;
}

export const useShipmentStore = create<ShipmentStore>(
  (set: SetState<ShipmentStore>) => ({
    shipments: 0,

    // Function to update the shipments
    setShipments: (amount: number) => set({ shipments: amount }),
  })
);
