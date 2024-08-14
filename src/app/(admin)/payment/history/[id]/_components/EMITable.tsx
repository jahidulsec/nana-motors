"use client";

import Tooltips from "@/components/Tooltips";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency, formatDate } from "@/lib/formatter";
import { Edit, MessageSquareOff, Trash } from "lucide-react";
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
import { deleteEmi } from "@/app/(admin)/_actions/payment";
import { useParams } from "next/navigation";

type Payments = Prisma.EmiGetPayload<{
  include: { payment: true };
}>;

const EMITable = ({ emiData }: { emiData: Payments[] }) => {
  const [editPayment, setEditPayment] = useState<any>(false);
  const [delPayment, setDelPayment] = useState<any>();
  const params = useParams()

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Payment Amount</TableHead>
            <TableHead>Refenece No.</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Given By</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {emiData.length > 0 ? (
            emiData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{formatCurrency(item.paymentAmount)}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>{item.method}</TableCell>
                <TableCell>{item.givenBy}</TableCell>
                <TableCell className="flex gap-1 justify-end">
                  <Tooltips title="Edit">
                    <Button
                      // asChild
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                    >
                      {/* <Link href={`/vehicle/sell/${item.vehicleId}`}> */}
                      <Edit className="size-4" />
                      {/* </Link> */}
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
              colSpan={7}
              align="center"
              className="py-20 text-gray-400 pointer-events-none"
            >
              <MessageSquareOff className="size-10" />
              <span className="text-[11px]">No data</span>
            </TableCell>
          )}
        </TableBody>
      </Table>

      {/* sell car modal */}
      <Dialog open={editPayment} onOpenChange={setEditPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>
          {/* <PurchaseForm
            vehicle={editPayment}
            onClose={() => {
              setEditPayment(false);
            }}
          /> */}
        </DialogContent>
      </Dialog>

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
                  await deleteEmi(delPayment, Number(params.id));
                  toast.success("EMI has been deleted");
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

export default EMITable;
