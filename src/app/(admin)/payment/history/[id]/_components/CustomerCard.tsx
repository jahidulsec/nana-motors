import React from "react";
import { PaymentDetails } from "../page";

const CustomerCard = ({ payment }: { payment: PaymentDetails }) => {
  return (
    <article className="border p-3 rounded-md">
      <h3 className="text-lg font-title text-primary font-medium border-b pb-1">
        Customer Information
      </h3>

      <div className="grid gap-3 sm:grid-cols-3 my-3">
        <p className="flex flex-col gap-1 font-para col-span-2">
          <span className="text-gray-700 text-sm font-para">Full Name</span>
          <span className="text-primary">{payment.customer.name}</span>
        </p>
        <p className="flex flex-col gap-1 font-para">
          <span className="text-gray-700 text-sm font-para">Mobile</span>
          <span className="text-primary">{payment.customer.mobile}</span>
        </p>
        {payment.customer.fatherName && (
          <p className="flex flex-col gap-1 font-para">
            <span className="text-gray-700 text-sm font-para">Father&apos;s Name</span>
            <span className="text-primary">{payment.customer.fatherName}</span>
          </p>
        )}

        {payment.customer.motherName && (
          <p className="flex flex-col gap-1 font-para">
            <span className="text-gray-700 text-sm font-para">Mother&apos;s Name</span>
            <span className="text-primary">{payment.customer.motherName}</span>
          </p>
        )}

        {payment.customer.spouseName && (
          <p className="flex flex-col gap-1 font-para">
            <span className="text-gray-700 text-sm font-para">Spouse&apos;s Name</span>
            <span className="text-primary">{payment.customer.spouseName}</span>
          </p>
        )}

        <p className="flex flex-col gap-1 font-para">
          <span className="text-gray-700 text-sm font-para">National ID</span>
          <span className="text-primary">{payment.customer.nid}</span>
        </p>

        {(payment.customer.houseName ||
          payment.customer.upazilla ||
          payment.customer.district) && (
          <p className="flex flex-col gap-1 font-para col-span-2">
            <span className="text-gray-700 text-sm font-para">Address</span>
            <span className="text-primary">
              {payment.customer.houseName ? payment.customer.houseName : ``}
              {payment.customer.upazilla
                ? ", " + payment.customer.upazilla
                : ``}
              {payment.customer.district
                ? ", " + payment.customer.district
                : ``}
            </span>
          </p>
        )}
      </div>
    </article>
  );
};

export default CustomerCard;
