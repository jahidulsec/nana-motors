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
import { formatDate } from "@/lib/formatter";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import React from "react";

const VehicleTable = ({ vehicle }: { vehicle: typeof vehicles }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Chasis no.</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vehicle.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.chesis_number}</TableCell>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell className="flex gap-1">
                <Tooltips title="Sell Vehicle">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full"
                  >
                    <ShoppingCart className="size-4" />
                  </Button>
                </Tooltips>

                <Tooltips title="Edit">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full"
                  >
                    <Edit className="size-4" />
                  </Button>
                </Tooltips>
                <Tooltips title="Delete">
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="rounded-full"
                  >
                    <Trash className="size-4" />
                  </Button>
                </Tooltips>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default VehicleTable;
