"use client";
import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";
import { RoleGate } from "@/components/auth/role-gate";
// routes
import {
  NAV_MENU_ADMIN,
  NAV_MENU_USER,
  NAV_MENU_COURIER,
  NAV_MENU_ACCOUNTANT,
  NAV_MENU_MODERATOR,
  NAV_MENU_INACTIVEUSER

} from "@/routes/panel-navbar-routes";
import useAccountActiveStore from "@/hooks/is-account-active";

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Link href={href}>
        <div className="flex items-center gap-2 font-medium text-white cursor-pointer">
          {children}
        </div>
      </Link>
    </li>
  );
}

export function PanelNavbar() {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);
  const { active, setActive } = useAccountActiveStore();

  return (
    <div className=" sticky top-4 z-0 mt-[100px]">
      <div className="mx-auto ">
        <MTNavbar
          placeholder=""
          blurred
          color="red"
          className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6"
        >
          <div className="flex items-center justify-center gap-12">
            <ul className="ml-2 hidden items-center gap-6 lg:flex text-sm">
              <RoleGate allowedRole="ADMIN">
                {NAV_MENU_ADMIN.map(({ name, icon: Icon, to }) => (
                  <NavItem key={name} href={to}>
                    <p className="hover:text-gray-600 transition-all">{name}</p>
                    <Icon className="h-4 w-4" />
                  </NavItem>
                ))}
              </RoleGate>
              <RoleGate allowedRole="USER">
                {
                  NAV_MENU_USER.map(({ name, icon: Icon, to }) => (
                    <NavItem key={name} href={to}>
                      <Icon className="h-2 w-2" />
                      {name}
                    </NavItem>
                  ))
                }
              </RoleGate>
              <RoleGate allowedRole="COURIER">
                {NAV_MENU_COURIER.map(({ name, icon: Icon, to }) => (
                  <NavItem key={name} href={to}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </RoleGate>

              <RoleGate allowedRole="ACCOUNTANT">
                {NAV_MENU_ACCOUNTANT.map(({ name, icon: Icon, to }) => (
                  <NavItem key={name} href={to}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </RoleGate>
              <RoleGate allowedRole="MODERATOR">
                {NAV_MENU_MODERATOR.map(({ name, icon: Icon, to }) => (
                  <NavItem key={name} href={to}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </RoleGate>
              <RoleGate allowedRole="INACTIVEUSER">
                {NAV_MENU_INACTIVEUSER.map(({ name, icon: Icon, to }) => (
                  <NavItem key={name} href={to}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </RoleGate>
            </ul>
            <div className="hidden items-center gap-4 lg:flex">
              <div>
                <Link href="/settings">
                  <Button placeholder="" color="gray">
                    კაბინეტი
                  </Button>
                </Link>
              </div>
            </div>
            <IconButton
              placeholder=""
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className=" flex items-start justify-start">
              <div>
                <Link href="/settings">
                  <Button placeholder="" color="gray">
                    კაბინეტი
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-3 border-t border-gray-200 mx-auto pt-4">
              <ul className="flex flex-col gap-4">
                <RoleGate allowedRole="ADMIN">
                  {NAV_MENU_ADMIN.map(({ name, icon: Icon, to }) => (
                    <NavItem key={name} href={to}>
                      <p className="hover:text-gray-600 transition-all">
                        {name}
                      </p>

                      <Icon className="h-5 w-5" />
                    </NavItem>
                  ))}
                </RoleGate>
                <RoleGate allowedRole="USER">
                  {NAV_MENU_USER.map(({ name, icon: Icon, to }) => (
                    <NavItem key={name} href={to}>
                      {name}
                      <Icon className="h-5 w-5" />
                    </NavItem>
                  ))}
                </RoleGate>
                <RoleGate allowedRole="COURIER">
                  {NAV_MENU_COURIER.map(({ name, icon: Icon, to }) => (
                    <NavItem key={name} href={to}>
                      {name}
                      <Icon className="h-5 w-5" />
                    </NavItem>
                  ))}
                </RoleGate>
                <RoleGate allowedRole="MODERATOR">
                  {NAV_MENU_MODERATOR.map(({ name, icon: Icon, to }) => (
                    <NavItem key={name} href={to}>
                      {name}
                      <Icon className="h-5 w-5" />
                    </NavItem>
                  ))}
                </RoleGate>
                <RoleGate allowedRole="INACTIVEUSER">
                  {NAV_MENU_INACTIVEUSER.map(({ name, icon: Icon, to }) => (
                    <NavItem key={name} href={to}>
                      {name}
                      <Icon className="h-5 w-5" />
                    </NavItem>
                  ))}
                </RoleGate>
              </ul>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default PanelNavbar;
