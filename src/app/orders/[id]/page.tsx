import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import Link from "next/link";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const wixClient = wixClientServer();
  let order;
  try {
    order = await wixClient.orders.getOrder(id);
  } catch (error) {
    console.error("Error fetching order:", error);
    return notFound();
  }
  console.log("Order", order);

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] items-center justify-center ">
      <h1 className="text-xl"> Order Details</h1>

      <div className="mt-12 flex flex-col gap-6">
        <div>
          <span className="font-medium">Order Id:</span>
          <span>{order._id}</span>
        </div>

        <div>
          <span className="font-medium">Receiver Name:</span>
          <span>
            {order.billingInfo?.contactDetails?.firstName + " "}
            {order.billingInfo?.contactDetails?.lastName}
          </span>
        </div>

        <div>
          <span className="font-medium">Receiver Email:</span>
          <span>{order.buyerInfo?.email}</span>
        </div>

        <div>
          <span className="font-medium">Price:</span>
          <span>{order.priceSummary?.subtotal?.amount}</span>
        </div>

        <div>
          <span className="font-medium">Payment Stauts:</span>
          <span>{order.paymentStatus}</span>
        </div>

        <div>
          <span className="font-medium">Order Status:</span>
          <span>{order.status}</span>
        </div>

        <div>
          <span className="font-medium">Delivery Address:</span>
          <span>
            {order.billingInfo?.address?.addressLine1 + " "}
            {order.billingInfo?.address?.city}
          </span>
        </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
