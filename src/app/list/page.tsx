import React from "react";
import Image from "next/image";
import ProductList from "@/components/ProductList";
import Filter from "@/components/Filter";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  console.log("searchParams", searchParams);
  const wixClient = wixClientServer();
  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  console.log("catOfListPage", cat);

  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* CAMPAIGN */}
      <div className="hidden sm:flex justify-between bg-pink-50 h-64 px-4">
        <div className="w-2/3 flex flex-col justify-center items-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            {" "}
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="bg-lama text-white text-sm px-5 py-3 rounded-3xl mt-4 w-max">
            Shop Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt="product"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">
        {cat.collection?.name} For you
      </h1>
      <Suspense fallback={"loading"}>
        <ProductList
          categoryID={
            cat.collection?._id || '00000000-000000-000000-000000000001'
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
