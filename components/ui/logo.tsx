"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/images/d2d.jpg"

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push("/")}
            className="hidden md:block cursor-pointer rounded-full"
            src={logo}
            height="100"
            width="100"
            alt="Logo"
        />
    );
};

export default Logo;
