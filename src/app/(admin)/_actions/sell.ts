"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const addSchema = z.object({
  engineNo: z.string().optional(),
  name: z.string().min(3),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  spouseName: z.string().optional(),
  nid: z.string().min(10, "At least 10 characters"),
  mobile: z.string().min(10, "At least 10 characters"),
  houseName: z.string().optional(),
  village: z.string().optional(),
  postOffice: z.string().optional(),
  district: z.string().optional(),
  upazilla: z.string().optional(),

  sellingPrice: z.coerce.number().int().min(1000),
  paidAmount: z.coerce.number().int().min(1000),
  emiNo: z.coerce.number().int(),
  interestRate: z.coerce.number().int().optional(),
  emiDate: z.string().optional(),
  vehicleType: z.string().min(1),
});

export const sellVehicle = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null };
  }

  const data = result.data;

  try {
    // check user
    const user = await db.customer.findUnique({ where: { nid: data.nid } });
    const vehicle = await db.vehicle.findUnique({
      where: { engineNo: data.engineNo },
    });

    if (user == null && vehicle != null) {
      const customer = await db.customer.create({
        data: {
          name: data.name,
          fatherName: data.fatherName,
          mobile: data.mobile,
          motherName: data.motherName,
          spouseName: data.spouseName,
          nid: data.nid,
          houseName: data.houseName,
          village: data.village,
          postOffice: data.postOffice,
          upazilla: data.upazilla,
          district: data.district,
        },
      });
      await db.payment.create({
        data: {
          vehicleId: vehicle.id,
          sellingPrice: data.sellingPrice,
          vehicleType: data.vehicleType,
          emiNo: data.emiNo,
          interestRate: data.interestRate,
          emiDate: new Date(data.emiDate || ''),
          paidAmount: data.paidAmount,
          customerId: customer.id,
        },
      });
    } else if (user != null && vehicle != null) {
      await db.payment.create({
        data: {
          vehicleId: vehicle.id,
          sellingPrice: data.sellingPrice,
          vehicleType: data.vehicleType,
          emiNo: data.emiNo,
          interestRate: data.interestRate,
          emiDate: new Date(data.emiDate || ''),
          paidAmount: data.paidAmount,
          customerId: user.id,
        },
      });
    }

    await db.vehicle.update({
      where: { engineNo: data.engineNo },
      data: { status: data.vehicleType == "emi" ? "in-emi" : "sold" },
    });

    // revalidate the cache
    revalidatePath("/");
    revalidatePath("/vehicle");
    revalidatePath("/payment");

    return { error: null, success: "Vehicle is successfully selled" };
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          db: "NID is already exist",
        };
      }
    }
  }
};
