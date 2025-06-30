"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import image1 from "../../../public/images/home/banner.png";
import image2 from "../../../public/images/home/banner.png";
import image3 from "../../../public/images/home/banner.png";

const slides = [
  {
    id: 1,
    image: image1,
    heading: "Slide 1 Heading",
    text: "This is the first slide description.",
  },
  {
    id: 2,
    image: image2,
    heading: "Slide 2 Heading",
    text: "This is the second slide description.",
  },
  {
    id: 3,
    image: image3,
    heading: "Slide 3 Heading",
    text: "This is the third slide description.",
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
      <section className="flex items-end justify-center  overflow-x-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative flex-shrink-0 w-full">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full md:h-[80vh] object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative md:bottom-12 md:px-4 mx-auto md:flex justify-center">
        <div className="inline-block w-full md:w-auto">
          <div className="bg-white rounded-2xl md:shadow-lg flex flex-col md:flex-row md:items-center items-left gap-4 px-6 py-5 w-full max-w-6xl">
            {/* Check In */}
            <div className="flex flex-col md:px-2">
              <span className="font-semibold text-gray-900 mb-1">Check In</span>
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt />
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="dd MMM yyyy"
                  className="outline-none w-auto bg-transparent cursor-pointer"
                  placeholderText="Select date"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex flex-col md:px-2">
              <span className="font-semibold text-gray-900 mb-1">
                Check Out
              </span>
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dateFormat="dd MMM yyyy"
                  className="outline-none w-auto bg-transparent cursor-pointer"
                  placeholderText="Select date"
                />
              </div>
            </div>

            {/* Adult */}
            <div className="flex flex-col md:px-2">
              <span className="font-semibold text-gray-900 mb-1">Adult</span>
              <div className="flex items-center gap-2 text-gray-600">
                <FaUser />
                <select
                  value={adultCount}
                  onChange={(e) => setAdultCount(parseInt(e.target.value))}
                  className="border-none bg-transparent text-gray-600 cursor-pointer focus:outline-none"
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
            <div className="flex flex-col md:px-2">
              <span className="font-semibold text-gray-900 mb-1">Child</span>
              <div className="flex items-center gap-2 text-gray-600">
                <FaUser />
                <select
                  value={childCount}
                  onChange={(e) => setChildCount(parseInt(e.target.value))}
                  className="border-none bg-transparent text-gray-600 cursor-pointer focus:outline-none"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Button */}
            <div className="w-full md:w-auto md:px-2 pt-4 md:pt-0">
              <button className="bg-primary w-full md:w-auto text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#a67d58] transition-all">
                Check Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero1;
