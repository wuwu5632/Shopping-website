import React from "react";
import Image from "next/image";
import { useWixClient } from "@/hooks/useWixClient";
import { useEffect } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { checkout, currentCart } from "@wix/ecom";

const CartModal = () => {
  // const cartItems = true;
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();
  console.log("testingCart");
  console.log("cartInfo", cart);

  const handleCheckout = async () => {
    try {
      const Checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });
      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: Checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });
      console.log("redirectSessionURL", redirectSession?.fullUrl);

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="absolute p-4 rounded-md top-12 right-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex flex-col gap-6 z-20 w-max">
      {!cart.lineItems ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* // LIST */}
          <div className=" flex flex-col gap-8">
            {cart.lineItems?.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt="product"
                    width={72}
                    height={96}
                    className="rounded-md object-cover"
                  />
                )}

                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex justify-between gap-5 items-center">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex gap-1 items-center">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        {item.price?.amount}
                      </div>
                    </div>
                    {/* desc */}
                    <div className="flex  flextext-sm text-gray-500">
                      {" "}
                      {item.availability?.status}
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm text-gray-500">
                    {/* PRICE */}
                    <span className="text-gray-500">Qty:{item.quantity}</span>
                    {/* QTY */}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => removeItem(wixClient, item._id!)}
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div>
            <div className="flex justify-between font-semibold text-xl items-center">
              <span>Subtotal</span>
              <span>${cart.subtotal.amount}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2 mb-5">
              Lorem ipsum dolor sit amet,lorem ipsum dolor sit amet 123
            </p>
            <div className="flex justify-between text-sm">
              <button className="px-4 py-2 rounded-md ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
