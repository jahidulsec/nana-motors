import { BadgeDollarSign, Car } from "lucide-react";
import Card from "./_components/Card";
import db from "../../../db/db";

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
      <div className="py-5 text-center">
        <h1 className="text-3xl ">
          Hello <span className="font-semibold">Jahidul,</span>
        </h1>
        <p className="text-sm text-gray-500">
          Welcome to <strong>Nana Motors</strong>
        </p>
      </div>

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
