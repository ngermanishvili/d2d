"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user-button"


export const CourierNavbar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-secondary flex justify-between items-center p-4 rounded-xl mt-[100px] w-full shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname ===
                        "/couriershipments"
                        ? "default"
                        : "outline"}>
                    <Link
                        href='/couriershipments'>
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