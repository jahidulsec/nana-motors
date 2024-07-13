"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PurchaseForm from "./PurchaseForm";

const FilterSection = () => {
  const [purchase, setPurchase] = useState<any>(false);

  return (
    <>
      <div className="filters flex justify-between items-center gap-5 my-5">
        <div className="filters flex gap-3 items-center">
          <Input placeholder="Search by engine number" />

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sold</SelectItem>
              <SelectItem value="dark">Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="buttons flex gap-3">
          <Button size={"sm"} onClick={() => setPurchase(true)}>
            <Plus className="size-4 mr-2" />
            <span>Add</span>
          </Button>
        </div>
      </div>

      {/* purchase car modal */}
      <Dialog open={purchase} onOpenChange={setPurchase}>
        <DialogContent className="w-[75vw]">
          <DialogHeader>
            <DialogTitle>Add Vehicle</DialogTitle>
          </DialogHeader>
            <PurchaseForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterSection;
