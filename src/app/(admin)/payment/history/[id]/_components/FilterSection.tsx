"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterSection = () => {
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState<any>()
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
          <Button size={"sm"} onClick={() => setPayment(true)}>
            <span>Payment</span>
            <SendHorizonal className="size-4 ml-2" />
          </Button>
        </div>

      </div>

     
    </>
  );
};

export default FilterSection;
