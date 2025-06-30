"use client";

import Image from "next/image";
import { FaUsers } from "react-icons/fa";
import image from "../../../public/images/home/hero_img1.png";
import image2 from "../../../public/images/home/hero_img2.png";

const AboutUsSection = () => {
  return (
    <section className="bg-white md:pt-36 pt-16 py-16 mx-auto max-w-7xl">
      <div className="  md:mx-16 flex flex-col lg:flex-row md:px-6 px-4 gap-10 relative justify-between">
        <div className="relative w-full hidden md:block lg:w-[40%]">
          <div className="rounded-xl overflow-hidden shadow-lg h-[550px]">
            <Image
              src={image}
              alt="Main Bed"
              fill
              className="rounded-xl object-cover"
            />
            <div className="absolute top-[-36px] right-[-31px] rounded-xl overflow-hidden border-4 border-white">
              <Image
                src={image2}
                alt="Overlay Bed"
                width={250}
                height={180}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Experience Badge */}
          <div className="absolute bottom-[22px] left-[-58px] bg-white shadow-2xl p-4 rounded-xl  flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-md">
              <FaUsers className="text-xl text-[#ac835e]" />
            </div>
            <div>
              <p className="text-xl font-semibold">00+</p>
              <p className="text-sm text-gray-500">Lorem Ipsum</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <p className="text-secondary font-medium mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block"></span>
            About Us
          </p>
          <h2 className="lg:text-4xl text-2xl font-serif font-bold text-gray-900 mb-6">
            Lorem Ipsum Dolor Sit <br /> Amet Consectetur Hotel
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Aenean lacinia metus nec sem pulvinar, vitae facilisis
            nunc tincidunt. Integer at diam in lacus pretium lobortis sed nec
            sem. Curabitur imperdiet, justo sit amet accumsan hendrerit, urna
            lorem mattis nibh, nec luctus sem augue et velit. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Etiam varius efficitur felis a vehicula.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-[#8a6b4e] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
