"use client";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { site, ratingBreakdown, reviews } from "@/data/site";

export default function Testimonial() {
  const swiperRef = useRef(null);

  return (
    <section className="md:py-16 py-8 bg-white px-4 md:px-0 pt-40 md:pt-0">
      <div className="max-w-6xl mx-auto text-left relative">
        <p className="text-secondary font-medium mb-2 flex items-center gap-2 justify-start">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Guest Reviews
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl font-serif font-semibold text-gray-900 mb-10">
          What Our Guests Say
        </h2>

        {/* Overall rating + breakdown */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Overall rating block */}
          <div className="bg-espresso text-white rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <p className="text-5xl font-serif font-bold text-secondary mb-2">
              {site.rating}
            </p>
            <div className="flex gap-1 text-secondary mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(site.rating)
                      ? "text-secondary"
                      : "text-white/30"
                  }
                />
              ))}
            </div>
            <p className="text-lg font-semibold">{site.ratingText}</p>
            <p className="text-sm text-white/70 mt-1">
              {site.ratingsCount} ratings · {site.reviewsCount} reviews
            </p>
          </div>

          {/* Rating breakdown */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-x-10 gap-y-6 content-center">
            {ratingBreakdown.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-800 font-medium">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.score.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${(item.score / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest review cards */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="bg-cream rounded-2xl p-6 h-full flex flex-col">
                <div className="text-base mb-3 flex gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < item.rating ? "text-secondary" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  “{item.text}”
                </p>
                <div className="mt-auto">
                  <p className="font-serif text-lg font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-sm">{item.meta}</p>
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
