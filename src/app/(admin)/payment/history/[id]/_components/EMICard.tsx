import React from "react";
import { PaymentDetails } from "../page";
import { formatDate } from "@/lib/formatter";
import { countMonth } from "@/lib/countMonth";

const EMICard = ({payment}: {payment: PaymentDetails}) => {

    const emiAmount = ((payment.sellingPrice - payment.paidAmount) / (payment.emiNo as number)).toFixed(2)
    const interestAmount = (payment.sellingPrice - payment.paidAmount) / 100000 * (payment.interestRate as number)
    const noOfMonthDue = countMonth(new Date(), payment.emiDate as Date)

  return (
    <article className="border p-3 rounded-md">
      <h3 className="text-lg text-primary font-medium border-b pb-1">
        EMI Details
      </h3>

      <div className="grid gap-3 md:grid-cols-3 my-3">
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">EMI Date</span>
          <span className="text-primary">{formatDate(payment.emiDate as Date)}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Monthly EMI Amount</span>
          <span className="text-primary">{emiAmount}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Monthly Interest Amount</span>
          <span className="text-primary">{interestAmount}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Monthly Total Amount</span>
          <span className="text-primary">{Number(emiAmount) + Number(interestAmount)}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">No. of EMI</span>
          <span className="text-primary">{payment.emiNo}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Engine No.</span>
          <span className="text-primary">{payment.vehicle.engineNo}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">No. of Interest Month</span>
          <span className="text-primary">{noOfMonthDue}</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Total Interest</span>
          <span className="text-primary">{noOfMonthDue * interestAmount}</span>
        </p>
      </div>
    </article>
  );
};

export default EMICard;
