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
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PurchaseForm from "./PurchaseForm";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterSection = () => {
  const [purchase, setPurchase] = useState<any>(false);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname()

  const debounceValue = useDebounce(search);

  const params = new URLSearchParams(searchParams)

  useEffect(() => {
    if (search) {
      params.set('q', debounceValue)
    } else {
      params.delete('q')
    }
    router.push(pathname + '?' + params.toString())
  },[debounceValue])

  return (
    <>
      <div className="filters flex justify-between items-center gap-5 my-5">
        <div className="filters flex gap-3 items-center">
          <Input
            placeholder="Search by engine number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select onValueChange={(value) => {
            params.set('status', value)
            params.toString()
            router.push(pathname + '?' + params.toString())
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sold</SelectItem>
              <SelectItem value="1">Available</SelectItem>
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
