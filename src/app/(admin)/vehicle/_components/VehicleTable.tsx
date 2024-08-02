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
import { Edit, ShoppingCart, Trash } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import VehicleTag from "./VehicleTag";
import PurchaseForm from "./PurchaseForm";
import { Vehicle } from "@prisma/client";
import ConditionTag from "./ConditionTag";
import strict from "assert/strict";

const VehicleTable = ({ vehicle }: { vehicle: Vehicle[] }) => {
  const [editVehicle, setEditVehicle] = useState<any>(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Engine No.</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Condition</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicle.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="w-[150px]">{item.engineNo}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell>{formatCurrency(item.purchasePrice)}</TableCell>
              <TableCell align="center">
                <VehicleTag tagName={item.status as string} />
              </TableCell>
              <TableCell align="center">
                <ConditionTag tagName={item.carCondition as string} />
              </TableCell>
              <TableCell className="flex gap-1 justify-end">
                <Tooltips title="Sell Vehicle">
                  <Link href={`/vehicle/sell/${item.id}`}>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full size-8"
                    >
                      <ShoppingCart className="size-4" />
                    </Button>
                  </Link>
                </Tooltips>

                <Tooltips title="Edit">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full size-8"
                    onClick={() => setEditVehicle(item)}
                  >
                    <Edit className="size-4" />
                  </Button>
                </Tooltips>
                <Tooltips title="Delete">
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="rounded-full size-8"
                  >
                    <Trash className="size-4" />
                  </Button>
                </Tooltips>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* sell car modal */}
      <Dialog open={editVehicle} onOpenChange={setEditVehicle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vehicle</DialogTitle>
          </DialogHeader>
          <PurchaseForm
            vehicle={editVehicle}
            onClose={() => {
              setEditVehicle(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VehicleTable;
