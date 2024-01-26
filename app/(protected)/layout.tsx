import { RoleGate } from "@/components/auth/role-gate";
import { AdminNavbar } from "./_components/admin-navbar";
import { UserNavbar } from "./_components/user-navbar";


interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="">
            {children}
        </div>
    );
}

export default ProtectedLayout;