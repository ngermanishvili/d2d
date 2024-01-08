import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";
import { RoleGate } from "@/components/auth/role-gate";

const ServerPage = async () => {
    const user = await currentUser();

    return (
        <RoleGate allowedRole="ADMIN">
            <UserInfo
                label="💻 Server component"
                user={user}
            />
        </RoleGate>
    );
}

export default ServerPage;