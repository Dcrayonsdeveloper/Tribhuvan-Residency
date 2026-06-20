"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { galleryImages } from "@/data/site";

const RoomsGallery = ({ room }) => {
  const [activeSrc, setActiveSrc] = useState(null);

  useEffect(() => {
    if (activeSrc) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [activeSrc]);

  if (!room) return null;

  const fallback = galleryImages.map((g) => g.src);
  const images =
    room.gallery && room.gallery.length ? room.gallery : fallback;

  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 py-16 text-center">
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Gallery
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      <h2 className="md:text-4xl text-2xl font-serif text-left md:text-center font-bold text-gray-900 mb-12">
        A Look Inside the {room.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setActiveSrc(src)}
            className="overflow-hidden rounded-md cursor-pointer focus:outline-none"
            aria-label={`Enlarge image ${index + 1}`}
          >
            <Image
              src={src}
              alt={`${room.name} — view ${index + 1}`}
              width={500}
              height={400}
              className="rounded-lg object-cover hover:scale-105 transition-transform duration-300 w-full h-64"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeSrc && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setActiveSrc(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveSrc(null)}
              className="absolute top-2 right-2 z-10 cursor-pointer text-white bg-black/50 rounded-full p-2"
              aria-label="Close image"
            >
              <FaTimes />
            </button>
            <Image
              src={activeSrc}
              alt={`${room.name} enlarged view`}
              width={1000}
              height={650}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomsGallery;
