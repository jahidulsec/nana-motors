'use client'
import React from "react";
import { TaskTable } from "./_components/TaskTable";
import Section from "@/components/Section";

const DashboardHome = () => {
  return (
    <Section>
      {/* header */}
      <div className="header flex gap-5 justify-between items-center">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Last tasks
          </h2>
          <p className="text-[12px] text-gray-500">
            <b className="font-semibold text-gray-700 text-sm">117 total, </b>
            proceed to resolve them
          </p>
        </div>

        {/* cards */}
        <div className="cards flex gap-5 justify-center items-center ">
          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary">94</h4>
            <p className="text-gray-400 text-[12px]">Done</p>
          </article>

          <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary">20</h4>
            <p className="text-gray-400 text-[12px]">In progress</p>
          </article>
        </div>
      </div>

      {/* data table of recent task */}
      <div className="my-5">
        <TaskTable />
      </div>
    </Section>
  );
};


export default DashboardHome;
