import { getUser } from "@/lib/dal";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardHeader() {

  const user = await getUser()

  if(user == null) {
    deleteSession()
    redirect('/login')
  }

  return (
    <div className="py-5 text-center">
      <h1 className="text-3xl ">
        Hello <span className="font-semibold">{user.fullName},</span>
      </h1>
      <p className="text-sm text-gray-500">
        Welcome to <strong>Nana Motors</strong>
      </p>
    </div>
  );
}

export default DashboardHeader;
