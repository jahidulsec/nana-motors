import React from "react";
import { PaymentDetails } from "../page";
import { formatDate } from "@/lib/formatter";

const EMICard = ({payment, noOfMonthDue}: {payment: PaymentDetails, noOfMonthDue: number}) => {

    const emiAmount = ((payment.sellingPrice - payment.paidAmount) / (payment.emiNo as number)).toFixed(2)
    const interestAmount = (payment.sellingPrice - payment.paidAmount) / 100000 * (payment.interestRate as number)
   

  return (
    <article className="border p-3 rounded-md">
      <h3 className="text-lg text-primary font-medium border-b pb-1 font-title">
        EMI Details
      </h3>

      <div className="grid gap-3 sm:grid-cols-3 my-3">
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">EMI Date</span>
          <span className="text-primary">{formatDate(payment.emiDate as Date)}</span>
        </p>
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">No. of EMI</span>
          <span className="text-primary">{payment.emiNo}</span>
        </p>
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">Engine No.</span>
          <span className="text-primary">{payment.vehicle.engineNo}</span>
        </p>
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">Monthly EMI</span>
          <span className="text-primary">{emiAmount}</span>
        </p>
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">Monthly Interest</span>
          <span className="text-primary">{interestAmount}</span>
        </p>
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">Monthly Total</span>
          <span className="text-primary">{(Number(emiAmount) + Number(interestAmount)).toFixed(2)}</span>
        </p>
        
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">No. of Interest Month</span>
          <span className="text-primary">{noOfMonthDue}</span>
        </p>
        <p className="flex flex-col font-para gap-1">
          <span className="text-gray-500 text-sm font-para">Total Interest</span>
          <span className="text-primary">{noOfMonthDue * interestAmount}</span>
        </p>
      </div>
    </article>
  );
};

export default EMICard;
