"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = () => {
  const pathname = usePathname();
 
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      {/* LEFT */}
      <div className="flex gap-4 flex-wrap">
        <select
          className="px-4 py-2 rounded-2xl bg-[#EBEDED] text-xs font-medium"
          name="type"
          onChange={handleFilterChange}
        >
          <option value="">Type</option>
          <option value="psyical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl ring-1 ring-gray-400 pl-2 w-24"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl ring-1 ring-gray-400 pl-2 w-24"
          onChange={handleFilterChange}
        />

        <select
          className="px-4 py-2 rounded-2xl bg-[#EBEDED] text-xs font-medium"
          name="cat"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          <option value="newArrival">New Arrival</option>
          <option value="popular">Popular</option>
        </select>

        <select className="px-4 py-2 rounded-2xl bg-[#EBEDED] text-xs font-medium">
          <option>All Filters</option>
        </select>
      </div>
      {/* RIGHT */}
      <div>
        <select
          className="px-4 py-2 rounded-2xl bg-white text-xs font-medium ring-1 ring-gray-400"
          name="sort"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
