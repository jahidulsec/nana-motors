import React from "react";
import SellVehicleForm from "./_components/SellVehicleForm";
import db from "../../../../../../db/db";
import { Vehicle } from "@prisma/client";

const VehicleSellPage = async({params}: {params: {id: string}}) => {
  
  const vehicleData = await db.vehicle.findUnique({where: {id: Number(params.id)}})

  return (
    <>
      {/* form */}
      <SellVehicleForm vehicle={vehicleData as Vehicle} />
    </>
  );
};

export default VehicleSellPage;
