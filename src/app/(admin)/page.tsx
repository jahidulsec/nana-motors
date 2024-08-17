import { BadgeDollarSign, Car } from "lucide-react";
import Card from "./_components/Card";
import db from "../../../db/db";
import DashboardHeader from "./_components/DashboardHeader";
import { cookies } from "next/headers";

const DashboardHome = async () => {
  const [availableCount, inProgressCount, inEmiCount, soldCount] =
    await Promise.all([
      db.vehicle.count({ where: { status: "available" } }),
      db.vehicle.count({ where: { status: "in-emi" } }),
      db.vehicle.count({ where: { status: "in-emi" } }),
      db.vehicle.count({ where: { status: "sold" } }),
    ]);

  return (
    <div className="flex justify-center items-center flex-col gap-5 min-h-[30rem]">
      <DashboardHeader />

      <div className="">
        {/* cards */}
        <div className="flex gap-0.5">
          <Card
            href="/vehicle"
            title="Vehicle"
            icon={<Car className="size-5" />}
            card1="In Stock"
            count1={availableCount}
            card2="In Progress"
            count2={inProgressCount}
          />
          <Card
            href="/payment"
            title="Payment"
            icon={<BadgeDollarSign className="size-5" />}
            card1="Done"
            count1={soldCount}
            card2="In EMI"
            count2={inEmiCount}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
