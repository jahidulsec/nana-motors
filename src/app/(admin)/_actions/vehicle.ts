"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

const addSchema = z.object({
  engineNo: z.string().min(3),
  carCondition: z.string().min(1),
  sellerType: z.string(),
  sellerName: z.string().nullable(),
  sellerContact: z.string().nullable(),
  sellerAddress: z.string().nullable(),
  purchasePrice: z.coerce.number().int().min(1),
});

export const addVehicle = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null };
  }

  const data = result.data;
  const cookieAdmin = cookies().get("ad")?.value
  const admin = JSON.parse(cookieAdmin as string)

  try {
    await db.vehicle.create({
      data: {
        ...data,
        adminId: Number(admin.uid)
      },
    });

    // revalidate the cache
    revalidatePath("/");
    revalidatePath("/vehicle");

    return { error: null, success: "Vehicle has been added" };
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          db: "Engine number is already exist",
        };
      }
    }
  }
};

export const updateVehicle = async (
  id: number,
  prevState: unknown,
  formData: FormData,
) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null };
  }

  const data = result.data;
  const vehicle = await db.vehicle.findUnique({ where: { id: id } });
  
  const cookieAdmin = cookies().get("ad")?.value
  const admin = JSON.parse(cookieAdmin as string)


  if (vehicle == null) return notFound();

  try {
    await db.vehicle.update({
      where: { id: id },
      data: {
        ...data,
        adminId: Number(admin.uid)
      },
    });

    // revalidate the cache
    revalidatePath("/");
    revalidatePath("/vehicle");

    return { error: null, success: "Vehicle has been updated" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          db: "Engine number is already exist",
        };
      }
    }
  }
};

export const deleteVehicle = async (id: number) => {
  const vehicle = await db.vehicle.delete({ where: { id } });

  if (vehicle == null) return notFound();

  revalidatePath("/");
  revalidatePath("/vehicle");
};
