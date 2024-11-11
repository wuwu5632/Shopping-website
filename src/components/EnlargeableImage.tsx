"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../app/globals.css"; 

const EnlargeableImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleImageClick = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={50}
        className={`object-contain cursor-pointer ${
          isEnlarged ? "enlarged" : ""
        }`}
        onClick={handleImageClick}
      />
    </div>
  );
};

export default EnlargeableImage;
