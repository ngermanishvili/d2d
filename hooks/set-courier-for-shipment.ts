import create from 'zustand';

const useEmailStore = create((set) => ({
    email: '',

    setEmail: (newEmail: string) => {
        set({ email: newEmail });
        // You can perform additional actions here upon changing the email value
        console.log(`Email set to: ${newEmail}`);
    },
}));

export default useEmailStore;
