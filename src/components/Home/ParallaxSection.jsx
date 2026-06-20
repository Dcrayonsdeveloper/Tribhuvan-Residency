"use client";
import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { site, whatsappLink } from "@/data/site";

const PARALLAX_MSG =
  "Hello! I'd like to book my divine stay at The Tribhuvan Residency, near Shree Ram Mandir, Ayodhya.";

export default function ParallaxSection() {
  return (
    <section className="relative h-[500px] overflow-hidden my-16">
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
        <p className="text-secondary font-medium tracking-[0.25em] uppercase text-sm mb-4 flex items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Book Direct
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>
        <h2 className="font-serif text-white text-3xl md:text-5xl font-bold mb-5 max-w-3xl drop-shadow-lg">
          Your Divine Stay Awaits in Ayodhya
        </h2>
        <p className="text-white/85 max-w-xl mb-8 md:text-lg">
          Reserve your room just a short walk from the Ram Mandir and wake up to
          early-morning aarti. We will take care of the rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <a href={whatsappLink(PARALLAX_MSG)} target="_blank" rel="noopener noreferrer">
            <button className="btn-gold">
              <span className="flex items-center gap-2">
                <FaWhatsapp /> Book Now
              </span>
            </button>
          </a>
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-white text-lg font-semibold hover:text-secondary transition-colors"
          >
            <FaPhoneAlt className="text-secondary" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
