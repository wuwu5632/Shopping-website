import { orders } from "@wix/ecom";
import { members } from "@wix/members";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";




export const wixClientServer= () => {
    let refreshToken;
    try {
        const cookieStore= cookies();
        // console.log(cookieStore)
        refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
    }
    catch (error) {
    }
    const wixClient= createClient({
  modules: {
    products,
    collections,
    orders,
    members

  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken,
      accessToken: {
        value: "",
        expiresAt: 0,
      },
    },
  }),
});

return wixClient;
}
