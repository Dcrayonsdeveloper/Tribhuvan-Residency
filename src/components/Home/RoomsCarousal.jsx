"use client";

import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { PiRuler } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import room1 from "../../../public/images/home/carousal.png";

const rooms = [
  {
    name: "The Ritz-Carlton",
    image: room1,
    size: "35 sqm",
    persons: "2 Person",
    price: "100$",
  },
  {
    name: "Four Seasons Hotels",
    image: room1,
    size: "35 sqm",
    persons: "2 Person",
    price: "130$",
  },
  {
    name: "Waldorf Astoria Hotels",
    image: room1,
    size: "35 sqm",
    persons: "5 Person",
    price: "150$",
  },
  {
    name: "Waldorf Astoria Hotels",
    image: room1,
    size: "35 sqm",
    persons: "5 Person",
    price: "150$",
  },
  {
    name: "Waldorf Astoria Hotels",
    image: room1,
    size: "35 sqm",
    persons: "5 Person",
    price: "150$",
  },
  {
    name: "Waldorf Astoria Hotels",
    image: room1,
    size: "35 sqm",
    persons: "5 Person",
    price: "150$",
  },
  {
    name: "Waldorf Astoria Hotels",
    image: room1,
    size: "35 sqm",
    persons: "5 Person",
    price: "150$",
  },
  {
    name: "Waldorf Astoria Hotels",
    image: room1,
    size: "35 sqm",
    persons: "5 Person",
    price: "150$",
  },
];

const RoomsCarousel = () => {
  return (
    <section className="py-16 bg-white md:px-0 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <p className="text-secondary font-medium mb-2 flex items-center gap-2">
              <span className="w-5 h-px bg-secondary inline-block"></span>
              Lorem
              <span className="w-5 h-px bg-secondary inline-block"></span>
            </p>
            <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900">
              Dolor Sit Security{" "}
            </h2>
          </div>
          <p className="text-gray-600 max-w-xl mt-4 md:mt-0">
            Aenean et nisl sed sapien ullamcorper varius. Fusce viverra orci ut
            est fermentum, et posuere leo lacinia.
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
          {rooms.map((room, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl card shadow-md overflow-hidden relative group h-[585px]">
                <Image
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full text-black p-6">
                  <h3 className="md:text-3xl text-xl pb-3 font-serif">{room.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <div className="flex items-center gap-1">
                      <PiRuler className="text-lg" />
                      {room.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUser className="text-sm" />
                      {room.persons}
                    </div>
                  </div>
                  <p className="md:text-2xl text-xl font-semibold mt-2">{room.price}</p>
                </div>
              </div>
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
