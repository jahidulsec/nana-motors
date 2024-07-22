"use client";

import React from "react";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Section from "@/components/Section";

const SellVehicleForm = () => {
  return (
    <>
      {/* form */}
      {/* customer form */}
      <form action="">
        <Section className="pt-5 pb-8">
          <h3 className="text-primary font-semibold border-b border-secondary pb-2">
            Customer Information
          </h3>
          <div className="grid grid-cols-3 gap-3 my-5">
            <p>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter customer full name" />
            </p>
            <p>
              <Label htmlFor="father_name">Father's Name</Label>
              <Input id="father_name" placeholder="Enter father name" />
            </p>
            <p>
              <Label htmlFor="mother_name">Mother's Name</Label>
              <Input id="mother_name" placeholder="Enter mother name" />
            </p>
            <p>
              <Label htmlFor="spouse_name">Spouse Name</Label>
              <Input id="spouse_name" placeholder="Enter spouse name" />
            </p>
            <p>
              <Label htmlFor="nid">National ID</Label>
              <Input type="number" id="nid" placeholder="ex. XXXXXXXXX" />
            </p>
            <p>
              <Label htmlFor="mobile">Mobile</Label>
              <Input type="number" id="mobile" placeholder="ex. 01777 333444" />
            </p>
            <p>
              <Label htmlFor="mobile_2">Mobile 2</Label>
              <Input type="number" id="mobile_2" placeholder="ex. 01777 333444 (optional)" />
            </p>
            <p>
              <Label htmlFor="mobile_3">Mobile 3</Label>
              <Input type="number" id="mobile_3" placeholder="ex. 01777 333444 (optional)"  />
            </p>
          </div>

          <div className="address grid grid-cols-3 gap-3">
            <p>
              <Label htmlFor="House Name">House Name</Label>
              <Input id="House Name" placeholder="Enter house name or number" />
            </p>
            <p>
              <Label htmlFor="village">Village</Label>
              <Input id="village" placeholder="Enter village name" />
            </p>
            <p>
              <Label htmlFor="post_office">Post Office</Label>
              <Input id="post_office" placeholder="Enter post office name" />
            </p>
            <p>
              <Label htmlFor="upazilla">Upazilla</Label>
              <Input id="upazilla" placeholder="Enter upazilla name" />
            </p>
            <p>
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="Enter district" />
            </p>
          </div>
        </Section>

        {/* vehicle form */}
        <Section className="my-5 pt-5 pb-8">
          <h3 className="text-primary font-semibold border-b border-secondary pb-2">
            Vehicle Information
          </h3>
          <div className="my-5 grid grid-cols-3 gap-3">
            <p>
              <Label htmlFor="vehicle_no">Vehicle No.</Label>
              <Input id="vehicle_no" placeholder="Enter vehicle number"/>
            </p>
            <p>
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" placeholder="Enter selling price" />
            </p>
            <p className="flex flex-col gap-1">
              <Label htmlFor="payment_type">Payment Type</Label>
              <Select id="payment_type" className="bg-white" defaultValue={""}>
                <option value="">Select Type</option>
                <option value="emi">EMI</option>
                <option value="full_payment">Full Payment</option>
              </Select>
            </p>
            <p>
              <Label htmlFor="paid_amount">Paid Amount</Label>
              <Input type="number" id="paid_amount" placeholder="Enter paid amount" />
            </p>
            <p>
              <Label htmlFor="no_emi">No of EMI</Label>
              <Input type="number" id="no_emi" placeholder="Enter the number of total month of EMI" />
            </p>
            <p>
              <Label htmlFor="no_emi_month">EMI Date</Label>
              <Input type="date" id="no_emi_month" />
            </p>

            <p>
              <Label htmlFor="interest_rate">Interest Rate (per Lac)</Label>
              <Input type="number" id="interest_rate" placeholder="Enter per month interest per lac" />
            </p>
          </div>
          <Button size={"sm"}>Submit</Button>
        </Section>
      </form>
    </>
  );
};

export default SellVehicleForm;
