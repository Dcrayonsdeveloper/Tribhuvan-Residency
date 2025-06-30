import { useState } from "react";

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel sapien at quam pulvinar ultrices. Integer dignissim nisl sed sem euismod, a interdum tortor fermentum.",
  },
  {
    question: "Curabitur non nulla sit amet nisl tempus?",
    answer:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta.",
  },
  {
    question: "Pellentesque in ipsum id orci porta dapibus?",
    answer:
      "Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
  },
    {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel sapien at quam pulvinar ultrices. Integer dignissim nisl sed sem euismod, a interdum tortor fermentum.",
  },
  {
    question: "Pellentesque in ipsum id orci porta dapibus?",
    answer:
      "Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
  },
];

export default function InsuranceFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:px-8 px-4 mx-auto max-w-5xl  flex flex-col md:flex-row md:gap-12 md:h-[600px] h-[800px]">
      <div className="md:flex flex-col text-left basis-1/2">
        <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Facilities
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>

        <h2 className="md:text-4xl text-2xl text-left font-serif font-bold text-gray-900 md:mb-12">
          Lorem Ipsum Dolo
        </h2>
      </div>

      <ul className="basis-1/2 space-y-2">
        {faqs.map((faq, index) => (
          <li key={index} className="border-t border-gray-200">
            <button
              className={`relative cursor-pointer flex items-center w-full py-5 text-left font-medium transition-colors duration-300 
              ${
                activeIndex === index
                  ? "text-primary"
                  : "text-gray-800 hover:text-primary"
              }`}
              aria-expanded={activeIndex === index ? "true" : "false"}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-lg">{faq.question}</span>
              <svg
                className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-45 text-primary" : "text-gray-500"
                }`}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="7" width="16" height="2" rx="1"></rect>
                <rect y="7" width="16" height="2" rx="1" className="transform rotate-90"></rect>
              </svg>
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
                {faq.answer}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
