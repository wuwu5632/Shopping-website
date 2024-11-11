"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = React.useState(0);

//   useEffect(() => {
//    const interval = setInterval(() => {
//         setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//         }, 3000);
  
//     return () => {
//         clearInterval(interval);
//     }
//   }, [])
  
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="h-full w-max flex "
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`h-full w-screen flex flex-col xl:flex-row gap-16 ${slide.bg}`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col justify-center items-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4">
                  SHOP NOW
                </button>
              </Link>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="flex-1 relative">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover"
                style={{ objectPosition: "center top" }}
                sizes="100%"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-8 flex gap-4 ">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            } `}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
