'use client'

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

import { vehicles } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import React, { useState } from "react";



const VehicleTable = ({ vehicle }: { vehicle: typeof vehicles }) => {

    const [sellVehicle, setSellVehicle] = useState<boolean | string>(false)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Chasis no.</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Price</TableHead>
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
              <TableCell className="flex gap-1 justify-end">
                <Tooltips title="Sell Vehicle">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full size-8"
                  >
                    <ShoppingCart className="size-4" />
                  </Button>
                </Tooltips>

                <Tooltips title="Edit">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full size-8"
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
      
    </>
  );
};

export default VehicleTable;
