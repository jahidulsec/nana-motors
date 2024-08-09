"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Section from "@/components/Section";
import { useDebounce } from "@/hooks/useDebounce";
import db from "../../../../../../../db/db";
import { Customer, Vehicle } from "@prisma/client";

const SellVehicleForm = ({ vehicle }: { vehicle: Vehicle }) => {
  const [nid, setNid] = useState<string>("");
  const [customerData, setCustomerData] = useState<Customer>();
  const debonceValue = useDebounce(nid);

  const handleCustomer = async () => {
    // const data = await db.customer.findUnique({ where: { nid: nid } });
    const res = await fetch("/api/sell/" + nid);
    const data = await res.json();
    setCustomerData(data);
  };

  useEffect(() => {
    if (nid.length > 9) {
      handleCustomer();
    }
  }, [debonceValue]);

  return (
    <>
      {/* form */}
      {/* customer form */}
      <form>
        <Section className="pt-5 pb-8">
          <h3 className="text-primary font-semibold border-b border-secondary pb-2">
            Customer Information
          </h3>

          <div className="my-5 border-b pb-5">
            <p className=" w-[400px]">
              <Label htmlFor="nid">National ID</Label>
              <Input
                id="nid"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                placeholder="ex. XXXXXXXXX"
              />
            </p>
            {nid.length <= 9 && (
              <p className="error-msg">At least 10 characters</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5 border-b pb-5">
            <p>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={customerData && customerData?.name}
                placeholder="Enter customer full name"
              />
            </p>
            <p>
              <Label htmlFor="fatherName">Father&apos;s Name</Label>
              <Input
                id="fatherName"
                defaultValue={(customerData && customerData.fatherName) || ""}
                placeholder="Enter father name"
              />
            </p>
            <p>
              <Label htmlFor="motherName">Mother&apos;s Name</Label>
              <Input
                id="motherName"
                defaultValue={(customerData && customerData.motherName) || ""}
                placeholder="Enter mother name"
              />
            </p>
            <p>
              <Label htmlFor="spouseName">Spouse Name</Label>
              <Input
                id="spouseName"
                defaultValue={(customerData && customerData.spouseName) || ""}
                placeholder="Enter spouse name"
              />
            </p>
            <p>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                type="text"
                id="mobile"
                placeholder="ex. 01777 333444"
                defaultValue={(customerData && customerData.mobile) || ""}
              />
            </p>
            <p>
              <Label htmlFor="mobile_2">Mobile 2</Label>
              <Input
                type="text"
                id="mobile_2"
                placeholder="ex. 01777 333444 (optional)"
              />
            </p>
            <p>
              <Label htmlFor="mobile_3">Mobile 3</Label>
              <Input
                type="text"
                id="mobile_3"
                placeholder="ex. 01777 333444 (optional)"
              />
            </p>
          </div>

          <div className="address grid grid-cols-1 md:grid-cols-3 gap-3">
            <p>
              <Label htmlFor="houseName">House Name</Label>
              <Input
                id="houseName"
                defaultValue={(customerData && customerData.houseName) || ""}
                placeholder="Enter house name or number"
              />
            </p>
            <p>
              <Label htmlFor="village">Village</Label>
              <Input
                id="village"
                defaultValue={(customerData && customerData.village) || ""}
                placeholder="Enter village name"
              />
            </p>
            <p>
              <Label htmlFor="postOffice">Post Office</Label>
              <Input
                id="postOffice"
                defaultValue={(customerData && customerData.postOffice) || ""}
                placeholder="Enter post office name"
              />
            </p>
            <p>
              <Label htmlFor="upazilla">Upazilla</Label>
              <Input
                id="upazilla"
                defaultValue={(customerData && customerData.upazilla) || ""}
                placeholder="Enter upazilla name"
              />
            </p>
            <p>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                defaultValue={(customerData && customerData.district) || ""}
                placeholder="Enter district"
              />
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
              <Label htmlFor="engineNo">Vehicle No.</Label>
              <Input
                id="engineNo"
                defaultValue={vehicle && vehicle.engineNo}
                placeholder="Enter vehicle number"
              />
            </p>
            <p>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder={`Purchase price ${
                  vehicle && vehicle.purchasePrice
                }`}
              />
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
              <Input
                type="number"
                id="paid_amount"
                placeholder="Enter paid amount"
              />
            </p>
            <p>
              <Label htmlFor="no_emi">No of EMI</Label>
              <Input
                type="number"
                id="no_emi"
                placeholder="Enter the number of total month of EMI"
              />
            </p>
            <p>
              <Label htmlFor="no_emi_month">EMI Date</Label>
              <Input type="date" id="no_emi_month" />
            </p>

            <p>
              <Label htmlFor="interest_rate">Interest Rate (per Lac)</Label>
              <Input
                type="number"
                id="interest_rate"
                placeholder="Enter per month interest per lac"
              />
            </p>
          </div>
          <Button size={"sm"}>Submit</Button>
        </Section>
      </form>
    </>
  );
};

export default SellVehicleForm;
