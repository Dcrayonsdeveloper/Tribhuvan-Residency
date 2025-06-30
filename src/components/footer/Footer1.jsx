"use client";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] text-gray-700 pt-12 px-4 max-w-7xl mx-auto md:px-20 pb-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <h2 className="md:text-4xl  text-2xl font-serif font-semibold text-gray-900">Lorem Ipsum Dolor</h2>
        <form className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-l-md bg-white text-gray-800 shadow-md w-full md:w-[300px] focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-secondary cursor-pointer text-white rounded-r-md font-semibold hover:bg-[#a98d60] transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-4 gap-10 border-t border-gray-200 pt-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-secondary">Lorem</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            volutpat, massa nec tincidunt eleifend, velit purus vulputate quam.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Lorem Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Lorem One</li>
            <li>Lorem Two</li>
            <li>Lorem Three</li>
            <li>Lorem Four</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Lorem Service</h4>
          <ul className="space-y-2 text-sm">
            <li>Lorem Option A</li>
            <li>Lorem Option B</li>
            <li>Lorem Option C</li>
            <li>Lorem Option D</li>
            <li>Lorem Option E</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Lorem Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-secondary" /> +12345678900
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-secondary" /> lorem@example.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-secondary" /> 123 Ipsum Street, Dolor City
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-200 text-sm">
        <p>© 2024 Lorem Ipsum. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-secondary">Facebook</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-secondary">Linkedin</a>
          <span className="text-gray-400">|</span>
          <a href="#" className="hover:text-secondary">Twitter</a>
          <button className="ml-4 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-[#a98d60] transition">
            <FaArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
