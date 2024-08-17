import { cookies } from "next/headers";
import React from "react";

function DashboardHeader() {
  return (
    <div className="py-5 text-center">
      <h1 className="text-3xl ">
        Hello <span className="font-semibold">{JSON.parse(cookies().get('ad')?.value as string).name},</span>
      </h1>
      <p className="text-sm text-gray-500">
        Welcome to <strong>Nana Motors</strong>
      </p>
    </div>
  );
}

export default DashboardHeader;
