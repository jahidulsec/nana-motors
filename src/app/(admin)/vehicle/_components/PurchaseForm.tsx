import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const PurchaseForm = () => {
  return (
    <>
      <form action="" className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <p>
            <Label htmlFor="engine_no">Engine No.</Label>
            <Input id="engine_no" />
          </p>

          <p>
            <Label htmlFor="purchase_price">Purchase Price</Label>
            <Input type="number" id="purchase_price" />
          </p>

          <p className="flex flex-col gap-1">
            <Label htmlFor="car_type">Car Type</Label>
            <Select id="car_type" className="bg-white" defaultValue={""}>
              <option value="used">Used</option>
              <option value="new">New</option>
            </Select>
          </p>

          <p className="flex flex-col gap-1">
            <Label htmlFor="seller_type">Seller Type</Label>
            <Select id="seller_type" className="bg-white" defaultValue={""}>
              <option value="used">Company</option>
              <option value="new">User</option>
            </Select>
          </p>

          <p>
            <Label htmlFor="seller_name">Seller Name</Label>
            <Input type="text" id="seller_name" />
          </p>

          <p>
            <Label htmlFor="seller_contact">Seller Contact</Label>
            <Input type="number" id="seller_contact" />
          </p>

          <p>
            <Label htmlFor="seller_address">Seller Address</Label>
            <Input type="text" id="seller_address" />
          </p>
        </div>

        <Button className="self-start">Submit</Button>
      </form>
    </>
  );
};

export default PurchaseForm;
