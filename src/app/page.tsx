import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import CategoryList from "@/components/CategoryList";
import { useEffect, useContext } from "react";
import { WixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

const HomePage = () => {
  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryID={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categorires
        </h1>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <ProductList
          categoryID={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
          limit={10}
        />
      </div>
    </div>
  );
};

export default HomePage;