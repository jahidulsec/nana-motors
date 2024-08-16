"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

function PagePagination({ limit, count }: { limit: number; count: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  return (
    <Pagination>
      <PaginationContent>
        {!searchParams.has("p") ||
          (searchParams.get("p") !== "1" && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  let value = Number(searchParams.get("p")) || 1;
                  value -= 1;
                  params.set("p", value.toString());
                  params.toString();
                  router.push(pathname + "?" + params.toString());
                }}
              />
            </PaginationItem>
          ))}

      

        {Math.ceil(count / limit) > Number(searchParams.get("p") || 1) && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                let value = Number(searchParams.get("p")) || 1;
                value += 1;
                params.set("p", value.toString());
                params.toString();
                router.push(pathname + "?" + params.toString());
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PagePagination;
