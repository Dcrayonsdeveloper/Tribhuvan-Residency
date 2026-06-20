"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { PiRuler } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { rooms } from "@/data/site";

const RoomsCarousel = () => {
  return (
    <section className="py-16 bg-white md:px-0 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <p className="text-secondary font-medium mb-2 flex items-center gap-2">
              <span className="w-5 h-px bg-secondary inline-block"></span>
              Stay With Us
              <span className="w-5 h-px bg-secondary inline-block"></span>
            </p>
            <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900">
              Our Rooms
            </h2>
          </div>
          <p className="text-gray-600 max-w-xl mt-4 md:mt-0">
            Spotless, air-conditioned rooms with modern western bathrooms and
            24-hour hot water — a restful haven after a day of darshan, just a
            short walk from the Ram Mandir.
          </p>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ el: ".custom-swiper-pagination", clickable: true }}
          className="pb-10"
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.slug}>
              <Link href={`/rooms/${room.slug}`}>
                <div className="bg-white rounded-xl card shadow-md overflow-hidden relative group h-[585px] cursor-pointer">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full text-white p-6">
                    <h3 className="md:text-3xl text-xl pb-3 font-serif">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm">
                      <div className="flex items-center gap-1">
                        <PiRuler className="text-lg" />
                        {room.size}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUser className="text-sm" />
                        {room.guests} Guests
                      </div>
                    </div>
                    <p className="md:text-2xl text-xl font-semibold mt-2">
                      {room.priceLabel}
                      <span className="text-base font-normal text-white/80">
                        {" "}
                        / night
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination (outside cards) */}
        <div className="custom-swiper-pagination mt-6 flex justify-center gap-2"></div>
      </div>
    </section>
  );
};

export default RoomsCarousel;
