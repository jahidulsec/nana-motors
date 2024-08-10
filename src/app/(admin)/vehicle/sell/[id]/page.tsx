import React from "react";
import SellVehicleForm from "./_components/SellVehicleForm";
import db from "../../../../../../db/db";
import { Payment, Vehicle } from "@prisma/client";

const VehicleSellPage = async({params}: {params: {id: string}}) => {
  
  const [vehicleData, paymentData] = await Promise.all([
    db.vehicle.findUnique({where: {id: Number(params.id)}}),
    db.payment.findFirst({where: {vehicleId: Number(params.id)}, include: {customer: true}})
  ])

  return (
    <>
      {/* form */}
      <SellVehicleForm vehicle={vehicleData as Vehicle} payment={paymentData as Payment} />
    </>
  );
};

export default VehicleSellPage;
