"use client";
import React from "react";
import Image from "next/image";
import { galleryImages } from "@/data/site";

export default function ThreeImageWithContent() {
  return (
    <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 md:px-0">
      {/* Subheading */}
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Our Gallery
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      {/* Main Heading */}
      <h2 className="md:text-4xl text-2xl font-serif text-left md:text-center font-bold text-gray-900 mb-4 md:mb-6">
        Moments at The Tribhuvan Residency
      </h2>

      {/* Description Paragraph */}
      <p className="text-left md:text-center max-w-3xl mx-auto text-gray-600 mb-8 md:mb-12">
        Step inside our serene guest house — warm, spotless rooms, a welcoming
        lounge and thoughtful comforts, all just a short walk from Shree Ram
        Janmabhoomi. A peaceful home for your Ayodhya yatra.
      </p>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6 md:h-[600px]">
        {/* Large featured image */}
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-full rounded-lg overflow-hidden text-white group">
          <Image
            src={galleryImages[0].src}
            alt={galleryImages[0].caption}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 p-5 sm:p-6 w-full">
            <h3 className="text-xl sm:text-2xl font-serif">{galleryImages[0].caption}</h3>
          </div>
        </div>

        {/* Two stacked images */}
        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-5 md:gap-6 md:h-full">
          {[galleryImages[1], galleryImages[2]].map((item, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden text-white group h-[180px] sm:h-[240px] md:h-auto"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-4 sm:p-5 md:p-6 w-full">
                <h3 className="text-base sm:text-xl md:text-2xl font-serif">{item.caption}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary row of three images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-6 mt-5 md:mt-6 h-auto sm:h-[260px]">
        {[galleryImages[3], galleryImages[4], galleryImages[5]].map(
          (item, i) => (
            <div
              key={i}
              className={`relative rounded-lg overflow-hidden text-white group h-[160px] sm:h-full ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-4 w-full">
                <h3 className="text-lg font-serif">{item.caption}</h3>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
