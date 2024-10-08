import Section from "@/components/Section";
import { formatCurrency } from "@/lib/formatter";
import React, { Suspense } from "react";
import CustomerCard from "./_components/CustomerCard";
import EMICard from "./_components/EMICard";
import db from "../../../../../../db/db";
import { Prisma } from "@prisma/client";
import PaymentType from "../../_components/PaymentType";
import VehicleTag from "@/app/(admin)/vehicle/_components/VehicleTag";
import FilterSection from "./_components/FilterSection";
import TableSkeleton from "@/components/TableSkeleton";
import EMITable from "./_components/EMITable";
import { countMonth } from "@/lib/countMonth";

export type PaymentDetails = Prisma.PaymentGetPayload<{
  include: { customer: true; vehicle: true };
}>;

const PaymentHistoryPage = async ({ params }: { params: { id: string } }) => {
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
    <>
      {/* vehicle info */}
      <Section>
        <div className="header flex gap-5 justify-between items-center mb-8">
          <div className="">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Payment Information
            </h2>
            <h5 className="font-light text-gray-500 uppercase"># {paymentDetails?.invoiceNo}</h5>
          </div>

          {/* cards */}
          <div className="cards flex gap-5 justify-center items-center ">
            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-lg font-semibold text-primary">
                {formatCurrency(paymentDetails?.sellingPrice as number)}
              </h4>
              <p className="text-gray-400 text-[12px]">Selling Price</p>
            </article>

            <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-lg font-semibold text-primary">
                {formatCurrency(interestAmount * noOfMonthDue)}
              </h4>
              <p className="text-gray-400 text-[12px]">Interest</p>
            </article>

            <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-lg font-semibold text-primary">
                {formatCurrency(totalPaidAmount)}
              </h4>
              <p className="text-gray-400 text-[12px]">Paid Amount</p>
            </article>

            <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-lg font-semibold text-primary">
                {formatCurrency(totalDue)}
              </h4>
              <p className="text-gray-400 text-[12px]">Due Amount</p>
            </article>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {/* customer Information */}
          <CustomerCard payment={paymentDetails as PaymentDetails} />

          {/* EMI Information */}
          <EMICard
            payment={paymentDetails as PaymentDetails}
            noOfMonthDue={noOfMonthDue}
          />
        </div>
      </Section>

      {/* payment history */}
      <Section>
        {/* header */}
        <div className="header flex gap-5 justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Payments History
          </h2>

          {/* cards */}
          <div className="cards flex gap-5 justify-center items-center ">
            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-3xl font-semibold text-primary">
                <PaymentType tagName={paymentDetails?.vehicleType as string} />
              </h4>
              <p className="text-gray-400 text-[12px]">Payment Type</p>
            </article>

            <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-3xl font-semibold text-primary">
                <VehicleTag
                  tagName={paymentDetails?.vehicle.status as string}
                />
              </h4>
              <p className="text-gray-400 text-[12px]">Status</p>
            </article>
          </div>
        </div>

        {/* filter section */}
        <Suspense fallback={<p>Loading...</p>}>
          <FilterSection />
        </Suspense>

        {/* data table */}
        <div className="my-5">
          <Suspense fallback={<TableSkeleton />}>
            <DataTable />
          </Suspense>
        </div>
      </Section>
    </>
  );
};

type EMI = Prisma.EmiGetPayload<{ include: { payment: true, admin: true } }>;

const DataTable = async () => {
  const data = await db.emi.findMany({ include: { payment: true, admin: true } });

  return (
    <>
      <EMITable emiData={data as EMI[]} />
    </>
  );
};

export default PaymentHistoryPage;
