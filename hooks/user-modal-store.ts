import { create } from "zustand";

interface userModalStoreProps {
    isUserModalOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const userModalStore = create<userModalStoreProps>((set) => ({
    isUserModalOpen: false,
    onOpen: () => set({ isUserModalOpen: true }),
    onClose: () => set({ isUserModalOpen: false }),
}));
