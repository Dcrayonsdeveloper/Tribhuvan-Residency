"use client";
import React from "react";
import Image from "next/image";
import img1 from "../../../public/images/home/home_blog.png"; 
import img2 from "../../../public/images/home/home_blog.png"; 

const blogPosts = [
  {
    title: "Choose From a Wide Range of Properties Which",
    category: "Hotel",
    date: "20",
    month: "Jun",
    image: img1,
  },
  {
    title: "Choose From a Wide Range of Properties Which",
    category: "Hotel",
    date: "20",
    month: "Jun",
    image: img2,
  },
];

const blogLinks = [
  {
    title: "Dutch online travel agency for lodging reservations",
    category: "Foods",
  },
  {
    title: "Other travel products, and a subsidiary of Booking",
    category: "Drinks",
  },
    {
    title: "Other travel products, and a subsidiary of Booking",
    category: "Drinks",
  },
];

export default function NewsArticlesSection() {
  return (
    <section className="bg-[#f4f4f4] px-4 md:px-20 py-16 text-black mx-auto max-w-7xl">
      <p className="text-secondary font-medium mb-2 flex md:justify-center justify-start items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Facilities
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl md:text-center text-left font-serif font-bold text-gray-900 mb-12">
          Lorem Ipsum Dolo
        </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Left Two Cards */}
        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <div key={i} className="bg-white rounded-md overflow-hidden">
              <div className="relative h-56 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute right-[18px] bottom-[-38px] bg-white text-center shadow-sm">
                  <p className="md:text-xl text-lg font-bold text-secondary py-3 px-5 ">{post.date}</p>
                  <p className="text-xs font-semibold bg-secondary text-white px-3 py-1">{post.month}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-secondary font-medium mb-1">{post.category}</p>
                <h3 className="font-semibold text-lg leading-snug mt-4">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-md divide-y divide-gray-200">
          {blogLinks.map((link, i) => (
            <div key={i} className="p-6">
              <p className="text-sm text-secondary font-medium mb-1">{link.category}</p>
              <h4 className="font-semibold text-lg leading-snug">{link.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
