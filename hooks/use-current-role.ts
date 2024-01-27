import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
    const session = useSession();

    return session.data?.user.role;
}
export const useCurrentId = () => {
    const session = useSession();

    return session.data?.user.id;
}