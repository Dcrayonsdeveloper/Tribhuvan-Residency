"use client";
import React from "react";
import Image from "next/image";
import { galleryImages } from "@/data/site";

export default function ThreeImageWithContent() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 md:px-0">
      {/* Subheading */}
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Our Gallery
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      {/* Main Heading */}
      <h2 className="md:text-4xl text-2xl font-serif text-left md:text-center font-bold text-gray-900 mb-6">
        Moments at The Tribhuvan Residency
      </h2>

      {/* Description Paragraph */}
      <p className="text-left md:text-center max-w-3xl mx-auto text-gray-600 mb-12">
        Step inside our serene guest house — warm, spotless rooms, a welcoming
        lounge and thoughtful comforts, all just a short walk from Shree Ram
        Janmabhoomi. A peaceful home for your Ayodhya yatra.
      </p>

      <div className="grid md:grid-cols-2 gap-6 h-[600px]">
        {/* Large featured image */}
        <div className="relative w-full h-full rounded-lg overflow-hidden text-white group">
          <Image
            src={galleryImages[0].src}
            alt={galleryImages[0].caption}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 p-6 w-full">
            <h3 className="text-2xl font-serif">{galleryImages[0].caption}</h3>
          </div>
        </div>

        {/* Two stacked images */}
        <div className="grid grid-rows-2 gap-6 h-full">
          {[galleryImages[1], galleryImages[2]].map((item, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden text-white group"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6 w-full">
                <h3 className="text-2xl font-serif">{item.caption}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary row of three images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 h-auto sm:h-[260px]">
        {[galleryImages[3], galleryImages[4], galleryImages[5]].map(
          (item, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden text-white group h-[220px] sm:h-full"
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
