"use client";
import React from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { site } from "@/data/site";

export default function ParallaxSection() {
  return (
    <section className="relative h-[420px] md:h-[500px] overflow-hidden my-12 md:my-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(/images/tribhuvan/super-deluxe-room.jpeg)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered CTA Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <p className="text-secondary font-medium tracking-[0.25em] uppercase text-xs sm:text-sm mb-3 md:mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Book Direct
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>
        <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-5 max-w-3xl drop-shadow-lg leading-tight">
          Your Divine Stay Awaits in Ayodhya
        </h2>
        <p className="text-white/85 max-w-xl mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
          Reserve your room just a short walk from the Ram Mandir and wake up to
          early-morning aarti. We will take care of the rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full max-w-sm sm:max-w-none">
          <Link href="/rooms" className="w-full sm:w-auto">
            <button className="btn-gold w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Book Now
              </span>
            </button>
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-white text-base sm:text-lg font-semibold hover:text-secondary transition-colors"
          >
            <FaPhoneAlt className="text-secondary" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
