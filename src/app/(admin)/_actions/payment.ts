"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { revalidatePath } from "next/cache";
import { countMonth } from "@/lib/countMonth";
import { notFound } from "next/navigation";

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

    const noOfMonthDue = countMonth(new Date(), payment.emiDate as Date);
    const interestAmount =
      (((payment?.sellingPrice as number) - (payment?.paidAmount as number)) /
        100000) *
      (payment?.interestRate as number);

    // payable check
    const prevTotalPaidAmount =
      Number(payment.paidAmount) +
      Number(totalEmiAmount._sum.paymentAmount)

    const prevTotalDueAmount =
    Number(interestAmount * noOfMonthDue) + Number(payment.sellingPrice) +  - Number(prevTotalPaidAmount) ;

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
      },
    });

    // if complete
    const totalPaidAmount = Number(prevTotalPaidAmount) + Number(data.paymentAmount);
    const totalDueAmount = Number(prevTotalDueAmount) - Number(data.paymentAmount);

    console.log(totalPaidAmount)
    console.log(prevTotalPaidAmount)
    console.log(prevTotalDueAmount)
    console.log(totalDueAmount)

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
    return {
      error: null,
      success: null,
      db: "Something Went Wrong",
    };
  }
};



export const deletePayment = async (id: number) => {
  const payment = await db.payment.findUnique({where: {id}})

  if (payment == null) return notFound();

  await db.payment.update({
    where: {id: id}, 
    data: {
      vehicle: {
        update: {
          status: 'available'
        }
      }
    }
  })
 await db.payment.delete({ where: { id } });


 

  revalidatePath("/");
  revalidatePath("/vehicle");
  revalidatePath("/payment");
};