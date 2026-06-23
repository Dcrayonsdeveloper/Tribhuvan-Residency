import React from "react";
import Image from "next/image";
import image from "../../../public/images/tribhuvan/hotel-2.jpg";
import { site } from "@/data/site";

const stats = [
  { value: "5 min", label: "Walk to Ram Mandir" },
  { value: `${site.ratingsCount}+`, label: "Happy Guests" },
  { value: `${site.rating}★`, label: site.ratingText },
];

const ImageWithContent = () => {
  return (
    <section className="max-w-7xl mx-auto mb-14 px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        <div className="bg-cream lg:min-h-[640px] rounded-lg overflow-hidden flex flex-col justify-center py-10 lg:py-16">
          <div className="px-6 lg:px-12">
            <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
              <span className="w-5 h-px bg-secondary inline-block"></span>
              Our Story
              <span className="w-5 h-px bg-secondary inline-block"></span>
            </p>
            <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-6 md:mb-8">
              Welcome to {site.name}
            </h2>

            <div className="space-y-5">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {site.description}
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                More than just a place to rest, we are your peaceful base for a
                soulful Ayodhya yatra. With the Shree Ram Janmabhoomi Mandir and
                Hanuman Garhi just a short walk away, our guests step out for the
                early-morning aarti and return to a calm, spotless room to unwind.
                Every detail — from our courteous caretakers to in-room dining and
                secure parking — is arranged so that nothing comes between you and
                your darshan.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 md:pt-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-left border-l-2 border-secondary pl-3 sm:pl-4"
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative lg:min-h-[640px] rounded-lg overflow-hidden shadow-md">
          <Image
            src={image}
            alt="A clean, air-conditioned deluxe bedroom at The Tribhuvan Residency"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ImageWithContent;
