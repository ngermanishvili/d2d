"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { UserRole } from "@prisma/client";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/couriershipments" ? "default" : "outline"}
          >
            <Link href="/couriershipments">REGISTER COURIER</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>{" "}
          <Button
            asChild
            variant={pathname === "/billboards" ? "default" : "outline"}
          >
            <Link href="/billboards">Billboard</Link>
          </Button>
        </RoleGate>
        <RoleGate allowedRole={UserRole.USER}>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>
          <RoleGate allowedRole={UserRole.COURIER}>
            <Button
              asChild
              variant={pathname === "/couriershipments" ? "default" : "outline"}
            >
              <Link href="/couriershipments"> COURIER</Link>
            </Button>
          </RoleGate>
          <Button>sxva page1</Button>
          <Button>sxva page2</Button>
        </RoleGate>
      </div>
      <UserButton />
    </div>
  );
};
