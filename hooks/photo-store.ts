// PhotoStore.ts
import create from 'zustand';

interface PhotoStore {
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
}

const usePhotoStore = create<PhotoStore>((set) => ({
  photoUrl: '',
  setPhotoUrl: (url) => set({ photoUrl: url }),
}));

export default usePhotoStore;
