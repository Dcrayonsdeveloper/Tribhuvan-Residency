import React from "react";
import Image from "next/image";
import Link from "next/link";
import blogImage1 from "@/public/assets/blog1-thumb.jpg"
import blogImage2 from "@/public/assets/blog2-thumb.jpg"
import blogImage3 from "@/public/assets/blog3-thumb.jpg"

function Blog1() {
  return (
    <>
      <div
        className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto pt-20"
        id="blogs-section"
      >
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Our Blogs
          </h2>
          <p className="mt-1 text-gray-600">
            See how transforming Infrastructure with Precast Expertise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5"
            href="/our-blogs/benefits-applications-precast-concrete"
          >
            <div className="aspect-w-16 aspect-h-11">
              <Image
                className=" object-cover rounded-xl"
                src={blogImage1}
                alt="Blog Image"
                width={560}
                height={315}
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
              The Benefits and Applications of Precast Concrete
              </h3>
              <p className="mt-5 text-gray-600">
              Precast concrete is a construction product produced by casting concrete in a reusable mold or "form" which ...
              </p>
            </div>
          </a>          
          <a
            className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5"
            href="/our-blogs/precast-development-vs-normal-development"
          >
            <div className="aspect-w-16 aspect-h-11">
              <Image
                className=" object-cover rounded-xl"
                src={blogImage2}
                alt="Blog Image"
                width={560}
                height={315}
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
              Precast Development vs Normal Development
              </h3>
              <p className="mt-5 text-gray-600">
              The construction industry has seen numerous innovations over the years, with precast concrete emerging as...
              </p>
            </div>
          </a>          
          <a
            className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5"
            href="/our-blogs/sustainable-building-with-precast-concrete"
          >
            <div className="aspect-w-16 aspect-h-11">
              <Image
                className=" object-cover rounded-xl"
                src={blogImage3}
                alt="Blog Image"
                width={560}
                height={315}
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
              Sustainable Building with Precast Concrete
              </h3>
              <p className="mt-5 text-gray-600">
              As the construction industry faces growing environmental challenges, sustainability has become a critical focus. Builders...
              </p>
            </div>
          </a>          
        </div>

        <div className="mt-12 text-center">
          <Link
            className="py-3 px-4 inline-flex items-center gap-x-1 text-sm font-medium rounded-full border border-gray-200 bg-white text-themeorange shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            href="/our-blogs"
          >
            Read more
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Blog1;
