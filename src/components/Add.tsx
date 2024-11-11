"use client";
import React from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
 
  const [quantity, setQuantity] = React.useState(1);
  const increment = () =>
    setQuantity((prev) => (prev < stockNumber ? prev + 1 : prev));
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const wixClient = useWixClient();
 const { addItem,isLoading} = useCartStore();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-between gap-3 bg-gray-100 px-4 py-2 rounded-3xl w-32">
            <button className="cursor-poiner text-xl " onClick={decrement}>
              -
            </button>
            <input
              type="text"
              className="w-12 h-8 text-center bg-gray-100 focus:outline-none"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button className="cursor-poiner text-xl" onClick={increment}>
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <p className="text-red-500">Out of stock</p>
          ) : (
            <div className="text-xs">
              Only{" "}
              <span className="text-orange-500">{stockNumber} items left</span>!
              <br /> Don't miss it
            </div>
          )}
        </div>
        <button
          className="w-36 text-sm ring-1 ring-lama rounded-xl px-4 py-2 text-lama hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          onClick={()=>addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Add;
