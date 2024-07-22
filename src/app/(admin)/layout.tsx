import React from "react";
import SideNav from "./_components/SideNav";
import NavBar from "./_components/NavBar";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex relative">
      <SideNav />
      <div className="w-full">
        {/* <NavBar /> */}
        <div className="container mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
