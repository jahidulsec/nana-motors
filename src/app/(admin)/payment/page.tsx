import Section from "@/components/Section";
import React, { Suspense } from "react";
import FilterSection from "./_components/FilterSection";
import TableSkeleton from "@/components/TableSkeleton";
import { Payment, Prisma } from "@prisma/client";
import PaymentTable from "./_components/PaymentTable";
import db from "../../../../db/db";

const PaymentPage = async () => {
  return (
    <>
      <Section>
        {/* header */}
        <div className="header flex gap-5 justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-2">Payments</h2>

          {/* cards */}
          <div className="cards flex gap-5 justify-center items-center ">
            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-3xl font-semibold text-primary">3</h4>
              <p className="text-gray-400 text-[12px]">Done</p>
            </article>

            <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-3xl font-semibold text-primary">4</h4>
              <p className="text-gray-400 text-[12px]">In progress</p>
            </article>
          </div>
        </div>

        {/* filter section */}
        <Suspense fallback={<p>Loading...</p>}>
          <FilterSection />
        </Suspense>

        {/* data table of recent task */}
        <div className="my-5">
          <Suspense fallback={<TableSkeleton />}>
            <DataTable />
          </Suspense>
        </div>
      </Section>
    </>
  );
};

type Payments = Prisma.PaymentGetPayload<{include: {vehicle: true, customer: true}}>


const DataTable = async () => {
  const data =  await db.payment.findMany({include: {vehicle: true, customer: true}})

  return (
    <>
      <PaymentTable payments={data as Payments[] } />
    </>
  );
};

export default PaymentPage;
