"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/assets/images/d2d.jpg";
import MobileMenu from "./mobile-navbar-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NAV_MENU_GLOBAL } from "@/routes/global-navbar-routes";
import { UserButton } from "@/components/auth/user-button";

export default function Header({ isSession }: { isSession: boolean }) {
  const [top, setTop] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth <= 768); // Adjust the threshold according to your design
  };

  // detect whether the user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    checkScreenWidth(); // Initial check
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", checkScreenWidth); // Listen for screen size changes
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, [top]);

  return (
    <div
      className={`fixed w-full bg-black text-white z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-gray-900 text-black backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="swhrink-0 cursor-pointer">
            <Link href="/">
              <Image
                className="rounded-md"
                src={Logo}
                alt="Logo"
                width={80}
                height={60}
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex md:grow flex-grow justify-center items-center gap-6">
            {/* Dynamically generate navigation items */}
            {NAV_MENU_GLOBAL.map((item, index) => (
              <Link key={index} href={item.to} passHref>
                <div className="">{item.name}</div>
              </Link>
            ))}
          </nav>

          {/* Desktop sign in links */}
          {!isMobile &&
            (isSession ? (
              <UserButton />
            ) : (
              <div className="p-2">
                <Button size="sm">
                  <Link href="/auth/login" passHref>
                    ავტორიზაცია
                  </Link>
                </Button>
                <Button className="ml-4" size="sm">
                  <Link href="/auth/register" passHref>
                    რეგისტრაცია
                  </Link>
                </Button>
              </div>
            ))}
          <MobileMenu navItems={NAV_MENU_GLOBAL} />
        </div>
      </div>
    </div>
  );
}
