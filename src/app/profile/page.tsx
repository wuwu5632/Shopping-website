import UpdateButton from "@/components/UpdateButton";
import updateUser from "@/lib/action";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import Link from "next/link";
import { format } from "timeago.js";

const ProfilePage = async () => {
  const wixClient = wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });
  console.log("UserFieldsets", user);

  if (!user.member?.contactId) {
    return <div>Not Logged In!</div>;
  }

  const OrderRes = await wixClient.orders.searchOrders({
    search: {
      filter: { "buyerInfo.contactId": { $eq: user.member.contactId } },
    },
  });

  console.log("Orders", OrderRes);

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-16">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl sticky top-0 bg-white z-10">Profile</h1>
        <form action={updateUser} className="mt-8 flex flex-col gap-4">
          <input hidden type="text" name="id" value={user.member.contactId} />

          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            placeholder={user.member?.profile?.nickname || "john"}
          />

          <label className="text-sm text-gray-700">Firstname</label>
          <input
            type="text"
            name="firstName"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            placeholder={user.member?.contact?.firstName || "john"}
          />

          <label className="text-sm text-gray-700">Surname</label>
          <input
            type="text"
            name="surName"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            placeholder={user.member?.contact?.lastName || "Doe"}
          />

          <label className="text-sm text-gray-700">Surname</label>
          <input
            type="text"
            name="phone"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            placeholder={user.member?.contact?.phones?.[0] || "1234567890"}
          />


          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            placeholder={user.member?.loginEmail || "john@email.com"}
          />
          <UpdateButton />
        </form>
      </div>

      <div className="w-full md:w-1/2 md:h-full md:overflow-auto">
        <h1 className="text-2xl sticky top-0 bg-white z-10">Orders</h1>
        <div className="mt-12 flex flex-col">
          {OrderRes.orders.map((order) => (
            <Link
              href={`/orders/${order._id}`}
              key={order._id}
              className="flex hover:bg-green-50 odd:bg-slate-100 rounded-md px-2 py-6"
            >
              <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
              <span className="w-1/4">
                ${order.priceSummary?.subtotal?.amount}
              </span>
              <span className="w-1/4">
                {order._createdDate ? format(order._createdDate) : "N/A"}
              </span>
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
