import { wixClientType } from "@/context/wixContext";
import { currentCart } from "@wix/ecom";
import { create } from "zustand";


type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: wixClientType) => void;
  addItem: (
    wixClient: wixClientType,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: wixClientType, itemId: string) => void;
};


export const useCartStore = create<CartState>((set) => (
  {
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      console.log("Attempting to fetch the cart...");
      const cart = await wixClient.currentCart.getCurrentCart();
      console.log("Fetched cart:", cart);
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      console.error("Error fetching cart:", err);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((prev) => ({ ...prev, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });
    set({
      cart: response.cart,
      isLoading: false,
      counter: response.cart?.lineItems.length,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((prev) => ({ ...prev, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );
    set({
      cart: response.cart,
      isLoading: false,
      counter: response.cart?.lineItems.length,
    });
  },
}));
