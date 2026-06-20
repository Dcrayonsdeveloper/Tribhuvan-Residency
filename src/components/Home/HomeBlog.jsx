"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaPlaceOfWorship,
  FaWater,
  FaTrain,
  FaPlaneDeparture,
} from "react-icons/fa";
import { attractions } from "@/data/site";

// Pick an icon based on the attraction type.
const iconForType = (type) => {
  switch (type) {
    case "temple":
      return FaPlaceOfWorship;
    case "ghat":
      return FaWater;
    case "transit":
      return FaTrain;
    case "airport":
      return FaPlaneDeparture;
    default:
      return FaMapMarkerAlt;
  }
};

export default function NewsArticlesSection() {
  return (
    <section className="bg-cream px-4 md:px-20 py-16 text-black mx-auto max-w-7xl">
      <p className="text-secondary font-medium mb-2 flex md:justify-center justify-start items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Around Us
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      <h2 className="md:text-4xl text-2xl md:text-center text-left font-serif font-bold text-gray-900 mb-4">
        Explore Ayodhya
      </h2>

      <p className="text-gray-600 md:text-center text-left max-w-2xl mx-auto mb-12">
        Sacred temples, the holy Saryu ghats and convenient transport — all
        within easy reach of our doorstep.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction, i) => {
          const Icon = iconForType(attraction.type);
          return (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition flex items-start gap-4"
            >
              <div className="bg-cream p-3 rounded-md shrink-0">
                <Icon className="text-2xl text-secondary" />
              </div>
              <div>
                <h3 className="font-serif text-lg leading-snug text-gray-900 mb-1">
                  {attraction.name}
                </h3>
                <p className="text-sm text-secondary font-medium flex items-center gap-1">
                  <FaMapMarkerAlt className="text-xs" />
                  {attraction.distance}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
