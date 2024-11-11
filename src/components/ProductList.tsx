import Image from "next/image";
import Link from "next/link";
import React from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import { products } from "@wix/stores";
import ProductCard from "./ProductCard";


// Constants
const PRODUCT_PER_PAGE = 8;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 999999;

const ProductList = async ({
  categoryID,
  searchParams = {},
}: {
  categoryID: string;
  searchParams?: any;
}) => {
  const wixClient = wixClientServer();

  let productQuery = wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryID)
    // Apply product type filter (physical/digital)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    // Apply price range filters
    .gt("priceData.price", Number(searchParams?.min) || DEFAULT_MIN_PRICE)
    .lt("priceData.price", Number(searchParams?.max) || DEFAULT_MAX_PRICE);

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery = productQuery.ascending(sortBy);
    } else if (sortType === "desc") {
      productQuery = productQuery.descending(sortBy);
    }
  }

  let res = await productQuery.find();

  // Filter products based on search term (if provided)
  const filteredProducts = searchParams?.name
    ? res.items.filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(searchParams.name.trim().toLowerCase())
      )
    : res.items;
  console.log("filteredProducts", filteredProducts);

  // Get total count for pagination
  const totalCountQuery = filteredProducts.length;

  // Calculate current page and apply pagination
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 0;
  const start = currentPage * PRODUCT_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + PRODUCT_PER_PAGE
  );

  // Calculate pagination details
  const totalPages = Math.ceil(totalCountQuery / PRODUCT_PER_PAGE);
  const hasNext = currentPage < totalPages - 1;
  const hasPrev = currentPage > 0;

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {paginatedProducts.map((product: products.Product) => (
       <ProductCard key={product._id} product={product} />
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={currentPage || 0}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
