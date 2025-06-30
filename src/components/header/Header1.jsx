"use client";
import { useState } from "react";
import {
  FaPhoneAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-400">
      {/* Top Bar */}
      <div className="md:flex hidden justify-between items-center px-12 py-2 text-sm text-gray-600 bg-white border-b border-gray-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <FaPhone className="text-gray-500" />
            <span className="text-gray-500">+12505550199</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEnvelope className="text-gray-500" />
            <span>lorem@ipsum.com</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>123 Lorem Street, Ipsum City, XX 00000</span>
        </div>
      </div>

      <div className="flex justify-between items-center md:px-12 px-4 py-4">
        <nav className="hidden lg:flex items-center gap-6 text-gray-600 font-normal">
          {[
            { label: "Home", href: "/" },
            { label: "Rooms", href: "/rooms" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Blogs", href: "/blogs" },
            { label: "FAQs", href: "/faqs" },
          ].map((item) => (
            <div key={item.href} className="relative group cursor-pointer">
              <Link
                href={item.href}
                className="flex flex-col items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="block h-0.5 bg-secondary transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-serif text-[#0e1428]">Lorem</h1>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button className="px-5 py-2 border cursor-pointer border-gray-400 rounded-md text-gray-700 font-semibold hover:bg-gray-50">
            Sign In
          </button>
          <button className="px-5 py-2 border cursor-pointer border-gray-400 rounded-md text-gray-700 font-semibold hover:bg-gray-50">
            Sign Up
          </button>
          <Link href="/rooms">
            <button className="cursor-pointer px-5 py-2 rounded-md border-gray-400 bg-primary text-white font-semibold ">
              Book Now
            </button>
          </Link>
        </div>

        <div className="lg:hidden flex items-center">
          <HiOutlineMenu
            className="text-3xl text-gray-600 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      <div
        className={`fixed w-[100%] top-0 left-0 w-64 h-full bg-white border-r border-gray-400 transform overflow-y-scroll ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col items-start gap-6 py-4 px-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-3xl text-gray-700"
          >
            <IoIosClose />
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif text-[#0e1428]">Lorem</h1>
          </div>

          <div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              blandit arcu at enim venenatis, quis venenatis felis tincidunt.
            </p>
          </div>

          <div className="w-full space-y-3">
            <div className="relative group cursor-pointer flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center justify-between gap-1"
              >
                Home
              </Link>
              <div>{/* <IoIosArrowDown /> */}</div>
            </div>
            <div className="relative group cursor-pointer flex justify-between items-center">
              <Link
                href="/rooms"
                className="flex items-center justify-between gap-1"
              >
                Rooms
              </Link>
              <div>{/* <IoIosArrowDown /> */}</div>
            </div>
            <div className="relative group cursor-pointer flex justify-between items-center">
              <Link
                href="/about"
                className="flex items-center justify-between gap-1"
              >
                About
              </Link>
              <div>{/* <IoIosArrowDown /> */}</div>
            </div>
            <div className="relative group cursor-pointer flex justify-between items-center">
              <Link
                href="/contact"
                className="flex items-center justify-between gap-1"
              >
                Contact
              </Link>
            </div>
            <div className="relative group cursor-pointer flex justify-between items-center">
              <Link
                href="/blogs"
                className="flex items-center justify-between gap-1"
              >
                Blogs
              </Link>
            </div>
            <div className="relative group cursor-pointer flex justify-between items-center">
              <Link
                href="/faqs"
                className="flex items-center justify-between gap-1"
              >
                Faq
              </Link>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mt-6">
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Contact</h3>
              <div className="mt-4">
                <p className="flex items-center gap-2">
                  <FaPhoneAlt /> <span>+1234567890</span>
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <FaEnvelope /> <span>lorem@ipsum.com</span>
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt />{" "}
                  <span>123 Lorem Street, Ipsum City, XX 00000</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
        />
      )}
    </header>
  );
};

export default Header;
