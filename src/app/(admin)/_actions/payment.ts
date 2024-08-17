"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { revalidatePath } from "next/cache";
import { countMonth } from "@/lib/countMonth";
import { notFound } from "next/navigation";
import { CodeSquare } from "lucide-react";
import { cookies } from "next/headers";

const addSchema = z.object({
  paymentId: z.coerce.number().int().min(1),
  paymentAmount: z.coerce.number().int().min(1),
  method: z.string().min(1),
  givenBy: z.string().nullable().optional(),
  referenceNo: z.string().nullable().optional(),
});

export const addEmiPayment = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null };
  }

  const data = result.data;
  const cookieAdmin = cookies().get("ad")?.value
  const admin = JSON.parse(cookieAdmin as string)

  try {
    // check payment
    const payment = await db.payment.findUnique({
      where: { id: data.paymentId },
    });

    if (payment == null) {
      return { error: null, success: null, db: "This payment is not found" };
    }

    // get all emi amount
    const totalEmiAmount = await db.emi.aggregate({
      where: { paymentId: data.paymentId },
      _sum: {
        paymentAmount: true,
      },
    });

    const prevEmiDate = await db.emi.findFirst({
      where: { paymentId: data.paymentId },
      select: {
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const prevNoOfMonthDue = countMonth(
      prevEmiDate?.createdAt as Date || new Date(),
      payment.emiDate as Date,
    );

    const interestAmount =
      (((payment?.sellingPrice as number) - (payment?.paidAmount as number)) /
        100000) *
      (payment?.interestRate as number);

    // payable check
    const prevTotalPaidAmount =
      Number(payment.paidAmount) + Number(totalEmiAmount._sum.paymentAmount);

    const prevTotalDueAmount =
      Number(interestAmount * prevNoOfMonthDue) +
      Number(payment.sellingPrice) +
      -Number(prevTotalPaidAmount);

    if (prevTotalDueAmount == 0) {
      return { error: null, success: null, db: "No due left" };
    }

    // make payment
    await db.emi.create({
      data: {
        paymentAmount: data.paymentAmount,
        paymentId: data.paymentId,
        givenBy: data.givenBy,
        refeneceNo: data.referenceNo,
        method: data.method,
        adminId: Number(admin.uid)
      },
    });

    // if complete
    // payable check

    const noOfMonthDue = countMonth(new Date(), payment.emiDate as Date);

    const totalPaidAmount =
      Number(payment.paidAmount) +
      Number(totalEmiAmount._sum.paymentAmount) +
      data.paymentAmount;

    const totalDueAmount =
      Number(interestAmount * noOfMonthDue) +
      Number(payment.sellingPrice) +
      -Number(totalPaidAmount);

    if (totalDueAmount == 0) {
      await db.payment.update({
        where: { id: data.paymentId },
        data: {
          vehicle: {
            update: {
              status: "sold",
            },
          },
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/payment");
    revalidatePath("/payment/history/" + data.paymentId);

    return { error: null, success: "Payment Successful", db: null };
  } catch (error) {
    console.log(error)
    return {
      error: null,
      success: null,
      db: "Something Went Wrong",
    };
  }
};

export const updateEmiPayment = async (
  id: number,
  prevState: unknown,
  formData: FormData,
) => {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return { error: result.error.formErrors.fieldErrors, success: null };
  }

  const data = result.data;
  const emiPayment = await db.emi.findUnique({ where: { id } });

  const cookieAdmin = cookies().get("ad")?.value
  const admin = JSON.parse(cookieAdmin as string)

  // get all emi amount
  if (emiPayment == null) return notFound();

  const payment = await db.payment.findUnique({
    where: { id: data.paymentId },
  });

  


  await db.emi.update({
    where: { id },
    data: {
      paymentAmount: data.paymentAmount,
      method: data.method,
      paymentId: data.paymentId,
      refeneceNo: data.referenceNo,
      givenBy: data.givenBy,
      adminId: Number(admin.uid)
    },
  });

  const [totalEmiAmount, prevEmiDate ] = await Promise.all([
    await db.emi.aggregate({
      where: { paymentId: data.paymentId },
      _sum: {
        paymentAmount: true,
      },
    }),
    await db.emi.findFirst({
      where: { paymentId: data.paymentId },
      select: {
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
  ])

  

  const interestAmount =
    (((payment?.sellingPrice as number) - (payment?.paidAmount as number)) /
      100000) *
    (payment?.interestRate as number);


  const noOfMonthDue = countMonth(
    prevEmiDate?.createdAt as Date,
    payment?.emiDate as Date,
  );


  const totalPaidAmount =
    Number(payment?.paidAmount) +
    Number(totalEmiAmount._sum.paymentAmount) +
    data.paymentAmount;

  const totalDueAmount =
    Number(interestAmount * noOfMonthDue) +
    Number(payment?.sellingPrice) +
    -Number(totalPaidAmount);


  if (totalDueAmount > 0) {
    await db.payment.update({
      where: { id: data.paymentId },
      data: {
        vehicle: {
          update: {
            status: "in-emi",
          },
        },
      },
    });
  } else {
    await db.payment.update({
      where: { id: data.paymentId },
      data: {
        vehicle: {
          update: {
            status: "sold",
          },
        },
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/payment");
  revalidatePath("/payment/history/" + data.paymentId);

  return { error: null, success: "Payment updated", db: null };
};

export const deletePayment = async (id: number) => {
  const payment = await db.payment.findUnique({ where: { id } });

  if (payment == null) return notFound();

  await db.payment.update({
    where: { id: id },
    data: {
      vehicle: {
        update: {
          status: "available",
        },
      },
    },
  });
  await db.payment.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/vehicle");
  revalidatePath("/payment");
};

export const deleteEmi = async (id: number, paymentId: number) => {
  const emi = await db.emi.findUnique({ where: { id } });

  if (emi == null) return notFound();

  await db.payment.update({
    where: { id: paymentId },
    data: {
      vehicle: {
        update: {
          status: "in-emi",
        },
      },
    },
  });

  await db.emi.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/vehicle");
  revalidatePath("/payment");
  revalidatePath("/payment/history/" + paymentId);
};
