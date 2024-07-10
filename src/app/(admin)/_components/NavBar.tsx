import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const NavBar = () => {
  return (
    <div className="sticky w-full bg-white py-3 px-5 flex justify-between items-center">
      <h4 className="text-lg font-semibold text-primary">Dashboard</h4>

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
