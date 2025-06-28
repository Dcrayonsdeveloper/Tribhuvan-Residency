"use client";
import React from "react";
import Image from "next/image";
import image1 from "../../../public/images/home/image1.png";
import image2 from "../../../public/images/home/image2.png";

const offers = [
  {
    title: "Lorem Ipsum Dolor",
    price: "$49.00",
    image: image1,
    features: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore et dolore",
    ],
  },
  {
    title: "Sit Amet Consectetur",
    price: "$59.00",
    image: image2,
    features: [
      "Ut enim ad minim veniam",
      "Quis nostrud exercitation",
      "Ullamco laboris nisi",
      "Ut aliquip ex ea commodo",
    ],
  },
  {
    title: "Adipiscing Elit",
    price: "$69.00",
    image: image2,
    features: [
      "Duis aute irure dolor",
      "In reprehenderit in",
      "Voluptate velit esse",
      "Cillum dolore eu fugiat",
    ],
  },
];

export default function ThreeImageWithContent() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 md:px-0">
      {/* Subheading */}
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Lorem Ipsum
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      {/* Main Heading */}
      <h2 className="md:text-4xl text-2xl font-serif text-left md:text-center font-bold text-gray-900 mb-6">
        Lorem Ipsum Dolor Sit Amet
      </h2>

      {/* Description Paragraph */}
      <p className="text-left md:text-center max-w-3xl mx-auto text-gray-600 mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        tincidunt, nisi in pulvinar porta, neque nulla gravida urna, vel
        consequat justo lacus a velit. Donec blandit, tortor sed accumsan
        sagittis, sapien libero viverra orci, et sodales lorem velit at purus.
      </p>

      <div className="grid md:grid-cols-2 gap-6 h-[600px]">
        <div className="relative w-full h-full rounded-lg overflow-hidden text-white flex flex-col md:flex-row">
          <Image
            src={offers[0].image}
            alt={offers[0].title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 bg-black/80 p-6 w-full">
            <h3 className="text-2xl font-serif mb-3">{offers[0].title}</h3>
            <ul className="list-none space-y-1 text-sm">
              {offers[0].features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <p className="text-2xl text-secondary mt-4">{offers[0].price}</p>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-6 h-full">
          {[offers[1], offers[2]].map((offer, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden bg-black/80 text-white flex flex-row h-full"
            >
              <div className="relative w-1/2 h-full">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-1/2 bg-black/80 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif mb-3">{offer.title}</h3>
                  <ul className="list-none space-y-1 text-sm">
                    {offer.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-2xl text-secondary mt-4">{offer.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
