"use client";

import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { site } from "@/data/site";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  const infoCards = [
    {
      icon: <FaPhoneAlt className="text-white text-lg" />,
      label: "Call or WhatsApp",
      value: site.phoneDisplay,
      href: `tel:${site.phone}`,
    },
    {
      icon: <FaEnvelope className="text-white text-lg" />,
      label: "Send an Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: <FaMapMarkerAlt className="text-white text-lg" />,
      label: "Visit Us",
      value: site.address,
      href: site.mapLink,
      external: true,
    },
    {
      icon: <FaCalendarAlt className="text-white text-lg" />,
      label: "Check-in / Check-out",
      value: `Check-in from ${site.checkIn} · Check-out by ${site.checkOut}`,
    },
  ];

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
        {/* Left: contact info cards */}
        <div className="md:col-span-2">
          <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block"></span>
            Get in Touch
            <span className="w-5 h-px bg-secondary inline-block"></span>
          </p>

          <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-6">
            We'd Love to Host You
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Planning your Ayodhya yatra? Reach out to book a room or ask anything
            about your stay at {site.name}. Our team is always happy to help.
          </p>

          <div className="space-y-4">
            {infoCards.map((card) => {
              const content = (
                <div className="flex items-start gap-4 bg-cream rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-secondary p-3 rounded-full shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm pb-1">{card.label}</p>
                    <p className="font-semibold text-gray-900 break-words">
                      {card.value}
                    </p>
                  </div>
                </div>
              );

              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={card.label}>{content}</div>
              );
            })}
          </div>
        </div>

        {/* Right: contact form */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-cream rounded-lg p-6 md:p-8 shadow-sm"
          >
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
              Send Us a Message
            </h3>

            {submitted && (
              <div className="mb-6 rounded-md bg-secondary/20 border border-secondary px-4 py-3 text-primary font-semibold">
                Thank you, we'll be in touch!
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full bg-white px-4 py-3 border border-gray-300 focus:border-secondary rounded outline-none"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full bg-white px-4 py-3 border border-gray-300 focus:border-secondary rounded outline-none"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full bg-white px-4 py-3 border border-gray-300 focus:border-secondary rounded outline-none md:col-span-2"
              />
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Write a Message"
              className="w-full bg-white px-4 py-3 border border-gray-300 focus:border-secondary rounded h-36 md:h-48 mb-6 outline-none"
            ></textarea>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="mt-12 md:mt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
          <div>
            <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
              <span className="w-5 h-px bg-secondary inline-block"></span>
              Find Us
              <span className="w-5 h-px bg-secondary inline-block"></span>
            </p>
            <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900">
              How to Reach The Tribhuvan Residency
            </h2>
          </div>
          <a
            href={site.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex w-full sm:w-fit justify-center md:self-end shrink-0"
          >
            <span className="flex items-center justify-center gap-2">
              Get Directions <FaExternalLinkAlt className="text-sm" />
            </span>
          </a>
        </div>

        <iframe
          src={site.mapEmbed}
          title="Map showing the location of The Tribhuvan Residency in Ayodhya"
          className="w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-lg border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
