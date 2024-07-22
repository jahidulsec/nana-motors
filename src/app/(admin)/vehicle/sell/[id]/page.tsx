import Section from "@/components/Section";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const VehicleSellPage = () => {
  return (
    <Section className="mb-10">
      <div className="header">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Sell Vehicle
        </h2>
      </div>

      {/* form */}
      {/* customer form */}
      <form action="">
        <div className="">
          <h3 className="text-sm text-gray-800 font-semibold border-b pb-2">
            Customer Information
          </h3>
          <div className="grid grid-cols-3 gap-3 my-5">
            <p>
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </p>
            <p>
              <Label htmlFor="father_name">Father's Name</Label>
              <Input id="father_name" />
            </p>
            <p>
              <Label htmlFor="mother_name">Mother's Name</Label>
              <Input id="mother_name" />
            </p>
            <p>
              <Label htmlFor="spouse_name">Spouse Name</Label>
              <Input id="spouse_name" />
            </p>
            <p>
              <Label htmlFor="nid">National ID</Label>
              <Input type="number" id="nid" />
            </p>
            <p>
              <Label htmlFor="mobile">Mobile</Label>
              <Input type="number" id="mobile" />
            </p>
            <p>
              <Label htmlFor="mobile_2">Mobile 2</Label>
              <Input type="number" id="mobile_2" />
            </p>
            <p>
              <Label htmlFor="mobile_3">Mobile 3</Label>
              <Input type="number" id="mobile_3" />
            </p>
          </div>

          <div className="address grid grid-cols-3 gap-3">
            <p>
              <Label htmlFor="House Name">House Name</Label>
              <Input id="House Name" />
            </p>
            <p>
              <Label htmlFor="village">Village</Label>
              <Input id="village" />
            </p>
            <p>
              <Label htmlFor="post_office">Post Office</Label>
              <Input id="post_office" />
            </p>
            <p>
              <Label htmlFor="upazilla">Upazilla</Label>
              <Input id="upazilla" />
            </p>
            <p>
              <Label htmlFor="district">District</Label>
              <Input id="district" />
            </p>
          </div>
        </div>

        {/* vehicle form */}
        <div className="my-5">
          <h3 className="text-sm text-gray-800 font-semibold border-b pb-2">
            Vehicle Information
          </h3>
          <div className="my-5 grid grid-cols-3 gap-3">
            <p>
              <Label htmlFor="vehicle_no">Vehicle No.</Label>
              <Input id="vehicle_no" />
            </p>
            <p>
              <Label htmlFor="price">Price</Label>
              <Input type="number" id="price" />
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
              <Input type="number" id="paid_amount" />
            </p>
            <p>
              <Label htmlFor="due_amount">Due Amount</Label>
              <Input type="number" id="due_amount" />
            </p>
            <p>
              <Label htmlFor="no_emi">No of EMI</Label>
              <Input type="number" id="no_emi" />
            </p>
            <p>
              <Label htmlFor="no_emi_month">EMI Date</Label>
              <Input type="date" id="no_emi_month" />
            </p>

            <p>
              <Label htmlFor="interest_rate">Interest Rate (per Lac)</Label>
              <Input type="number" id="interest_rate" />
            </p>
          </div>
        </div>

        <div className="buttons flex gap-5">
          <Button className="border-primary" size={'sm'} variant={'outline'}>Preview</Button>
          <Button size={'sm'}>Submit</Button>
        </div>
      </form>
    </Section>
  );
};

export default VehicleSellPage;
