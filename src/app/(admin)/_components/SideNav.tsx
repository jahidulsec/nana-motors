"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { BadgeDollarSign, LayoutDashboard, Car } from "lucide-react";
import Image from "next/image";
import { Rickshaw } from "@/assets";
import { usePathname } from "next/navigation";

export default function SideNav() {
  return (
    <aside className="bg-white w-[12rem] px-4 py-2 shadow-sm font-mono border-r border-secondary">
      {/* logo */}
      <div className="logo flex flex-col justify-center items-center">
        <div className="text-3xl text-primary flex gap-1">
          <Image
            src={Rickshaw}
            width={20}
            height={20}
            className="object-contain"
            alt=""
          />
          <h2>Nana</h2>
        </div>
        <h3 className="text-sm -mt-2 text-yellow-500 tracking-[0.385rem]">
          Motors
        </h3>
      </div>

      {/* navigations */}
      <nav className="flex flex-col gap-3 my-8 text-primary">
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
