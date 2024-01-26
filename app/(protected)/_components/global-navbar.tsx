"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/auth/role-gate";
import { UserButton } from "@/components/auth/user-button";

// ... (other imports)

export const GlobalNavbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-red-500 p-2  rounded-sm w-full shadow-sm mt-[88px]">
            <div className="flex items-center justify-between mx-auto">
                <div className="lg:hidden">
                    <div
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white text-lg" // Adjust text size for better visibility
                    >
                        ☰
                    </div>
                </div>
                <div className={`${menuOpen ? "block" : "hidden"} sm:flex flex-col sm:flex-row gap-x-2 mt-4 sm:mt-0`}>
                    <RoleGate allowedRole="ADMIN">
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/shipments/new" ? "default" : "outline"}
                            >
                                <Link href="/shipments/new">შეკვეთის განთავსება</Link>
                            </Button>
                        </div>
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/client" ? "default" : "outline"}
                            >
                                <Link href="/shipments">შეკვეთების ისტორია</Link>
                            </Button>
                        </div>
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/couriers" ? "default" : "outline"}
                            >
                                <Link href="/couriers">ჩემი კურიერები</Link>
                            </Button>
                        </div>
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/settings" ? "default" : "outline"}
                            >
                                <Link href="/settings">კაბინეტი</Link>
                            </Button>
                        </div>
                    </RoleGate>

                    <RoleGate allowedRole="USER">
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/shipments/new" ? "default" : "outline"}
                            >
                                <Link href="/shipments/new">შეკვეთის განთავსება</Link>
                            </Button>
                        </div>
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/client" ? "default" : "outline"}
                            >
                                <Link href="/shipments">შეკვეთების ისტორია</Link>
                            </Button>
                        </div>
                    </RoleGate>

                    <RoleGate allowedRole="COURIER">
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/couriershipments" ? "default" : "outline"}
                            >
                                <Link href='/couriershipments'>შეკვეთების ისტორია</Link>
                            </Button>
                        </div>
                        <div>
                            <Button
                                asChild
                                variant={pathname === "/settings" ? "default" : "outline"}
                            >
                                <Link href='/settings'>Settings</Link>
                            </Button>
                        </div>
                    </RoleGate>
                </div>
                <div className="ml-auto">
                    <UserButton />
                </div>
            </div>
        </div>
    );
};

