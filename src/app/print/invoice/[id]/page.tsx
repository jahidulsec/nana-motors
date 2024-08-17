import React from "react";
import Header from "./_components/Header";
import db from "../../../../../db/db";
import CustomerCard from "./_components/CustomerCard";
import { Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatNumber, titleCase } from "@/lib/formatter";

export type PaymentDetails = Prisma.PaymentGetPayload<{
  include: { customer: true; vehicle: true; admin: true };
}>;

async function InvoicePage({ params }: { params: { id: string } }) {
  const vehiclePayment = await db.payment.findUnique({
    where: { id: Number(params.id) },
    include: { admin: true, vehicle: true, customer: true },
  });

  const interestAmount =
    (((vehiclePayment?.sellingPrice as number) -
      (vehiclePayment?.paidAmount as number)) /
      100000) *
    (vehiclePayment?.interestRate as number);

  const emiAmount = (
    (Number(vehiclePayment?.sellingPrice) -
      Number(vehiclePayment?.paidAmount)) /
    (vehiclePayment?.emiNo as number)
  ).toFixed(2);

  return (
    <table className="container">
      <thead>
        <tr>
          <td>
            <Header />

            <h3 className="text-gray-500 text-[18px] uppercase">
              # {vehiclePayment?.invoiceNo}
            </h3>

            {/* customer card */}
            <CustomerCard payment={vehiclePayment as PaymentDetails} />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-para">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-para">S.N.</TableHead>
                  <TableHead className="font-para">Engine No.</TableHead>
                  <TableHead className="font-para">Payment Type</TableHead>
                  <TableHead className="font-para">Description</TableHead>
                  <TableHead className="font-para text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b">
                  <TableCell className="font-para align-top">1</TableCell>
                  <TableCell className="font-para align-top">
                    {vehiclePayment?.vehicle.engineNo}.
                  </TableCell>
                  <TableCell className="font-para align-top">
                    {titleCase(vehiclePayment?.vehicleType as string)}
                  </TableCell>
                  <TableCell className="font-para align-top w-[20rem]">
                    {vehiclePayment?.vehicleType == "emi" ? (
                      <div className="flex flex-col gap-2">
                        <p>
                          <span>Interest per lac is</span>{" "}
                          <b>
                            {formatCurrency(
                              vehiclePayment.interestRate as number,
                            )}
                          </b>
                          . <span>Interest per month is</span>{" "}
                          <b>{formatCurrency(interestAmount)}</b>.{" "}
                          <span>EMI number is</span>{" "}
                          <b>{formatNumber(Number(vehiclePayment.emiNo))}</b>.{" "}
                          <span>EMI per month is</span>{" "}
                          <b>{formatCurrency(Number(emiAmount))}</b>.{" "}
                          <span>EMI with interest per month is</span>{" "}
                          <b>
                            {formatCurrency(Number(emiAmount) + interestAmount)}
                          </b>
                        </p>
                      </div>
                    ) : (
                      <p>Full Payment</p>
                    )}
                  </TableCell>
                  <TableCell className="font-para text-right align-top">
                    {formatNumber(vehiclePayment?.sellingPrice as number)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="font-para font-bold text-right py-[10px]"
                  >
                    Paid Amount
                  </TableCell>
                  <TableCell className="font-para py-[10px] text-right">
                    {formatNumber(vehiclePayment?.paidAmount as number)}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-red-700">
                  <TableCell
                    colSpan={4}
                    className="font-para font-bold text-right py-[10px]"
                  >
                    Due Amount
                  </TableCell>
                  <TableCell className="font-para py-[10px] text-right">
                    {formatNumber(
                      Number(vehiclePayment?.sellingPrice) -
                        Number(vehiclePayment?.paidAmount),
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div className="mt-10">
              <div className="flex justify-between items-center mt-20">
                <div className="border-t pt-2 w-[10rem] text-center">
                  <p>Manager Signature</p>
                </div>
                <div className="border-t pt-2 w-[10rem] text-center">
                  <p>Customer Signature</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default InvoicePage;
