"use client"

import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addVehicle } from "../../_actions/vehicle";
import { Vehicle } from "@prisma/client";
import { toast } from "react-toastify";

interface VehicleProps {
  vehicle?: Vehicle;
  onClose: () => void;
}

const PurchaseForm = ({ vehicle, onClose }: VehicleProps) => {

  const [data, action] = useFormState(addVehicle, null);

  useEffect(() => {
    if (data?.success != null) {
      toast.success(data.success)
      onClose()
    } 
  }, [data]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <p>
            <Label htmlFor="engineNo">Engine No.</Label>
            <Input id="engineNo" name="engineNo" />
            {data?.error != null && data?.error.engineNo && (
              <p className="error-msg">{data.error.engineNo}</p>
            )}
          </p>

          <p>
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input type="number" id="purchasePrice" name="purchasePrice" />
            {data?.error != null && data?.error.purchasePrice && (
              <p className="error-msg">{data.error.purchasePrice}</p>
            )}
          </p>

          <p className="flex flex-col gap-1">
            <Label htmlFor="carCondition">Car Type</Label>
            <Select
              id="carCondition"
              name="carCondition"
              className="bg-white"
              defaultValue={""}
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </Select>
            {data?.error != null && data?.error.carCondition && (
              <p className="error-msg">{data.error.carCondition}</p>
            )}
          </p>

          <p className="flex flex-col gap-1">
            <Label htmlFor="sellerType">Seller Type</Label>
            <Select
              id="sellerType"
              name="sellerType"
              className="bg-white"
              defaultValue={""}
            >
              <option value="company">Company</option>
              <option value="user">User</option>
            </Select>
            {data?.error != null && data?.error.sellerType && (
              <p className="error-msg">{data.error.sellerType}</p>
            )}
          </p>

          <p>
            <Label htmlFor="sellerName">Seller Name</Label>
            <Input type="text" id="sellerName" name="sellerName" />

            {data?.error != null && data?.error.sellerName && (
              <p className="error-msg">{data.error.sellerName}</p>
            )}
          </p>

          <p>
            <Label htmlFor="sellerContact">Seller Contact</Label>
            <Input type="number" id="sellerContact" name="sellerContact" />

            {data?.error != null && data?.error.sellerContact && (
              <p className="error-msg">{data.error.sellerContact}</p>
            )}
          </p>

          <p>
            <Label htmlFor="sellerAddress">Seller Address</Label>
            <Input type="text" id="sellerAddress" name="sellerAddress" />
            {data?.error != null && data?.error.sellerAddress && (
              <p className="error-msg">{data.error.sellerAddress}</p>
            )}
          </p>
        </div>

        <SubmitButton />
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? `Saving...` : `Save`}
    </Button>
  );
};

export default PurchaseForm;
