import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = async () => {
  const wixClient = wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();
  console.log("catsOfCategoryList", cats);

  return (
    <div className="px-4 w-screen flex gap-4 md:gap-8 overflow-x-scroll scrollbar-hide">
      {cats.items.map((item) => (
        <Link
          key={item._id}
          href={`/list?cat=${item.slug}`}
          className="w-full flex flex-col sm:w-1/2 lg:w-1/4 xl:w-1/6 flex-shrink-0"
        >
          <div className="relative bg-slate-100 h-96 w-full">
            <Image
              src={item.media?.mainMedia?.image?.url || "/cat.png"}
              alt="product"
              fill
              className="object-cover rounded-md z-10"
            />
          </div>
          <h1 className="mt-8 font-light text-cl tracking-wide">{item.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
