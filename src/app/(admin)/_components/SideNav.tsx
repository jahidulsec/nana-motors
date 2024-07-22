"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { BadgeDollarSign, LayoutDashboard, Car, LogOut } from "lucide-react";
import Image from "next/image";
import { Rickshaw } from "@/assets";
import { usePathname } from "next/navigation";

export default function SideNav() {
  return (
    <aside className="sticky top-0 h-full min-h-screen bg-white w-[15rem] px-4 py-2 shadow-sm border-r border-muted ">
      {/* logo */}
      <Link href={'/'} className="logo flex flex-col pl-2 mt-5 cursor-pointer font-mono ">
        <div className="text-3xl text-primary flex gap-4">
          <Image
            src={Rickshaw}
            width={20}
            height={20}
            className="object-contain"
            alt=""
          />
          <h2 className="text-sm font-mono"><span className="font-semibold">NANA</span><span className="font-light">MOTORS</span></h2>
        </div>
      </Link>

      <hr className="mt-5" />

      {/* navigations */}
      <nav className="flex flex-col gap-3 my-10 text-primary">
        <SideNavItem
          title="Dashboard"
          href="/"
          icon={<LayoutDashboard className="size-5" />}
        />
        <SideNavItem
          title="Vehicle"
          href="/vehicle"
          icon={<Car className="size-5" />}
        />
        <SideNavItem
          title="Payment"
          href="/payment"
          icon={<BadgeDollarSign className="size-5" />}
        />
      </nav>

      <SideNavItem title="Log out" href="" icon={<LogOut className="size-4" />} />
    </aside>
  );
}

function SideNavItem({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`flex gap-4 p-2 text-sm items-center rounded-md transition-all duration-500 hover:bg-primary hover:text-primary-foreground ${
        pathname === href ? "text-primary-foreground bg-primary" : ""
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
