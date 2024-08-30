import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "./session";
import db from "../../db/db";


export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
};

export const getUser = async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.admin.findUnique({
      where: { id: Number(session.userId) },
      select: {
        id: true,
        fullName: true,
      },
    });

    const user = data;

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
