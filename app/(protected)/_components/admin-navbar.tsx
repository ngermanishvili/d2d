"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";


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
          variant={pathname === "/couriers" ? "default" : "outline"}
        >
          <Link href="/couriers">ჩემი კურიერები</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">კაბინეტი</Link>
        </Button>
      </div>

    </div>
  );
};
