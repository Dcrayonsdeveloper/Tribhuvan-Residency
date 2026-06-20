"use client";

import AmenityIcon from "@/components/common/AmenityIcon";
import { facilities } from "@/data/site";

const Facilities = () => {
  return (
    <section className="bg-cream py-16 md:px-0 px-4">
      <div className="max-w-6xl mx-auto md:text-center text-left">
        <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          What We Offer
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-12">
          Comforts &amp; Facilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="flex md:justify-center justify-start mb-4">
                <AmenityIcon
                  name={facility.icon}
                  className="text-4xl text-secondary"
                />
              </div>
              <h3 className="text-xl font-normal font-serif text-gray-800 mb-2">
                {facility.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
