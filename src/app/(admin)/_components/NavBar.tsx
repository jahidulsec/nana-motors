"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 w-full bg-card border-b py-3 px-[2rem] flex justify-between items-center shadow-sm">
      <h4 className="text-lg font-semibold text-primary">
        {pathname === '/' ? "DASHBOARD" : 
        pathname.toUpperCase().split('/').slice(1,3).reverse().join(' ')
        }
      </h4>

      <div className="flex gap-5 justify-end items-center">
        {/* search bar */}
        <div className="w-[15rem] relative">
          <Input
            className="text-sm pl-8 h-auto py-1 rounded-md text-primary"
            title="search"
            placeholder="Search"
          />
          <Search className="absolute text-primary top-[50%] -translate-y-[50%] size-4 left-2" />
        </div>

        <div className="h-8 w-[1px] rounded-full bg-border"></div>

        {/* profile */}
        <div className="">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>KU</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
