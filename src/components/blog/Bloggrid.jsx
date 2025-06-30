import React from "react";
import Image from "next/image";
import image from "../../../public/images/blogs/image.png";
import avatar from "../../../public/images/blogs/avatar.png";

function Bloggrid() {
  return (
    <>
      <div
        className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
        id="blogs-section"
      >
        <div className="flex flex-col text-center basis-1/2">
          <p className="text-secondary font-medium mb-2 flex justify-center items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block"></span>
            Lorem Ipsum
            <span className="w-5 h-px bg-secondary inline-block"></span>
          </p>

          <h2 className="md:text-4xl text-2xl text-center font-serif font-bold text-gray-900 mb-12">
            Lorem Ipsum Dolor Sit Amet
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item,index) => (
            <a
              key={item}
              className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5 bg-white"
              href="/blogs/blog1"
            >
              <div className="aspect-w-16 aspect-h-11">
                <Image
                  className="object-cover rounded-xl"
                  src={image}
                  alt="Blog Image"
                  width={560}
                  height={315}
                />
              </div>

              <div className="mt-6 flex flex-col flex-1">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary text-white rounded mb-2 w-fit">
                  Lorem
                </span>
                <h3 className="text-xl font-semibold text-gray-800">
                  Lorem ipsum dolor sit amet
                </h3>
                <p className="mt-3 text-gray-600 flex-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua...
                </p>
                <div className="mt-5 flex items-center">
                  <Image
                    className="rounded-full"
                    src={avatar}
                    alt="Author"
                    width={32}
                    height={32}
                  />
                  <div className="ml-3 text-sm">
                    <p className="font-semibold text-gray-800">Lorem Ipsum</p>
                    <p className="text-gray-500">Aug 15, 2021 · 16 min read</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bloggrid;
