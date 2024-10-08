"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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
  emiNo: z.coerce.number().int().optional(),
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
  
  const cookieAdmin = cookies().get("ad")?.value
  const admin = JSON.parse(cookieAdmin as string)


  try {
    // check user
    const user = await db.customer.findUnique({ where: { nid: data.nid } });
    const vehicle = await db.vehicle.findUnique({
      where: { engineNo: data.engineNo },
    });

    const payments = await db.payment.findFirst({orderBy: {createdAt: 'desc'}})

    if(vehicle != null && vehicle?.status !== 'available') {
      return { error: null, success: null, db: 'Vehicle is already sold' };
    }


    const currentDate = new Date()
    const invoiceNo = `inv-nm-${currentDate.getFullYear()}${currentDate.getMonth()}${Number(payments?.id || 0) + 1}`
    

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
          adminId: Number(admin.uid)
        },
      });
      await db.payment.create({
        data: {
          vehicleId: vehicle.id,
          invoiceNo: invoiceNo,
          sellingPrice: data.sellingPrice,
          vehicleType: data.vehicleType,
          emiNo: data.emiNo,
          interestRate: data.interestRate,
          emiDate: data.emiDate != null ? new Date(data?.emiDate || "") : null,
          paidAmount: data.paidAmount,
          customerId: customer.id,
          adminId: Number(admin.uid)
        },
      });
    } else if (user != null && vehicle != null) {
      await db.payment.create({
        data: {
          vehicleId: vehicle.id,
          invoiceNo: invoiceNo,
          sellingPrice: data.sellingPrice,
          vehicleType: data.vehicleType,
          emiNo: data.emiNo,
          interestRate: data.interestRate,
          emiDate: data.emiDate != null ? new Date(data?.emiDate || "") : null,
          paidAmount: data.paidAmount,
          customerId: user.id,
          adminId: Number(admin.uid)
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

export const updateSellVehicle = async (
  id: number,
  prevState: unknown,
  formData: FormData,
) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null };
  }

  const data = result.data;
  const sellVehicle = await db.payment.findFirst({ where: { id: id } });

  const cookieAdmin = cookies().get("ad")?.value
  const admin = JSON.parse(cookieAdmin as string)

  if (sellVehicle == null) return notFound();

  try {
    const customer = await db.customer.update({
      where: { id: sellVehicle.customerId },
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
        adminId: Number(admin.uid)

      },
    });
    await db.payment.update({
      where: { id: id },
      data: {
        sellingPrice: data.sellingPrice,
        vehicleType: data.vehicleType,
        emiNo: data.emiNo,
        interestRate: data.interestRate,
        emiDate: data.emiDate != null ? new Date(data?.emiDate || "") : null,
        paidAmount: data.paidAmount,
        customerId: customer.id,
        adminId: Number(admin.uid)

      },
    });

    revalidatePath("/");
    revalidatePath("/vehicle");
    revalidatePath("/payment");

    return {
      error: null,
      success: "Vehicle sell info is successfully updated",
    };
  } catch (error) {
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
