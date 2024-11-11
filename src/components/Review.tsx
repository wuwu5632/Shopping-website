import Image from "next/image";
import React from "react";
import EnlargeableImage from "./EnlargeableImage";

const Review = async ({ productId }: { productId: string }) => {
  const response = await fetch(
    `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FEAR_ID}`
  );
  const reviews = await response.json();
//   console.log("reviews", reviews);
//   console.log("reviewsCustomer", reviews.data[0].customer);
//   console.log("reviewsImage", reviews.data[0].media);

  return (
    <div className="flex flex-col gap-5">
      {reviews.data.map((review: any) => (
        <div key={review.id} className="flex flex-col gap-4">
          {/* user */}
          <div className="flex items-center gap-2 ">
            <Image
              src={review.customer.avatar_url}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{review.customer.display_name}</span>
          </div>

          {/* STARS*/}
          <div className="flex gap-2">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Image
                key={i}
                src="/star.png"
                alt="star"
                width={16}
                height={16}
              />
            ))}
          </div>

          {/* DESC */}
          <p>{review.heading}</p>
          {/* <p>{review.body}</p> */}
          <div>
            {review.media.map((media: any) => (
              <EnlargeableImage
                key={media.id}
                src={media.url}
                alt="customer review image"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
