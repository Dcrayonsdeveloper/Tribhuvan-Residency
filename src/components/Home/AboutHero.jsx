"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { site } from "@/data/site";

const AboutUsSection = () => {
  return (
    <section className="bg-white md:pt-36 pt-16 py-16 mx-auto max-w-7xl">
      <div className="md:mx-16 flex flex-col lg:flex-row md:px-6 px-4 gap-10 relative justify-between">
        <div className="relative w-full hidden md:block lg:w-[40%]">
          <div className="rounded-xl overflow-hidden shadow-lg h-[550px]">
            <Image
              src="/images/tribhuvan/hotel-1.jpg"
              alt="Guest lounge at The Tribhuvan Residency"
              fill
              className="rounded-xl object-cover"
            />
            <div className="absolute top-[-36px] right-[-31px] rounded-xl overflow-hidden border-4 border-white">
              <Image
                src="/images/tribhuvan/hotel-2.jpg"
                alt="Deluxe bedroom at The Tribhuvan Residency"
                width={250}
                height={180}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-[22px] left-[-58px] bg-white shadow-2xl p-4 rounded-xl flex items-center gap-3">
            <div className="bg-cream p-3 rounded-md">
              <FaStar className="text-xl text-secondary" />
            </div>
            <div>
              <p className="text-xl font-semibold">
                {site.rating} / {site.ratingText}
              </p>
              <p className="text-sm text-gray-500">
                {site.ratingsCount} Ratings
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <p className="text-secondary font-medium mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block"></span>
            About Us
          </p>
          <h2 className="lg:text-4xl text-2xl font-serif font-bold text-gray-900 mb-6">
            A Serene Retreat Near <br /> Shree Ram Janmabhoomi
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Welcome to {site.name}, an exquisite guest house located just a short
            walk from the main gate of the revered Shree Ram Janmabhoomi Mandir
            in Ayodhya. Thoughtfully designed for pilgrims and travellers, our
            well-appointed air-conditioned rooms offer spotless comfort, modern
            western bathrooms with 24-hour hot water, and the quiet calm you need
            after a day of darshan.
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Courteous, ever-helpful staff, in-room dining from trusted nearby
            kitchens, free Wi-Fi and secure parking make every stay
            effortless — perfect for early-morning aarti and a serene Ayodhya
            yatra.
          </p>
          <Link href="/about">
            <button className="btn-primary">
              <span>Discover More</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
