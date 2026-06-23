"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { site, navLinks, whatsappLink } from "@/data/site";

const BOOK_MSG =
  "Hello! I'd like to book a room at The Tribhuvan Residency. Please share availability and tariff.";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const drawer = (
    <>
      <div
        className={`fixed w-[85%] max-w-sm top-0 left-0 h-full bg-white transform overflow-y-auto shadow-2xl ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-[1000]`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-start gap-5 py-6 px-5">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute top-3 right-3 text-4xl text-gray-700 p-1 cursor-pointer focus:outline-none"
          >
            <IoIosClose />
          </button>

          <Image src="/logo.png" alt={site.name} width={170} height={100} className="h-16 w-auto object-contain" />

          <p className="text-gray-600 text-sm">{site.intro}</p>

          <div className="w-full space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-gray-100 text-gray-800 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            href={whatsappLink(BOOK_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full"
          >
            <button className="btn-primary w-full text-center">
              <span>Book Now</span>
            </button>
          </a>

          <div className="mt-2">
            <h3 className="text-lg font-semibold text-primary mb-3">Contact</h3>
            <p className="flex items-center gap-2 text-sm">
              <FaPhone className="text-secondary" /> <span>{site.phoneDisplay}</span>
            </p>
            <p className="flex items-center gap-2 mt-2 text-sm">
              <FaEnvelope className="text-secondary" /> <span>{site.email}</span>
            </p>
            <p className="flex items-start gap-2 mt-2 text-sm">
              <FaMapMarkerAlt className="text-secondary mt-1" /> <span>{site.address}</span>
            </p>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <header className="border-b border-gray-200 sticky top-0 z-40 bg-white/95 backdrop-blur">
      {/* Top Bar */}
      <div className="md:flex hidden justify-between items-center px-12 py-2 text-sm bg-espresso text-amber-50/90">
        <div className="flex items-center gap-6">
          <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-secondary transition">
            <FaPhone className="text-secondary" />
            <span>{site.phoneDisplay}</span>
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-secondary transition">
            <FaEnvelope className="text-secondary" />
            <span>{site.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-secondary" />
          <span>{site.addressShort}</span>
        </div>
      </div>

      <div className="flex justify-between items-center md:px-12 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt={site.name}
            width={200}
            height={120}
            priority
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-gray-700 font-medium">
          {navLinks.map((item) => (
            <div key={item.href} className="relative group cursor-pointer">
              <Link href={item.href} className="flex flex-col items-center">
                <span>{item.label}</span>
                <span className="block h-0.5 bg-secondary transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 w-full"></span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${site.phone}`} className="text-sm text-gray-600">
            <span className="block text-xs text-gray-400">Reservations</span>
            <span className="font-semibold text-primary">{site.phoneDisplay}</span>
          </a>
          <a href={whatsappLink(BOOK_MSG)} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary">
              <span>Book Now</span>
            </button>
          </a>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="p-2 -mr-2 text-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/40 rounded"
          >
            <HiOutlineMenu className="text-3xl" />
          </button>
        </div>
      </div>

      {mounted && createPortal(drawer, document.body)}
    </header>
  );
};

export default Header;
