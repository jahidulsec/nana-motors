"use client";

import Link from "next/link";
import React, { ReactNode, useState, useTransition } from "react";
import {
  BadgeDollarSign,
  LayoutDashboard,
  Car,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { Rickshaw } from "@/assets";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { adminLogout } from "@/app/(auth)/_actions/login";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";

export default function SideNav() {
  const [open, setOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  return (
    <>
      <aside
        className={`sticky top-0 h-full min-h-screen bg-forground 
      px-3 py-2 shadow-sm border-r border-muted ${
        open ? "w-[15rem]" : "w-[3.75rem]"
      } overflow-hidden transition-all duration-300`}
      >
        {/* logo */}
        <Link
          href={"/"}
          className="logo flex flex-col pl-2 mt-5 cursor-pointer font-mono "
        >
          <div className="text-3xl text-primary flex gap-5">
            <Image
              src={Rickshaw}
              width={20}
              height={20}
              className="object-contain"
              alt=""
            />
            <h2 className="text-sm font-mono">
              <span className="font-semibold">NANA</span>
              <span className="font-light">MOTORS</span>
            </h2>
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

        <div className="">
          <SideNavItem
            className="text-red-500 hover:bg-red-400"
            title="Log out"
            href=""
            icon={<LogOut className="size-5" />}
            onClick={() => {
              startTransition(async () => {
                await adminLogout();
                router.refresh()
                toast.success("You are logged out");
              });
            }}
          />
        </div>
      </aside>
      <Button
        className={`toggle fixed z-20 top-[1.125rem] transition-all duration-300 rounded-full size-6 ${
          open ? "left-[12rem]" : "left-[3rem]"
        }`}
        variant={"outline"}
        size={"icon"}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronLeft className="size-4" />
        ) : (
          <ChevronRight className="size-4" />
        )}
      </Button>
    </>
  );
}

function SideNavItem({
  title,
  href,
  icon,
  className,
  onClick
}: {
  title: string;
  href: string;
  className?: string;
  icon: ReactNode;
  onClick?: () => void
  
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(`${className} flex gap-5 p-2 text-sm items-center rounded-md transition-all duration-500 hover:bg-primary hover:text-primary-foreground ${
        (pathname === href ) ? "text-primary-foreground bg-primary" : ""
      }`)}
      onClick={onClick}
    >
      {icon}
      <span className="text-nowrap">{title}</span>
    </Link>
  );
}
