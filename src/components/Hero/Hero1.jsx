"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
    <section className="relative ">
      <section className="flex items-end justify-center mx-auto max-w-7xl overflow-x-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-1000 ease-out "
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative flex-shrink-0 w-full ">
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
      <section className="relative md:bottom-[48px] md:px-4 mx-auto md:flex justify-center">
        <div className="inline-block w-full md:w-auto">
          <div className="bg-white  rounded-xl md:flex md:shadow-lg md:flex-nowrap items-center gap-4 p-4 md:p-6 w-full max-w-8xl">
            <div className="flex flex-col md:px-4 pb-4">
              <span className="font-semibold text-gray-900">Check In</span>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaCalendarAlt />
                <span>15 Jun 2024</span>
              </div>
            </div>

            <div className="flex flex-col md:px-4 pb-4 ">
              <span className="font-semibold text-gray-900">Check Out</span>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaCalendarAlt />
                <span>15 May 2024</span>
              </div>
            </div>

            {/* Adult */}
            <div className="flex flex-col md:px-4 pb-4">
              <span className="font-semibold text-gray-900">Adult</span>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaUser />
                <span>1 Person</span>
              </div>
            </div>

            {/* Child */}
            <div className="flex flex-col md:px-4 pb-4 ">
              <span className="font-semibold text-gray-900">Child</span>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <FaUser />
                <span>1 Child</span>
              </div>
            </div>

            {/* Button */}
            <div className="md:px-4 md:pt-0 pt-12">
              <button className="bg-primary w-full text-white font-semibold px-6 py-3 rounded-md hover:bg-[#a67d58] transition-all">
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
