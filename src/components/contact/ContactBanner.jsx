"use client";

import Image from "next/image";
import image from "../../../public/images/tribhuvan/hotel-1.jpg";

export default function ContactBanner() {
  return (
    <section className="relative w-full h-[260px] sm:h-[320px] md:h-[400px]">
      <Image
        src={image}
        alt="The welcoming guest lounge at The Tribhuvan Residency, Ayodhya"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/75"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="mb-2 text-2xl sm:text-3xl md:text-5xl font-serif font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Contact Us
        </h1>
        <div className="w-16 sm:w-20 border-t-2 border-secondary my-2"></div>
      </div>
    </section>
  );
}
