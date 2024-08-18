import { countMonth } from "@/lib/countMonth";
import React, { Suspense } from "react";
import db from "../../../../../db/db";
import EMITable from "@/app/(admin)/payment/history/[id]/_components/EMITable";
import TableSkeleton from "@/components/TableSkeleton";
import VehicleTag from "@/app/(admin)/vehicle/_components/VehicleTag";
import PaymentType from "@/app/(admin)/payment/_components/PaymentType";
import { PaymentDetails } from "@/app/(admin)/payment/history/[id]/page";
import EMICard from "@/app/(admin)/payment/history/[id]/_components/EMICard";
import CustomerCard from "@/app/(admin)/payment/history/[id]/_components/CustomerCard";
import { formatCurrency } from "@/lib/formatter";
import { Prisma } from "@prisma/client";
import Header from "./_components/Header";

async function page({ params }: { params: { id: string } }) {
  const [paymentDetails, totalPaidEmiAmount, lastEmiDate] = await Promise.all([
    db.payment.findUnique({
      where: { id: Number(params.id) },
      include: { customer: true, vehicle: true },
    }),
    db.emi.aggregate({
      where: { paymentId: Number(params.id) },
      _sum: {
        paymentAmount: true,
      },
    }),
    db.emi.findFirst({
      where: { paymentId: Number(params.id) },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
  ]);

  let noOfMonthDue = countMonth(new Date(), paymentDetails?.emiDate as Date);

  if (paymentDetails?.vehicle.status === "sold") {
    noOfMonthDue = countMonth(
      lastEmiDate?.createdAt as Date,
      paymentDetails?.emiDate as Date,
    );
  }

  const interestAmount =
    (((paymentDetails?.sellingPrice as number) -
      (paymentDetails?.paidAmount as number)) /
      100000) *
    (paymentDetails?.interestRate as number);

  const totalPaidAmount =
    Number(paymentDetails?.paidAmount) +
    Number(totalPaidEmiAmount._sum.paymentAmount);

  const totalDue =
    noOfMonthDue * interestAmount -
    Number(totalPaidEmiAmount._sum.paymentAmount) +
    Number(paymentDetails?.sellingPrice as number) -
    (paymentDetails?.paidAmount as number);

  return (
    <table className="container">
      <thead >
        <tr>
          <td className="p-5 print:p-0">
            <Header />
            <div className="header flex gap-5 justify-between items-center mb-8">
              <div className="">
                <h2 className="text-2xl font-semibold text-primary mb-2">
                  Payment Information
                </h2>
                <h5 className="font-light text-gray-700 uppercase">
                  # {paymentDetails?.invoiceNo}
                </h5>
              </div>

              {/* cards */}
              <div className="cards flex gap-5 justify-center items-center ">
                <article className="flex flex-col gap-1 justify-center items-center">
                  <h4 className="text-[14px] font-semibold text-primary">
                    {formatCurrency(paymentDetails?.sellingPrice as number)}
                  </h4>
                  <p className="text-gray-600 text-[12px]">Selling Price</p>
                </article>

                <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

                <article className="flex flex-col gap-1 justify-center items-center">
                  <h4 className="text-[14px] font-semibold text-primary">
                    {formatCurrency(interestAmount * noOfMonthDue)}
                  </h4>
                  <p className="text-gray-600 text-[12px]">Interest</p>
                </article>

                <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

                <article className="flex flex-col gap-1 justify-center items-center">
                  <h4 className="text-[14px] font-semibold text-primary">
                    {formatCurrency(totalPaidAmount)}
                  </h4>
                  <p className="text-gray-600 text-[12px]">Paid Amount</p>
                </article>

                <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

                <article className="flex flex-col gap-1 justify-center items-center">
                  <h4 className="text-[14px] font-semibold text-primary">
                    {formatCurrency(totalDue)}
                  </h4>
                  <p className="text-gray-600 text-[12px]">Due Amount</p>
                </article>
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-5 print:p-0">
            <section>
              <div className="grid gap-5 mb-5">
                {/* customer Information */}
                <CustomerCard payment={paymentDetails as PaymentDetails} />

                {/* EMI Information */}
                <EMICard
                  payment={paymentDetails as PaymentDetails}
                  noOfMonthDue={noOfMonthDue}
                />
              </div>
            </section>

            {/* payment history */}
            <section>
              {/* header */}
              <div className="header flex gap-5 justify-between items-center mb-8">
                <h2 className="text-[18px] font-semibold text-primary mb-2">
                  Payments History
                </h2>

                {/* cards */}
                <div className="cards flex gap-5 justify-center items-center ">
                  <article className="flex flex-col gap-1 justify-center items-center">
                    <h4 className="text-3xl font-semibold text-primary">
                      <PaymentType
                        tagName={paymentDetails?.vehicleType as string}
                      />
                    </h4>
                    <p className="text-gray-600 text-[12px]">Payment Type</p>
                  </article>

                  <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

                  <article className="flex flex-col gap-1 justify-center items-center">
                    <h4 className="text-3xl font-semibold text-primary">
                      <VehicleTag
                        tagName={paymentDetails?.vehicle.status as string}
                      />
                    </h4>
                    <p className="text-gray-600 text-[12px]">Status</p>
                  </article>
                </div>
              </div>

              {/* data table */}
              <div className="my-5">
                <Suspense fallback={<TableSkeleton />}>
                  <DataTable />
                </Suspense>
              </div>
            </section>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td className="p-5 print:p-0">
            <div className="flex justify-between items-center mt-10">
              <div className="border-t border-gray-700 pt-0.5 w-[10rem] text-center">
                <p>Manager Signature</p>
              </div>
              <div className="border-t border-gray-700 pt-0.5 w-[10rem] text-center">
                <p>Customer Signature</p>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

type EMI = Prisma.EmiGetPayload<{ include: { payment: true, admin: true } }>;

const DataTable = async () => {
  const data = await db.emi.findMany({ include: { payment: true, admin: true } });

  return (
    <>
      <EMITable emiData={data as EMI[]} />
    </>
  );
};

export default page;
