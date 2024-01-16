"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import NProgress from "nprogress";

export const AdminNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-secondary  flex justify-between items-center p-4 rounded-xl w-full shadow-sm mt-[100px]">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/shipments/new" ? "default" : "outline"}
        >
          <Link href="/shipments/new">შეკვეთის განთავსება</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/shipments">შეკვეთების ისტორია</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/couriers" ? "default" : "outline"}
        >
          <Link href="/couriers">Couriers</Link>
        </Button>
      </div>
    </div>
  );
};
