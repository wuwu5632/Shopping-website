"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPgeUrl = (pageNumber:number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex justify-between w-full">
      <button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled: cursor-not-allowed: disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={()=>createPgeUrl(currentPage-1)} 
      >
        previous
      </button>
      <button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled: cursor-not-allowed: disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={()=>createPgeUrl(currentPage+1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
