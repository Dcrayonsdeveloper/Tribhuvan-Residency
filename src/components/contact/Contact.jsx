import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import contact from "../../../public/images/contact/image.png";
import Image from "next/image";
export default function ContactUs() {
  return (
    <div className="container mx-auto py-20 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-12 gap-14 items-start">
        <div className="md:col-span-3">
          <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block "></span>
            Facilities
            <span className="w-5 h-px bg-secondary inline-block"></span>
          </p>

          <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-12">
            Lorem Ipsum Dolo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#f4f4f4] px-4 py-3 border border-gray-300 focus:border-[#003812] rounded outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#f4f4f4] px-4 py-3 border border-gray-300 focus:border-[#003812] rounded outline-none"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full bg-[#f4f4f4] px-4 py-3 border border-gray-300 focus:border-[#003812] rounded outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-[#f4f4f4] px-4 py-3 border border-gray-300 focus:border-[#003812] rounded outline-none"
            />
          </div>

          <textarea
            placeholder="Write a Message"
            className="w-full bg-[#f4f4f4] px-4 py-3 border border-transparent focus:border-[#c89c60] rounded h-60 mb-4"
          ></textarea>
          <button className="relative overflow-hidden bg-primary cursor-pointer w-full md:w-auto text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#4e6956f7] hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
            <span className="relative z-10">Send Message</span>
          </button>
        </div>

        <div className="bg-secondary/50  rounded-md shadow-sm relative w-full md:col-span-2 mt-10 md:mt-0">
          <div className="room-details__sidebar__right__item">
            <h4 className="room-details__sidebar__top__title">
              Contact Information
            </h4>
          </div>
          <div className="space-y-5">
            <div className="pt-20">
              <div className="flex items-center gap-4 pb-4 px-6">
                <div className="bg-secondary p-3 rounded-full">
                  <FaPhoneAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-black pb-2">Have any question?</p>
                  {/* <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p> */}
                  <p className="font-bold text-black">Free + 23 (000)-8050</p>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>

            <div>
              <div className="flex items-center gap-4 pb-4 px-6 ">
                <div className="bg-secondary p-3 rounded-full">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-black pb-2">Send Email</p>
                  {/* <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p> */}
                  <p className="font-bold text-black">demo@gmail.com</p>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>

            <div>
              <div className="flex items-center gap-4 pb-4 px-6 ">
                <div className="bg-secondary p-3 rounded-full">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-black pb-2">Visit Anytime</p>
                  {/* <p className="text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p> */}
                  <p className="font-bold text-black">
                    6391 Elgin St. Delaware 10299
                  </p>
                </div>
              </div>
              <hr className="border-gray-300" />
            </div>

            <div className="pt-4 text-center">
              <Image
                src={contact}
                alt="Contact Person"
                className="object-cover inline-block"
                height={350}
                width={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
