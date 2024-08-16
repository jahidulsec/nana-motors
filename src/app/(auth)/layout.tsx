import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className=" bg-teal-50/75 font-sans antialiased min-h-screen flex justify-center items-center">{children}</div>;
};

export default AuthLayout;
