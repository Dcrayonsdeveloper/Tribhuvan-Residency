"use client";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import profile from "../../../public/images/home/profile.png";

export default function Testimonial() {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "COO of Apex Solutions",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: profile,
    },
    {
      name: "David Chen",
      role: "CTO of NovaTech",
      message:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      image: profile,
    },
    {
      name: "Aisha Patel",
      role: "Marketing Head at Bloom",
      message:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
      image: profile,
    },
    {
      name: "Mark Thompson",
      role: "Founder at Innovate",
      message:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      image: profile,
    },
  ];

  return (
    <section className="md:py-16 py-8 bg-white px-4 md:px-0">
      <div className="max-w-6xl mx-auto text-left relative">
        <p className="text-secondary font-medium mb-2 flex items-center gap-2 justify-start">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Lorem Ipsum
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl font-serif font-semibold text-gray-900 mb-10">
          What Our Client Say
        </h2>

        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={50}
          slidesPerView={1}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    width={240}
                    height={240}
                    alt="Client Photo"
                    className="rounded-full border-4 border-gray-100 shadow-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="text-xl mb-3 flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-600  leading-relaxed mb-6 max-w-[90%] md:text-lg">
                    {item.message}
                  </p>
                  <div className="mt-6">
                    <p className="font-serif md:text-xl font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className=" text-gray-600 md:text-lg">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hidden md:flex z-40 flex-col gap-4 absolute right-0 top-1/2 transform -translate-y-1/2">
          <button
            className="p-2 rounded cursor-pointer border hover:bg-gray-100"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaArrowLeft />
          </button>
          <button
            className="p-2 rounded border cursor-pointer bg-primary text-white hover:bg-gray-800"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
