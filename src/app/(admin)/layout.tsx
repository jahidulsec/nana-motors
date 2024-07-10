import React from "react";
import SideNav from "./_components/SideNav";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex">
      <SideNav />
      {children}
    </div>
  );
};

export default AdminLayout;
