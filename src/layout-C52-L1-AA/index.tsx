"use client";
import React, { useEffect, useRef, useState } from "react";
import cardData from "@/src/layout-C52-L1-AA/cardData.json";
import Image from "next/image";

const LayoutC52L1AA = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [shuffle, setShuffle] = useState(cardData);

  const handleFlip = (index: number) => {
    // Flip card and start new timer
    setFlippedIndex(index);
    setTimer(30);

    // Auto flip-back after 5 sec
  };

  useEffect(() => {
    setShuffle((prev) => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex flex-col justify-start items-center p-5 gap-10">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h3 className="text-2xl font-bold text-center text-black">
          Pricing and Discount
        </h3>

        <ul className="list-disc space-y-1 w-[50%] ">
        <li className="text-xl text-black font-medium  my-2">
      Here are some items in the store</li>
      
      
        <li className="text-xl text-black font-medium  my-2">
     Some items are of original price</li>
     
     
     <li className="text-xl text-black font-medium  my-2">
    Others are discounted</li>
    
    
     <li className="text-xl text-black font-medium  my-2">
   Read aloud the price of each item naming the item, its price, and the discount if applicable</li>

        </ul>

        <p className="text-zinc-600 text-lg italic">For example: This apple costs $5 per piece.
This Bookstand is available at 20% discount on its price of 100 $.</p>

      </div>
      <div className="grid grid-cols-12 w-[90%]  place-items-center gap-10">
        {shuffle.map((item, index) => (
          <div
            key={index}
            className={` 
                ${flippedIndex === index ? "pointer-events-none" : ""}
                col-span-4 relative w-full h-[300px] [perspective:1000px] cursor-pointer`}
            onClick={() => handleFlip(index)}
          >
            <div
              className={`transition-transform duration-700 w-full h-full [transform-style:preserve-3d] ${
                flippedIndex === index ? "[transform:rotateY(180deg)] " : ""
              }`}
            >
              {/* Front */}
              <div
                style={{ backgroundImage: `url(${item.img})` }}
                className="absolute w-full border-2 bg-cover bg-center bg-no-repeat border-black h-full text-white rounded-lg flex justify-center items-center [backface-visibility:hidden]"
              ></div>

              {/* Back */}
              <div className="absolute w-full h-full border border-black text-white rounded-lg flex justify-center items-center flex-col gap-5 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h2 className="text-3xl text-black font-bold">{item.name}</h2>
                <span className="text-violet-900 font-bold text-3xl text-center px-3">
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutC52L1AA;
