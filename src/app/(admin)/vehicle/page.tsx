import React, { Suspense } from "react";
import Section from "@/components/Section";
import VehicleTable from "./_components/VehicleTable";
import { wait } from "@/lib/wait";
import { vehicles } from "@/lib/data";
import FilterSection from "./_components/FilterSection";

const VehiclePage = () => {


  return (
    <Section>
      {/* header */}
      <div className="header flex gap-5 justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">Vehicles</h2>

        {/* cards */}
        <div className="cards flex gap-5 justify-center items-center ">
          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary">94</h4>
            <p className="text-gray-400 text-[12px]">In Stock</p>
          </article>

          <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary">20</h4>
            <p className="text-gray-400 text-[12px]">In progress</p>
          </article>
        </div>
      </div>

      {/* filtes */}
      <FilterSection />

      {/* data table of recent task */}
      <div className="my-5">
        <Suspense fallback={<p>Loading...</p>}>
          <DataTable />
        </Suspense>
      </div>
    </Section>
  );
};


const DataTable = async() => {

  const fetchData = async() => {
    await wait()
    return vehicles
  }

  const data = await fetchData()

  return (
    <>
      <VehicleTable vehicle={data} />
    </>
  )
}

export default VehiclePage;
