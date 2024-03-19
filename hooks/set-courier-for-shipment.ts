import create from 'zustand';

const useEmailStore = create((set) => ({
    email: '',

    setEmail: (newEmail: string) => {
        set({ email: newEmail });
    },
}));

export default useEmailStore;
