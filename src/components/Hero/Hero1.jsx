"use client";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaCalendarAlt, FaUser, FaStar, FaWhatsapp } from "react-icons/fa";
import { site, whatsappLink } from "@/data/site";

const STAY_MSG =
  "Hello! I'd like to book my stay at The Tribhuvan Residency, Ayodhya. Please share availability and tariff.";

const slides = [
  {
    id: 1,
    image: "/images/tribhuvan/hero.jpg",
    text: "A peaceful, divine retreat just a short walk from Shree Ram Janmabhoomi.",
  },
  {
    id: 2,
    image: "/images/tribhuvan/super-deluxe-room.jpeg",
    text: "Spacious, serene rooms designed for a restful pilgrimage.",
  },
  {
    id: 3,
    image: "/images/tribhuvan/hotel-2.jpg",
    text: "Spotless air-conditioned comfort, just steps from the temple.",
  },
];

const Hero1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(1);

  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);

  const handleCheckAvailability = () => {
    const fmt = (d) => {
      try {
        return format(d, "dd MMM yyyy");
      } catch {
        return "—";
      }
    };
    const guests =
      `${adultCount} Adult${adultCount > 1 ? "s" : ""}` +
      (childCount > 0
        ? `, ${childCount} Child${childCount > 1 ? "ren" : ""}`
        : "");
    const msg =
      `Hello! I'd like to check room availability at The Tribhuvan Residency.\n` +
      `Check-in: ${fmt(checkInDate)}\n` +
      `Check-out: ${fmt(checkOutDate)}\n` +
      `Guests: ${guests}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    autoSlideRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  return (
    <section className="relative">
      <section className="flex items-end justify-center overflow-x-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 w-full h-[80vh] md:h-[80vh] min-h-[520px]"
            >
              <img
                src={slide.image}
                alt={`${site.name} — ${slide.text}`}
                className="w-full h-full object-cover"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

              {/* Centered hero text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-32 md:pb-0">
                <p className="text-secondary font-medium tracking-[0.25em] uppercase text-xs sm:text-sm md:text-base mb-3 flex items-center gap-2">
                  <span className="w-5 h-px bg-secondary inline-block"></span>
                  Welcome to
                  <span className="w-5 h-px bg-secondary inline-block"></span>
                </p>
                <h1 className="font-serif text-white text-2xl sm:text-3xl md:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg leading-tight">
                  {site.name}
                </h1>
                <p className="text-white/90 font-serif text-base sm:text-lg md:text-2xl mb-3 md:mb-4 max-w-2xl">
                  {site.tagline}
                </p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl mb-5 md:mb-7 px-2">
                  {slide.text}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none">
                  <a
                    href={whatsappLink(STAY_MSG)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <button className="btn-primary w-full sm:w-auto">
                      <span className="flex items-center justify-center gap-2">
                        <FaWhatsapp /> Book Your Stay
                      </span>
                    </button>
                  </a>
                  <div className="flex items-center justify-center gap-2 text-white text-xs sm:text-sm md:text-base whitespace-nowrap">
                    <FaStar className="text-secondary" />
                    <span className="font-semibold">{site.rating}</span>
                    <span className="text-white/70">·</span>
                    <span>{site.ratingText}</span>
                    <span className="text-white/70">·</span>
                    <span className="text-white/80">
                      {site.ratingsCount} ratings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative -mt-24 md:mt-0 md:bottom-12 px-4 mx-auto md:flex justify-center z-20">
        <div className="inline-block w-full md:w-auto">
          <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 md:flex md:flex-row md:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 w-full max-w-6xl">
            {/* Check In */}
            <div className="flex flex-col md:px-2 min-w-0">
              <span className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Check In</span>
              <div className="flex items-center gap-2 text-gray-600 min-w-0">
                <FaCalendarAlt className="shrink-0" />
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="dd MMM yyyy"
                  className="outline-none w-full min-w-0 bg-transparent cursor-pointer text-sm md:text-base"
                  placeholderText="Select date"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex flex-col md:px-2 min-w-0">
              <span className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                Check Out
              </span>
              <div className="flex items-center gap-2 text-gray-600 min-w-0">
                <FaCalendarAlt className="shrink-0" />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dateFormat="dd MMM yyyy"
                  className="outline-none w-full min-w-0 bg-transparent cursor-pointer text-sm md:text-base"
                  placeholderText="Select date"
                />
              </div>
            </div>

            {/* Adult */}
            <div className="flex flex-col md:px-2 min-w-0">
              <span className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Adult</span>
              <div className="flex items-center gap-2 text-gray-600 min-w-0">
                <FaUser className="shrink-0" />
                <select
                  value={adultCount}
                  onChange={(e) => setAdultCount(parseInt(e.target.value))}
                  className="border-none bg-transparent text-gray-600 cursor-pointer focus:outline-none text-sm md:text-base w-full min-w-0"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Child */}
            <div className="flex flex-col md:px-2 min-w-0">
              <span className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Child</span>
              <div className="flex items-center gap-2 text-gray-600 min-w-0">
                <FaUser className="shrink-0" />
                <select
                  value={childCount}
                  onChange={(e) => setChildCount(parseInt(e.target.value))}
                  className="border-none bg-transparent text-gray-600 cursor-pointer focus:outline-none text-sm md:text-base w-full min-w-0"
                >
                  {Array.from({ length: 20 }, (_, i) => i).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Button */}
            <div className="col-span-2 md:col-span-1 w-full md:w-auto md:px-2 pt-2 md:pt-0">
              <button
                onClick={handleCheckAvailability}
                className="btn-primary w-full md:w-auto text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaWhatsapp /> Check Availability
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero1;
