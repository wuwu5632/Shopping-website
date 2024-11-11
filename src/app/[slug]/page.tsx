import React from "react";
import ProductImages from "@/components/ProductImages";
import CustomizeProducts from "@/components/CustomizeProducts";
import Add from "@/components/Add";
import { wixClientServer } from "@/lib/wixClientServer";
import Review from "@/components/Review";
import parse from "html-react-parser";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  console.log("singlePageParams", params);
  const wixClient = wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return {
      notFound: true,
    };
  }

  const product = products.items[0];
  console.log("SinglePageProducts", products);
  console.log("productOptions", products.items[0]?.productOptions || []);
  console.log("productOptionsChoices", products.items[0]?.productOptions?.[0]?.choices || []);


  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16 relative">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>

      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.priceData?.price === product.priceData?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.priceData?.price}</h2>
        ) : (
          <div className="flex gap-4 items-center">
            <h3 className="text-xl line-through text-gray-500">
              {" "}
              ${product.priceData?.price}
            </h3>
            <h2 className="text-2xl font-medium">
              {" "}
              ${product.priceData?.discountedPrice}
            </h2>
          </div>
        )}

        <div className="h-[2px] bg-gray-100" />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants || []}
            productOptions={product.productOptions || []}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100" />
        {product.additionalInfoSections?.map((section): any => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <div>{parse(section.description || "")}</div> {/* Wrap in div */}
          </div>
        ))}

        <div className="h-[2px] bg-gray-100" />
        <Review productId={product._id!} />
      </div>
    </div>
  );
};

export default SinglePage;
