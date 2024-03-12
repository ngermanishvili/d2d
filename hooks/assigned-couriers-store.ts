import create from "zustand";

interface assignedCouriersStore {
  assignedCouriers: string[];
  setassignedCouriers: (assignedCouriers: string[]) => void;
}

const useAssignedCouriersStore = create<assignedCouriersStore>((set) => ({
  assignedCouriers: [],
  setassignedCouriers: (assignedCouriers: string[]) =>
    set({ assignedCouriers: assignedCouriers }),
}));

export default useAssignedCouriersStore;
