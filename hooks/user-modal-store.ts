import { create } from "zustand";

interface userModalStoreProps {
  isUserModalOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
}

export const userModalStore = create<userModalStoreProps>((set) => ({
  id: "",
  isUserModalOpen: false,
  onOpen: () => set({ isUserModalOpen: true }),
  onClose: () => set({ isUserModalOpen: false}),
  setId: (id) => set({ id: id }),
}));
