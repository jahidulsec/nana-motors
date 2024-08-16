"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";
import db from "../../../../db/db";
import { isValidPassword } from "@/lib/isValidPassword";

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

  const user = await db.user.findFirst({ where: { username: data.username } });

  if (user == null) {
    return { error: null, success: null, db: "Invalid username" };
  }

  if (await isValidPassword(data.password as string, user.password as string)) {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

    const role = await crypto.subtle.digest('SHA-512', new TextEncoder().encode('admin'))
    const roleString = Buffer.from(role).toString('base64')
    cookies().set("admin", roleString, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: "/",
    });
    return redirect("/");
  }
  return { error: null, success: null, db: "Invalid password" };
};

export const adminLogout = async () => {
  cookies().delete("admin");
};
