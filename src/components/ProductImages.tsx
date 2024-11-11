"use client";
import { Console } from "console";
import Image from "next/image";
import React from "react";
import { useState } from "react";



const ProductImages = ({items}:{items:any}) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-[500px]">
        <Image
          src={items[index].image?.url}
          alt="Product Image"
          className="object-cover rounded-md"
          fill
        />
      </div>
      <div className="flex gap-4">
        {items.map((item:any,i:number) => (
          <div
            key={item._id}
            className="relative w-1/4 h-32 cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image.url}
              alt="Product Image"
              className="object-cover rounded-md"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

