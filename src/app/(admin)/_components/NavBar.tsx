"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { titleCase } from "@/lib/formatter";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect } from "react";

const NavBar = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname.split("/").slice(1));
  }, [pathname]);

  return (
    <div className="sticky top-0 z-10 w-full bg-card border-b py-3 px-[2rem] flex justify-between items-center shadow-sm">
      

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          {pathname.split("/").length > 2 &&
            pathname
              .split("/")
              .slice(1, -1)
              .map((item) => (
                <Fragment key={item}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      {titleCase(item)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              ))}

          {
          pathname.split("/")[1].length > 1 &&
          pathname.split("/").length > 1 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{titleCase(pathname.split("/").pop()?.toString() as string)}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-5 justify-end items-center">
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
