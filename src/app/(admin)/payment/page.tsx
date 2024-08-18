import Section from "@/components/Section";
import React, { Suspense } from "react";
import FilterSection from "./_components/FilterSection";
import TableSkeleton from "@/components/TableSkeleton";
import { Payment, Prisma } from "@prisma/client";
import PaymentTable from "./_components/PaymentTable";
import db from "../../../../db/db";
import PagePagination from "@/components/PagePagination";

const PaymentPage = async ({
  searchParams,
}: {
  searchParams: { status: string; q: string; p: string };
}) => {
  const [inEmiCount, soldCount] = await Promise.all([
    db.vehicle.count({ where: { status: "in-emi" } }),
    db.vehicle.count({ where: { status: "sold" } }),
  ]);

  return (
    <>
      <Section>
        {/* header */}
        <div className="header flex gap-5 justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-2">Payments</h2>

          {/* cards */}
          <div className="cards flex gap-5 justify-center items-center ">
            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-3xl font-semibold text-primary">
                {soldCount}
              </h4>
              <p className="text-gray-400 text-[12px]">Done</p>
            </article>

            <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

            <article className="flex flex-col gap-1 justify-center items-center">
              <h4 className="text-3xl font-semibold text-primary">
                {inEmiCount}
              </h4>
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
            <DataTable searchParams={searchParams} />
          </Suspense>
        </div>
      </Section>
    </>
  );
};

type Payments = Prisma.PaymentGetPayload<{
  include: { vehicle: true; customer: true };
}>;

const DataTable = async ({
  searchParams,
}: {
  searchParams: { status: string; q: string; p: string };
}) => {
  let data;
  let count;

  const limit = 20;

  if (searchParams.status != null && searchParams.q != null) {
    [data, count] = await Promise.all([
      db.payment.findMany({
        include: { vehicle: true, customer: true },
        orderBy: {createdAt: 'desc'},
        where: {
          vehicle: {
            status:
              searchParams.status == "0"
                ? "sold"
                : searchParams.status == "1"
                ? "available"
                : "in-emi",
          },
          OR: [
            {
              vehicle: {
                engineNo: { startsWith: searchParams.q },
              },
            },
            {
              customer: {
                name: { contains: searchParams.q },
              },
            },
            {
              customer: {
                nid: { startsWith: searchParams.q },
              },
            },
          ],
        },
        skip: (Number(searchParams.p || 1) - 1) * limit,
        take: limit,
      }),
      db.payment.count({
        where: {
          vehicle: {
            status:
              searchParams.status == "0"
                ? "sold"
                : searchParams.status == "1"
                ? "available"
                : "in-emi",
          },
          OR: [
            {
              vehicle: {
                engineNo: { startsWith: searchParams.q },
              },
            },
            {
              customer: {
                name: { contains: searchParams.q },
              },
            },
            {
              customer: {
                nid: { startsWith: searchParams.q },
              },
            },
          ],
        },
      }),
    ]);
  } else if (searchParams.q != null) {
    [data, count] = await Promise.all([
      db.payment.findMany({
        include: { vehicle: true, customer: true },
        orderBy: {createdAt: 'desc'},
        where: {
          OR: [
            {
              vehicle: {
                engineNo: { startsWith: searchParams.q },
              },
            },
            {
              customer: {
                name: { contains: searchParams.q },
              },
            },
            {
              customer: {
                nid: { startsWith: searchParams.q },
              },
            },
          ],
        },
        skip: (Number(searchParams.p || 1) - 1) * limit,
        take: limit,
      }),
      db.payment.count({
        where: {
          OR: [
            {
              vehicle: {
                engineNo: { startsWith: searchParams.q },
              },
            },
            {
              customer: {
                name: { contains: searchParams.q },
              },
            },
            {
              customer: {
                nid: { startsWith: searchParams.q },
              },
            },
          ],
        },
      }),
    ]);
  } else if (searchParams.status != null) {
    [data, count] = await Promise.all([
      db.payment.findMany({
        include: { vehicle: true, customer: true },
        orderBy: {createdAt: 'desc'},
        where: {
          vehicle: {
            status:
              searchParams.status == "0"
                ? "sold"
                : searchParams.status == "1"
                ? "available"
                : "in-emi",
          },
        },
        skip: (Number(searchParams.p || 1) - 1) * limit,
        take: limit,
      }),
      db.payment.count({
        where: {
          vehicle: {
            status:
              searchParams.status == "0"
                ? "sold"
                : searchParams.status == "1"
                ? "available"
                : "in-emi",
          },
        },
      }),
    ]);
  } else {
    [data, count] = await Promise.all([
      db.payment.findMany({
        include: {customer: true, vehicle: true},
        orderBy: {createdAt: 'desc'},
        skip: (Number(searchParams.p || 1) - 1) * limit,
        take: limit,
      }),
      db.payment.count(),
    ]);
  }

  return (
    <div className="flex flex-col gap-10">
      <PaymentTable payments={data as Payments[]} />
      <PagePagination limit={limit} count={count} />
    </div>
  );
};

export default PaymentPage;
