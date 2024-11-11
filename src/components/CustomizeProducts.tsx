"use client";
import { products } from "@wix/stores";
import React, { useState } from "react";
import Add from "@/components/Add";
import { useEffect } from "react";

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  console.log("variants", variants);
  console.log("variantsChoices", variants[0].choices);
  console.log("productOptions", productOptions);
  // console.log("productOptionsChoices", productOptions[0].choices);

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);


  const handleOptionSelect = (optionType: string, choice: string) =>
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  

  const isVariantInStock = (choices: { [key: string]: string }) =>
    variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium ">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {

              const isDisabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });

              const selections = {
                ...selectedOptions,
                [option.name!]: choice.description!,
              };
              console.log("selections", selections);
              console.log(`isDisabled${choice.description}`, isDisabled);

              const clickhandler = () =>
                isDisabled
                  ? undefined
                  : handleOptionSelect(option.name!, choice.description!);

              const isSelected =
                selectedOptions[option.name!] === choice.description!;
              console.log("isSelected", isSelected);

              return option.name === "Color" ? (
                <li
                  key={choice.description}
                  className="w-8 h-8 bg-red-500 rounded-full ring-1 ring-gray-300 relative cursor-pointer"
                  onClick={clickhandler}
                  style={{
                    backgroundColor: choice.value,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  {isSelected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {isDisabled && (
                    <div className="absolute w-8 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </li>
              ) : (
                <li
                  className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                  style={{
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    backgroundColor: isSelected
                      ? "#f35c7a"
                      : isDisabled
                      ? "#FBCFE8"
                      : "white",
                    color: isSelected || isDisabled ? "white" : "#f35c7a",
                    boxShadow: isDisabled ? "none" : "",
                  }}
                  key={choice.description}
                  onClick={clickhandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
};

export default CustomizeProducts;
