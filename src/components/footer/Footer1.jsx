"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { site, navLinks, rooms } from "@/data/site";

export default function Footer() {
  const scrollTop = () =>
    typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-espresso text-amber-50/80 pt-14 px-4 md:px-20 pb-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo.png"
              alt={site.name}
              width={200}
              height={120}
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed">{site.intro}</p>
            <div className="flex items-center gap-3 mt-5">
              <a href={site.social.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition">
                <FaFacebookF size={14} />
              </a>
              <a href={site.social.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition">
                <FaInstagram size={15} />
              </a>
              <a href={site.social.youtube} aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition">
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-xl text-secondary mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-secondary transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h4 className="font-serif text-xl text-secondary mb-4">Our Rooms</h4>
            <ul className="space-y-2 text-sm">
              {rooms.map((r) => (
                <li key={r.slug}>
                  <Link href={`/rooms/${r.slug}`} className="hover:text-secondary transition">
                    {r.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rooms" className="hover:text-secondary transition">
                  View All Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-xl text-secondary mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-secondary mt-1 shrink-0" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-secondary shrink-0" />
                <a href={`tel:${site.phone}`} className="hover:text-secondary">{site.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-secondary shrink-0" />
                <a href={`mailto:${site.email}`} className="hover:text-secondary break-all">{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-white/10 text-sm gap-4">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-50/60">Made with devotion in Ayodhya</span>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-[var(--gold-soft)] transition"
            >
              <FaArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
