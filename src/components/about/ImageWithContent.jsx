import React from "react";
import image from "../../../public/images/about/image.png";
import Image from "next/image";

const ImageWithContent = () => {
  return (
    <section className="max-w-7xl mb-14">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-[60%]  md:mb-0 bg-[#f4f4f4] md:h-[818px] relative">
          <div className="md:px-20 px-4 pt-20">
            <p className="text-secondary font-medium mb-2 flex justify-left items-center gap-2">
              <span className="w-5 h-px bg-secondary inline-block"></span>
              Facilities
              <span className="w-5 h-px bg-secondary inline-block"></span>
            </p>
            <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-8">
              Lorem Ipsum Dolo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:px-20 px-4 pt-5 md:pb-0 pb-5">
            <div className="space-x-4">
              <div className="bg-secondary p-3 rounded-full w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c1.5 0 3-1.5 3-3 0-1.5-1.5-3-3-3s-3 1.5-3 3c0 1.5 1.5 3 3 3zM4 4h16M4 20h16M4 12h16"
                  />
                </svg>
              </div>
              <div className="pt-3 w-[80%]">
                <h3 className="font-semibold text-xl text-gray-800 pb-2">
                  Lorem Ipsum
                </h3>
                <p className="text-gray-600 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et velit nisi.
                </p>
              </div>
            </div>

            <div className=" space-x-4">
              <div className="bg-secondary p-3 rounded-full w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16zm0 10a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
              </div>
              <div className="pt-3 w-[80%]">
                <h3 className="font-semibold text-xl text-gray-800 pb-2">
                  Lorem Ipsum
                </h3>
                <p className="text-gray-600 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula nisl at augue mollis, at vulputate ante aliquam.
                </p>
              </div>
            </div>

            <div className=" space-x-4">
              <div className="bg-secondary p-3 rounded-full w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h18v18H3z"
                  />
                </svg>
              </div>
              <div className="pt-3 w-[80%]">
                <h3 className="font-semibold text-xl text-gray-800 pb-2">
                  Lorem Ipsum
                </h3>
                <p className="text-gray-600 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum sollicitudin ante, sit amet cursus justo fermentum nec.
                </p>
              </div>
            </div>

            <div className=" space-x-4">
              <div className="bg-secondary p-3 rounded-full w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <div className="pt-3 w-[80%]">
                <h3 className="font-semibold text-xl text-gray-800 pb-2">
                  Lorem Ipsum
                </h3>
                <p className="text-gray-600 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec nisi sed nulla facilisis fermentum sit amet euismod justo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden md:block h-[700px] w-[40%] absolute right-[120px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default ImageWithContent;
