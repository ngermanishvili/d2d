import { RoleGate } from "@/components/auth/role-gate";
import { Navbar } from "./_components/navbar";
import { UserNavbar } from "./_components/user-navbar";


interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <RoleGate allowedRole="ADMIN">
                <UserNavbar />
            </RoleGate>
            <RoleGate allowedRole="USER">
                <Navbar />
            </RoleGate>
            {children}
        </div>
    );
}

export default ProtectedLayout;