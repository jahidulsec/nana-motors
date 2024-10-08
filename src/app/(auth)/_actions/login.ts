"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";
import db from "../../../../db/db";
import { isValidPassword } from "@/lib/isValidPassword";
import { createSession } from "@/lib/session";

const authSchema = z.object({
  username: z.string().min(1, { message: "Enter admin username" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const adminLogin = async (prevData: unknown, formData: FormData) => {
  const result = authSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      success: null,
      db: null,
    };
  }

  const data = result.data;

  const user = await db.admin.findFirst({ where: { username: data.username } });

  if (user == null) {
    return { error: null, success: null, db: "Invalid username" };
  }

  if (await isValidPassword(data.password as string, user.password as string)) {

    await createSession(user.id.toString())

    return redirect("/");
  }
  return { error: null, success: null, db: "Invalid password" };
};

export const adminLogout = async () => {
  cookies().delete("session");
};
