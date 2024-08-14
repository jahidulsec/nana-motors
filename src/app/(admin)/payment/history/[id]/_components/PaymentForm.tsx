"use client";

import { addEmiPayment } from "@/app/(admin)/_actions/payment";
import { Select } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Emi } from "@prisma/client";
import { SendHorizonal } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

interface FormProps {
  EMI?: Emi;
  onClose: () => void;
}

function PaymentForm({ EMI, onClose }: FormProps) {
  const [data, action] = useFormState(addEmiPayment, null);
  const params = useParams()

  useEffect(() => {
    if (data?.success != null) {
      toast.success(data.success);
      onClose();
    } else if (data?.db) {
      toast.error(data.db);
      onClose();
    }
  }, [data]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-3">
          <p className="hidden">
            <Input type="number" id="paymentId" name="paymentId" value={Number(params.id)} />
          </p>
          <p className="flex flex-col gap-1">
            <Label htmlFor="method">Payment Method</Label>
            <Select
              id="method"
              name="method"
              className="bg-white"
              defaultValue={EMI?.method || ""}
            >
              <option value="cash">Cash</option>
              <option value="bank-cheque">Bank Cheque</option>
              <option value="Bkash">Bkash</option>
              <option value="nagad">Nagad</option>
              <option value="roeket">Rocket</option>
              <option value="other">Other</option>
            </Select>
            {data?.error != null && data?.error.method && (
              <p className="error-msg">{data.error.method}</p>
            )}
          </p>
          <p>
            <Label htmlFor="paymentAmount">Amount</Label>
            <Input type="number" id="paymentAmount" name="paymentAmount" />
            {data?.error != null && data?.error.paymentAmount && (
              <p className="error-msg">{data.error.paymentAmount}</p>
            )}
          </p>
          <p>
            <Label htmlFor="givenBy">Given By</Label>
            <Input id="givenBy" name="givenBy" />
          </p>
          <p>
            <Label htmlFor="referenceNo">Reference No.</Label>
            <Input id="referenceNo" name="referenceNo" />
          </p>
        </div>

        <SubmitButton />
      </form>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <span>{pending ? `Paying...` : `Pay`}</span>
      <SendHorizonal className="size-4 ml-2" />
    </Button>
  );
};

export default PaymentForm;
