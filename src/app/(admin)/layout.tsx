import React from "react";
import SideNav from "./_components/SideNav";
import NavBar from "./_components/NavBar";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

const AdminLayout = async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <div className="bg-teal-50/75 font-sans antialiased min-h-screen flex relative min-w-[75rem]">
      <SideNav />
      <div className="w-full">
        <NavBar />
        <main className="container mt-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
