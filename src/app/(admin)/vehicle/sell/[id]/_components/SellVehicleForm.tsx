"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Section from "@/components/Section";
import { useDebounce } from "@/hooks/useDebounce";
import { Customer, Vehicle } from "@prisma/client";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { useFormState, useFormStatus } from "react-dom";
import { sellVehicle } from "@/app/(admin)/_actions/sell";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/DatePicker";

const SellVehicleForm = ({ vehicle }: { vehicle: Vehicle }) => {
  const [nid, setNid] = useState<string>("");
  const [date, setDate] = React.useState<Date>();

  const [customerData, setCustomerData] = useState<Customer>();
  const debonceValue = useDebounce(nid);
  const router = useRouter();

  const [data, action] = useFormState(sellVehicle, null);

  const handleCustomer = async () => {
    const res = await fetch("/api/sell/" + nid);
    const data = await res.json();
    setCustomerData(data);
  };

  useEffect(() => {
    if (nid.length > 9) {
      handleCustomer();
    }
  }, [debonceValue]);

  useEffect(() => {
    if (data?.success != null) {
      toast.success(data.success);
      router.push("/vehicle");
    } else if (data?.db) {
      toast.error(data.db);
    }
  }, [data]);

  return (
    <>
      {/* form */}
      {/* customer form */}
      <form action={action}>
        <Section className="pt-5 pb-8">
          <h3 className="text-primary font-semibold border-b border-secondary pb-2">
            Customer Information
          </h3>

          <div className="my-5 border-b pb-5">
            <p className=" w-[400px]">
              <Label htmlFor="nid">National ID</Label>
              <Input
                id="nid"
                name="nid"
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
                name="name"
                defaultValue={customerData && customerData?.name}
                placeholder="Enter customer full name"
              />
              {data?.error && <p className="error-msg">{data.error.name}</p>}
            </p>
            <p>
              <Label htmlFor="fatherName">Father&apos;s Name</Label>
              <Input
                id="fatherName"
                name="fatherName"
                defaultValue={(customerData && customerData.fatherName) || ""}
                placeholder="Enter father name"
              />
              {data?.error && (
                <p className="error-msg">{data.error.fatherName}</p>
              )}
            </p>
            <p>
              <Label htmlFor="motherName">Mother&apos;s Name</Label>
              <Input
                id="motherName"
                name="motherName"
                defaultValue={(customerData && customerData.motherName) || ""}
                placeholder="Enter mother name"
              />
              {data?.error && (
                <p className="error-msg">{data.error.motherName}</p>
              )}
            </p>
            <p>
              <Label htmlFor="spouseName">Spouse Name</Label>
              <Input
                id="spouseName"
                name="spouseName"
                defaultValue={(customerData && customerData.spouseName) || ""}
                placeholder="Enter spouse name"
              />
              {data?.error && (
                <p className="error-msg">{data.error.spouseName}</p>
              )}
            </p>
            <p>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                name="mobile"
                id="mobile"
                placeholder="ex. 01777 333444"
                defaultValue={(customerData && customerData.mobile) || ""}
              />
              {data?.error && <p className="error-msg">{data.error.mobile}</p>}
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
                name="engineNo"
                value={vehicle && vehicle.engineNo}
                placeholder="Enter vehicle number"
              />
              {data?.error && (
                <p className="error-msg">{data.error.engineNo}</p>
              )}
            </p>
            <p>
              <Label htmlFor="sellingPrice">Price</Label>
              <Input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                placeholder={`Purchase price ${
                  vehicle && formatCurrency(vehicle.purchasePrice)
                }`}
              />
              {data?.error && (
                <p className="error-msg">{data.error.sellingPrice}</p>
              )}
            </p>
            <p className="flex flex-col gap-1">
              <Label htmlFor="vehicleType">Payment Type</Label>
              <Select
                id="vehicleType"
                name="vehicleType"
                className="bg-white"
                defaultValue={""}
              >
                <option value="">Select Type</option>
                <option value="emi">EMI</option>
                <option value="full-payment">Full Payment</option>
              </Select>
              {data?.error && (
                <p className="error-msg">{data.error.vehicleType}</p>
              )}
            </p>
            <p>
              <Label htmlFor="paidAmount">Paid Amount</Label>
              <Input
                type="number"
                id="paidAmount"
                name="paidAmount"
                placeholder="Enter paid amount"
              />
              {data?.error && (
                <p className="error-msg">{data.error.paidAmount}</p>
              )}
            </p>
            <p>
              <Label htmlFor="emiNo">No of EMI</Label>
              <Input
                type="number"
                id="emiNo"
                name="emiNo"
                placeholder="Enter the number of total month of EMI"
              />
              {data?.error && <p className="error-msg">{data.error.emiNo}</p>}
            </p>
            <p className="">
              <Label htmlFor="emiDate">EMI Date</Label>
              {/* <DatePicker date={date} setDate={setDate} /> */}
              <Input
                type="date"
                id="emiDate"
                name="emiDate"
              />
              {data?.error && <p className="error-msg">{data.error.emiDate}</p>}
            </p>

            <p>
              <Label htmlFor="interestRate">Interest Rate (per Lac)</Label>
              <Input
                type="number"
                id="interestRate"
                name="interestRate"
                placeholder="Enter per month interest per lac"
              />
              {data?.error && (
                <p className="error-msg">{data.error.interestRate}</p>
              )}
            </p>
          </div>
          <SubmitButton />
        </Section>
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? `Submitting...` : `Submit`}
    </Button>
  );
};

export default SellVehicleForm;
