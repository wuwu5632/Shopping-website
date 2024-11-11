import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { products } from "@wix/stores";

interface ProductCardProps {
  product: products.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/${product.slug}`}
      className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
    >
      <div className="relative h-80 w-full">
        <Image
          src={product.media?.mainMedia?.image?.url || "/product.png"}
          alt="product"
          fill
          sizes="25vw"
          className="object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
        />
        {product.media?.items && (
          <Image
            src={product.media?.items[1]?.image?.url || "/product.png"}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between">
        <span className="font-medium">{product.name}</span>
        <span className="font-semibold">${product.priceData?.price}</span>
      </div>

      {product.additionalInfoSections && (
        <div
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              product.additionalInfoSections.find(
                (section) => section.title === "shortDesc"
              )?.description || ""
            ),
          }}
        ></div>
      )}
      <button className="text-lama ring-1 ring-lama rounded-2xl py-2 px-4 text-xs hover:text-white hover:bg-lama w-max">
        Add to cart
      </button>
    </Link>
  );
};

export default ProductCard;
