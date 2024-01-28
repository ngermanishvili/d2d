import { RoleGate } from "@/components/auth/role-gate";



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