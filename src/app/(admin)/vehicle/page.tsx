import React, { Suspense } from "react";
import Section from "@/components/Section";
import VehicleTable from "./_components/VehicleTable";
import FilterSection from "./_components/FilterSection";
import TableSkeleton from "@/components/TableSkeleton";
import db from "../../../../db/db";
import { Vehicle } from "@prisma/client";

const VehiclePage = async() => {

  const [availableCount, inProgressCount] = await Promise.all([
    db.vehicle.count({where: {status: "available"}}),
    db.vehicle.count({where: {status: "in-emi"}})
  ])

  return (
    <Section>
      {/* header */}
      <div className="header flex gap-5 justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">Vehicles</h2>

        {/* cards */}
        <div className="cards flex gap-5 justify-center items-center ">
          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary">{availableCount}</h4>
            <p className="text-gray-400 text-[12px]">In Stock</p>
          </article>

          <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary">{inProgressCount}</h4>
            <p className="text-gray-400 text-[12px]">In progress</p>
          </article>
        </div>
      </div>

      {/* filtes */}
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
  );
};

const DataTable = async () => {
  const data =  await db.vehicle.findMany()

  return (
    <>
      <VehicleTable vehicle={data as Vehicle[] } />
    </>
  );
};

export default VehiclePage;
