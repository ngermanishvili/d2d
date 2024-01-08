"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user-button"


export const UserNavbar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname ===
                        "/shipments/new"
                        ? "default"
                        : "outline"}>
                    <Link
                        href='/shipments/new'>
                        შეკვეთის განთავსება
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname ===
                        "/client"
                        ? "default"
                        : "outline"}>
                    <Link
                        href='/shipments'>
                        შეკვეთების ისტორია
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname ===
                        "/settings"
                        ? "default"
                        : "outline"}>
                    <Link
                        href='/settings'>
                        Settings
                    </Link>
                </Button>
            </div>
            <UserButton />
        </div>
    )
}