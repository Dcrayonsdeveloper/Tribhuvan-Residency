"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { faqs } from "@/data/site";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-24 md:px-8 px-4 mx-auto max-w-5xl flex flex-col md:flex-row md:gap-12">
      <div className="flex flex-col text-left basis-1/2 mb-8 md:mb-0">
        <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Got Questions?
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl text-left font-serif font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Everything you need to know before your stay at The Tribhuvan
          Residency. Can't find an answer? Just give us a call — we're always
          happy to help.
        </p>
      </div>

      <ul className="basis-1/2 space-y-2">
        {faqs.map((faq, index) => (
          <li key={index} className="border-t border-gray-200">
            <button
              className={`relative cursor-pointer flex items-center w-full py-5 text-left font-medium transition-colors duration-300 ${
                activeIndex === index
                  ? "text-primary"
                  : "text-gray-800 hover:text-primary"
              }`}
              aria-expanded={activeIndex === index ? "true" : "false"}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base md:text-lg pr-2">{faq.q}</span>
              <IoIosArrowDown
                className={`w-5 h-5 ml-2 flex-shrink-0 transition-transform duration-300 ${
                  activeIndex === index
                    ? "rotate-180 text-secondary"
                    : "text-gray-500"
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div
                className={`px-2 pb-5 text-gray-600 text-base leading-relaxed transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {faq.a}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
