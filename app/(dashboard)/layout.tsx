import { redirect } from "next/navigation";
import { UserNavbar } from "../(protected)/_components/user-navbar";
import { RoleGate } from "@/components/auth/role-gate";


export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <>
      <RoleGate allowedRole="ADMIN">
        <div>
          <UserNavbar />
          {children}
        </div>
      </RoleGate>
    </>
  );
}
