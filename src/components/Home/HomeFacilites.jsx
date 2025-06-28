"use client";

import Image from "next/image";
import icon1 from "../../../public/images/home/home_icons.png";

const facilities = [
  {
    title: "Lorem Ipsum Room",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed orci in sapien cursus placerat.",
    icon: icon1,
  },
  {
    title: "Dolor Sit Security",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    icon: icon1,
  },
  {
    title: "Consectetur Gym",
    description:
      "Aenean et nisl sed sapien ullamcorper varius. Fusce viverra orci ut est fermentum, et posuere leo lacinia.",
    icon: icon1,
  },
  {
    title: "Adipiscing Pool",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    icon: icon1,
  },
];

const Facilities = () => {
  return (
    <section className="bg-[#F4F4f4] py-16 md:px-0 px-4">
      <div className="max-w-6xl mx-auto  md:text-center text-left">
        <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Facilities
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-12">
          Lorem Ipsum Dolo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="flex md:justify-center justify-start mb-4">
                <Image
                  src={facility.icon}
                  alt={facility.title}
                  width={50}
                  height={50}
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
