"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center border-b pb-5 mb-5">
      <h1 className="text-4xl text-primary ">Nana Motors</h1>
      <Button
        className="print:hidden"
        onClick={() => {
          window.print();
        }}
      >
        Print
      </Button>
    </div>
  );
}

export default Header;
