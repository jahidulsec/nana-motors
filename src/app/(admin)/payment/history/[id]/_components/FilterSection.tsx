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
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Printer, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaymentForm from "./PaymentForm";
import Link from "next/link";

const FilterSection = () => {
  const [payment, setPayment] = useState<any>();
  const params = useParams()

  

  return (
    <>
      <div className="filters flex justify-end items-center gap-5 my-5">
        <div className="buttons flex gap-3">
          <Button
            asChild
            size={"sm"}
            className="text-primary"
            variant={"outline"}
          >
            <Link href={`/print/payment/${params.id}`}>
              <Printer className="size-4 mr-2" />
              <span>Print</span>
            </Link>
          </Button>

          <Button size={"sm"} onClick={() => setPayment(true)}>
            <span>Payment</span>
            <SendHorizonal className="size-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* purchase car modal */}
      <Dialog open={payment} onOpenChange={setPayment}>
        <DialogContent className="w-[75vw]">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
          </DialogHeader>
          <PaymentForm onClose={() => setPayment(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterSection;
