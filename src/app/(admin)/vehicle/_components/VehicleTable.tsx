import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vehicles } from "@/lib/data";
import { formatDate } from "@/lib/formatter";
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
            {
                vehicle.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.model}</TableCell>
                        <TableCell>{item.chesis_number}</TableCell>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </>
  );
};

export default VehicleTable;
