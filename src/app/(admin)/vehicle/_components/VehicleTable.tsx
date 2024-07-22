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

import { vehicles } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import VehicleTag from "./VehicleTag";
import PurchaseForm from "./PurchaseForm";

const VehicleTable = ({ vehicle }: { vehicle: typeof vehicles }) => {
  const [editVehicle, setEditVehicle] = useState<any>(false);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Chasis no.</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicle.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="w-[120px]">{item.model}</TableCell>
              <TableCell className="w-[150px]">{item.chesis_number}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell><VehicleTag tagName={item.status} /></TableCell>
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
          <PurchaseForm vehicle={editVehicle} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VehicleTable;
