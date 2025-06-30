"use client";

import Image from "next/image";
import image from "../../../public/images/rooms/banner.png";

export default function FaqBanner() {
  return (
    <section className="relative w-full h-[400px]">
      <Image
        src={image}
        alt="Room Banner"
        fill
        className="object-cover"
        priority
      />
      
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <div className="mb-2 text-3xl md:text-5xl font-bold">FAQs</div>
        <div className="w-20 border-t-2 border-gold-500 my-2"></div>
        <p className="text-sm md:text-base">
          <span className="opacity-80">HOME</span> / <span className="font-semibold">ROOMS</span>
        </p>
      </div>
    </section>
  );
}
