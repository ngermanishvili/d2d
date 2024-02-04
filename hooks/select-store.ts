import create from "zustand";

// Define the store state interface
interface IdStore {
  ids: string[];
  pushId: (id: string) => void;
  deleteId: (id: string) => void;
}

// Create the Zustand store
export const useidSetStore = create<IdStore>((set) => ({
  // Initial state with an empty array
  ids: [],

  // Function to push an ID into the array
  pushId: (id) => set((state) => ({ ids: [...state.ids, id] })),

  // Function to delete an ID from the array
  deleteId: (id) => set((state) => ({ ids: state.ids.filter((existingId) => existingId !== id) })),
}));
