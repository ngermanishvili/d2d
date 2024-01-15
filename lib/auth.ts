"use server"
import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();
    return session?.user;
};
export const currentUserByEmail = async () => {
    const session = await auth();
    return session?.user.email;
};


export const currentUserId = async () => {
    const session = await auth();
    return session?.user?.id; // Assuming the user's ID is stored under the 'id' field
};

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
};