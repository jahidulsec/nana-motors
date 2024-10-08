"use client";

import Tooltips from "@/components/Tooltips";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency, formatDate } from "@/lib/formatter";
import {
  CreditCard,
  Edit,
  MessageSquareOff,
  Printer,
  ShoppingCart,
  Trash,
} from "lucide-react";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import VehicleTag from "../../vehicle/_components/VehicleTag";
import PaymentType from "./PaymentType";
import { deletePayment } from "../../_actions/payment";

type Payments = Prisma.PaymentGetPayload<{
  include: { vehicle: true; customer: true };
}>;

const PaymentTable = ({ payments }: { payments: Payments[] }) => {
  const [delPayment, setDelPayment] = useState<any>();

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Engine No.</TableHead>
            <TableHead>Selling Date</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.length > 0 ? (
            payments.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="w-[150px]">
                  {item.vehicle.engineNo}
                </TableCell>
                <TableCell>
                  {formatDate(item.emiDate || item.createdAt)}
                </TableCell>
                <TableCell>{formatCurrency(item.sellingPrice)}</TableCell>
                <TableCell>{item.customer.name}</TableCell>
                <TableCell>{item.customer.mobile}</TableCell>
                <TableCell align="center">
                  <PaymentType tagName={item.vehicleType as string} />
                </TableCell>
                <TableCell align="center" className="min-w-[7rem]">
                  <VehicleTag tagName={item.vehicle.status as string} />
                </TableCell>
                <TableCell className="flex gap-1 justify-end">
                  {item.vehicleType === "emi" && (
                    <Tooltips title="EMI">
                      <Link href={`/payment/history/${item.id}`}>
                        <Button
                          size={"icon"}
                          variant={"outline"}
                          className="rounded-full size-8"
                        >
                          <CreditCard className="size-4" />
                        </Button>
                      </Link>
                    </Tooltips>
                  )}

                  <Tooltips title="Invoice">
                    <Button
                      asChild
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                    >
                      <Link href={`/print/invoice/${item.id}`}>
                        <Printer className="size-4" />
                      </Link>
                    </Button>
                  </Tooltips>

                  <Tooltips title="Edit">
                    <Button
                      asChild
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                    >
                      <Link href={`/vehicle/sell/${item.vehicleId}`}>
                        <Edit className="size-4" />
                      </Link>
                    </Button>
                  </Tooltips>
                  <Tooltips title="Delete">
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      className="rounded-full size-8"
                      onClick={() => setDelPayment(item.id)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </Tooltips>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell
              colSpan={9}
              align="center"
              className="py-20 text-gray-400 pointer-events-none"
            >
              <MessageSquareOff className="size-10" />
              <span className="text-[11px]">No data</span>
            </TableCell>
          )}
        </TableBody>
      </Table>

      {/* alert delete vehicle modal */}
      <AlertDialog open={!!delPayment} onOpenChange={setDelPayment}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              vehicle and remove data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await deletePayment(delPayment);
                  toast.success("Vehicle has been deleted");
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaymentTable;
