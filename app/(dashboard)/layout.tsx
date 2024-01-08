import { redirect } from "next/navigation";
import { UserNavbar } from "../(protected)/_components/user-navbar";


export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <>
      <div>
        <UserNavbar />
        {children}
      </div>
    </>
  );
}
