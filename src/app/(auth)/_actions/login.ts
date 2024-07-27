"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const authSchema = z.object({
  username: z.string().min(1, {message: 'Enter admin username'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
});

export const adminLogin = async (prevData: unknown, formData: FormData) => {
  const result = authSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  if (
    data.username === process.env.ADMIN_USERNAME &&
    data.password === process.env.ADMIN_PASSWORD
  ) {
    return redirect("/");
  }
};
