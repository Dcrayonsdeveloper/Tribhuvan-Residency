"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  FaCamera,
  FaUsers,
  FaBed,
  FaExpandArrowsAlt,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import Link from "next/link";
import { rooms } from "@/data/site";

const RoomCard = () => {
  const router = useRouter();
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const passThrough = {};
  ["checkIn", "checkOut", "adults", "children"].forEach((k) => {
    if (typeof router.query[k] === "string") passThrough[k] = router.query[k];
  });
  const detailHref = (slug) => ({
    pathname: `/rooms/${slug}`,
    query: passThrough,
  });

  useEffect(() => {
    if (showGalleryModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showGalleryModal]);

  const openGalleryModal = (images) => {
    setCurrentImages(images && images.length ? images : []);
    setCurrentIndex(0);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    setCurrentImages([]);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto md:my-20 my-10 px-4 md:px-6 space-y-10">
      {rooms.map((room) => (
        <div
          key={room.slug}
          className="bg-white md:h-80 rounded-lg overflow-hidden shadow-sm md:shadow-md flex flex-col md:flex-row border border-gray-100"
        >
          <div className="relative md:w-1/2 w-full h-56 sm:h-64 md:h-auto">
            <Link href={detailHref(room.slug)}>
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
              />
            </Link>
            {room.featured && (
              <span className="absolute top-4 left-4 bg-secondary text-espresso text-xs font-semibold px-3 py-1 rounded shadow">
                Featured
              </span>
            )}
            <button
              onClick={() => openGalleryModal(room.gallery)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow text-secondary text-lg cursor-pointer hover:bg-secondary hover:text-white transition-colors"
              aria-label={`View gallery for ${room.name}`}
            >
              <FaCamera />
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between gap-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
                <Link href={detailHref(room.slug)}>
                  <h2 className="md:text-2xl text-lg sm:text-xl font-serif font-semibold text-gray-900 hover:text-secondary transition-colors">
                    {room.name}
                  </h2>
                </Link>
              </div>

              <p className="text-lg sm:text-xl font-bold text-secondary mt-2">
                {room.priceLabel}{" "}
                <span className="text-sm font-normal text-gray-500">
                  / Night
                </span>
              </p>
              <p className="text-gray-600 mt-2 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                {room.short}
              </p>
            </div>

            <div className="bg-cream rounded-lg grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <FaUsers className="text-secondary text-lg sm:text-xl shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm md:text-md font-semibold leading-tight truncate">{room.guests} Guests</p>
                  <p className="text-xs text-gray-500">Occupancy</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <FaExpandArrowsAlt className="text-secondary text-lg sm:text-xl shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm md:text-md font-semibold leading-tight truncate">{room.size}</p>
                  <p className="text-xs text-gray-500">Room Size</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <FaBed className="text-secondary text-lg sm:text-xl shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm md:text-md font-semibold leading-tight truncate">{room.bed}</p>
                  <p className="text-xs text-gray-500">Bedding</p>
                </div>
              </div>
            </div>

            <div>
              <Link href={detailHref(room.slug)}>
                <button className="btn-primary w-full sm:w-auto">
                  <span>View Details</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Gallery Modal */}
      {showGalleryModal && currentImages.length > 0 && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-lg overflow-hidden max-w-2xl w-full">
            <button
              onClick={closeGalleryModal}
              className="absolute top-2 right-2 z-10 cursor-pointer text-white bg-black/50 rounded-full p-2"
              aria-label="Close gallery"
            >
              <FaTimes />
            </button>
            <Image
              src={currentImages[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              width={800}
              height={500}
              className="w-full max-h-[70vh] object-cover"
            />
            {currentImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full cursor-pointer"
                  aria-label="Previous image"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full cursor-pointer"
                  aria-label="Next image"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
