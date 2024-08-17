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

const FilterSection = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const debounceValue = useDebounce(search);

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (search) {
      params.set("q", debounceValue);
    } else {
      params.delete("q");
    }
    router.push(pathname + "?" + params.toString());
  }, [debounceValue]);

  return (
    <>
      <div className="filters flex justify-between items-center gap-5 my-5">
        <div className="filters flex gap-3 items-center">
          <Input
            placeholder="Search by engine number, name, NID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={searchParams.get("status") || undefined}
            onValueChange={(value) => {
              params.set("status", value);
              params.toString();
              router.push(pathname + "?" + params.toString());
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Sold</SelectItem>
              <SelectItem value="1">Available</SelectItem>
              <SelectItem value="2">In EMI</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
